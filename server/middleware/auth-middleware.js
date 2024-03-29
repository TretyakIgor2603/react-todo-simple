import jwt from 'jsonwebtoken';
import models from '../models';
import _get from 'lodash/fp/get';

const { User } = models;

export const getAuthorizationToken = req => {
	const token = _get('headers.authorization', req);
	return token && token.replace('Bearer ', '') || false;
};

const authMiddleware = async (req, res, next) => {
	const data = {};

	// Check exist token in request
	const token = getAuthorizationToken(req);
	if (!token) {
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
					_id: data.token.id,
					'tokens.token': token
				});
				user && (req.user = user);
				return next();
			}

			return res.status(401).send({
				expired: true,
				message: 'Your token has expired. Please generate a new one'
			});
		} else {
			return res.status(401).send({
				invalid: true,
				message: 'Invalid token! Please log in again!'
			});
		}
	}

	// Find user by valid token
	try {
		const user = await User.findOne({
			_id: data.token.id
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

export default authMiddleware;
