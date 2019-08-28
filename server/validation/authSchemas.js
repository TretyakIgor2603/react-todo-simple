import * as yup from 'yup';

export const signIn = yup.object().shape({
	email: yup.string().email(),
	password: yup.string().required(),
	remember: yup.boolean()
});

export const signUp = yup.object().shape({
	username: yup
		.string()
		.label('Username')
		.min(3)
		.required(),
	email: yup
		.string()
		.label('Email')
		.email()
		.required(),
	password: yup
		.string()
		.label('Password')
		.min(5)
		.max(24)
		.required(),
	confirm: yup
		.string()
		.label('Confirm password')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Password confirm is required'),
	autoLogin: yup.boolean()
});

export const signOut = yup.object().shape({
	authorization: yup.string().required()
});

export const checkExistEmail = yup.object().shape({
	email: yup
		.string()
		.label('Email')
		.required()
});
