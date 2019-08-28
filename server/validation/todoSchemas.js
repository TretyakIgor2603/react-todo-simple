import * as yup from 'yup';

export const updateTask = yup.object().shape({
	id: yup
		.string()
		.label('Task id')
		.required(),
	title: yup.lazy(value =>
		value !== undefined
			? yup
					.string()
					.max(255)
					.required()
			: yup.string().notRequired()
	)
});
