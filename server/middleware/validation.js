export const createValidator = schema => {
	return (req, res, next) => {
		const { body, headers } = req;
		schema
			.validate({ ...headers, ...body })
			.then(function(value) {
				next();
			})
			.catch(function(err) {
				res.status(400).send({ success: false, message: err.message });
			});
	};
};
