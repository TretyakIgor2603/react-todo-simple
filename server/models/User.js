import mongoose from "mongoose";
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nickname: {
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
          throw new Error({ error: "Invalid Email address" });
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
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { versionKey: false },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10)
    );
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_KEY,
    { expiresIn: 60 * 60 * 12 }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return `Bearer ${token}`;
};

userSchema.methods.comparePassword = function(candidatePassword, next) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw { message: "User not found" };
  }
  const isPasswordMatch = await bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw { message: "Wrong password!" };
  }
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
