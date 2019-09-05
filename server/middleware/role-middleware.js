const checkRole = (roles = []) => {
	if (typeof roles === 'string') {
		roles = [roles];
	}

	return (req, res, next) => {
		// req.params.id - requested id
		// req.user - user from token
		if (
			roles.length &&
			req.params.id !== req.user.id &&
			!roles.includes(req.user.role.toLowerCase())
		) {
			return res.status(403).send({ message: 'Forbidden' });
		}
		next();
	};
};
export default checkRole;
