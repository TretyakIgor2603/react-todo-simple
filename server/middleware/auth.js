import jwt from 'jsonwebtoken';
import models from '../models';
import JwtDecode from 'jwt-decode';

const { User } = models;

const auth = async (req, res, next) => {
	const data = {};

	// Check exist token in request
	let token = req.header('Authorization');
	if (token) {
		token = token.replace('Bearer ', '');
	} else {
		return res
			.status(401)
			.send({ message: 'Access denied. No token provided.' });
	}

	// Check valid token
	try {
		data.token = jwt.verify(token, process.env.JWT_KEY);
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			if (req.url.indexOf('logout') !== -1) {
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

	// Find user by valid token
	try {
		const user = await User.findOne({
			_id: data.token.id,
			'tokens.token': token
		});
		if (!user) {
			throw new Error();
		} else {
			// Add user and token to request
			req.user = user;
			req.token = token;
			next();
		}
	} catch (error) {
		res.status(401).send({
			message: 'Not authorized to access this resource. Log in again!'
		});
	}
};

export default auth;
