import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate: value => {
				if (!validator.isEmail(value)) {
					throw new Error({ error: 'Invalid Email address' });
				}
			}
		},
		password: {
			type: String,
			required: true,
			minLength: 5
		},
		remember: {
			type: Boolean,
			default: false
		},
		role: {
			type: String,
			default: 'User'
		},
		whitelistIP: [
			{
				type: String,
				required: true
			}
		],
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		toJSON: { virtuals: true },
		versionKey: false,
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
);

userSchema.pre('save', async function(next) {
	// Hash the password before saving the user model
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hashSync(
			user.password,
			bcrypt.genSaltSync(10)
		);
	}
	next();
});

userSchema.methods.generateAccessToken = async function() {
	// this = user
	const { id, email, role } = this;

	const token = jwt.sign({ id, email, role }, process.env.JWT_KEY, {
		expiresIn: 10
	});

	return token;
};

userSchema.methods.generateRefreshToken = async function() {
	// this = user
	const { id, email, role } = this;

	const token = jwt.sign({ id, email, role }, process.env.JWT_REFRESH_KEY, {
		expiresIn: 60 * 60 * 12
	});

	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

userSchema.methods.comparePassword = function(candidatePassword, next) {
	return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.statics.findByCredentials = async (email, password) => {
	// Search for a user by email and password.
	const user = await User.findOne({ email });
	if (!user) {
		throw { message: 'User not found' };
	}
	const isPasswordMatch = await bcrypt.compareSync(password, user.password);
	if (!isPasswordMatch) {
		throw { message: 'Wrong password!' };
	}
	return user;
};

const User = mongoose.model('User', userSchema);

export default User;
