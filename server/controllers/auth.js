import models from '../models';
import jwt from 'jsonwebtoken';
import JwtDecode from 'jwt-decode';
import _get from 'lodash/fp/get';
const { User } = models;

export const checkExistEmail = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	user
		? res.status(409).send({ message: 'E-mail is already exist!' })
		: res.status(200).send({ message: 'E-mail is free!' });
};

export const register = async function(req, res) {
	const response = {};
	const { username, email, password, autoLogin } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		res.status(409).send({
			message: 'Email is already exist!'
		});
	} else {
		const user = await new User({ username, email, password }).save();
		response.user = user;
		if (autoLogin) {
			(response.accessToken = user.generateAccessToken()),
				(response.refreshToken = user.generateRefreshToken());
		}
		res.status(201).send(response);
	}
};

export const login = async function(req, res) {
	const { email, password } = req.body;
	const user = await User.findByCredentials(email, password);
	const accessToken = await user.generateAccessToken();
	const refreshToken = await user.generateRefreshToken();

	res.status(200).send({
		accessToken,
		refreshToken
	});
};

export const logout = async function(req, res) {
	req.user.tokens = req.user.tokens.filter(token => {
		return token.token != req.token;
	});
	await req.user.save();
	res.status(200).send({ message: 'You have been successfully logged out.' });
};

export const refreshToken = async function(req, res) {
	let token = _get('body.token', req);
	token = (token && token.replace('Bearer ', '')) || false;

	if (!token) {
		return res
			.status(401)
			.send({ message: 'Access denied. No token provided.' });
	}

	const user = await User.findOne({
		_id: JwtDecode(token).id,
		'tokens.token': token
	});
	try {
		if (user) {
			try {
				jwt.verify(token, process.env.JWT_REFRESH_KEY);
				res.status(200).send({
					accessToken: await user.generateAccessToken(),
					token
				});
			} catch (e) {
				user.tokens = user.tokens.filter(item => item.token !== token);
				user.save();
				throw new Error();
			}
		} else {
			throw new Error();
		}
	} catch (error) {
		return res.status(401).send({
			invalid: true,
			message: 'Invalid token! Please log in again!'
		});
	}
};
