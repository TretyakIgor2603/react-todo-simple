import models from '../models';
import jwt from 'jsonwebtoken';
import JwtDecode from 'jwt-decode';
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
	let token = req.header('Authorization');
	if (token) {
		token = token.replace('Bearer ', '');
	}

	try {
		const refreshToken = jwt.verify(token, process.env.JWT_REFRESH_KEY);
		const user = await User.findOne({
			_id: refreshToken.id,
			'tokens.token': token
		});
		if (user) {
			const accessToken = await user.generateAccessToken();

			res.status(200).send({
				accessToken,
				refreshToken: token
			});
		}
	} catch (error) {
		const user = await User.findOne({
			_id: JwtDecode(token).id,
			'tokens.token': token
		});
		if (user) {
			user.tokens = user.tokens.filter(item => item.token !== token);
			user.save();
		}
		return res.status(401).send({
			invalid: true,
			message: 'Invalid refresh token! Please log in again!'
		});
	}

	// if (error.name === 'TokenExpiredError') {
	// 	if (req.url.indexOf('logout') !== -1) {
	// 		const user = await User.findOne({
	// 			_id: JwtDecode(token).id,
	// 			'tokens.token': token
	// 		});
	// 		user && (req.user = user);
	// 		return next();
	// 	}

	if (user) {
		try {
			token = jwt.verify(token, process.env.JWT_REFRESH_KEY);
		} catch (error) {
			user.tokens = user.tokens.filter(item => item.token !== token);
			user.save();
			return res.status(401).send({
				invalid: true,
				message: 'Invalid refresh token! Please log in again!'
			});
		}
	}

	console.log('req.token', token);
};
