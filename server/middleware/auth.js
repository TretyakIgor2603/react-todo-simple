import jwt from 'jsonwebtoken';
import models from '../models';
import { body } from 'express-validator';
import JwtDecode from 'jwt-decode';

const { User } = models;

const auth = async (req, res, next) => {
	let token = req.header('Authorization');
	if (token) {
		token = token.replace('Bearer ', '');
	} else {
		return res
			.status(401)
			.send({ message: 'Access denied. No token provided.' });
	}

	try {
		const data = jwt.verify(token, process.env.JWT_KEY);
		try {
			const user = await User.findOne({
				_id: data.id,
				'tokens.token': token
			});
			if (!user) {
				throw new Error();
			}
			req.user = user;
			req.token = token;
			next();
		} catch (error) {
			res.status(401).send({
				message: 'Not authorized to access this resource. Log in again!'
			});
		}
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			if (req.url === '/logout') {
				const user = await User.findOne({
					_id: JwtDecode(token).id,
					'tokens.token': token
				});
				user && (req.user = user);
				return next();
			}

			return res.status(401).send({
				tokenExpiredError: true,
				message: 'Your token has expired. Please generate a new one'
			});
		} else {
			return res.status(401).send({
				validToken: false,
				message: 'Invalid token! Please log in again!'
			});
		}
	}
};

export default auth;
