import jwt from "jsonwebtoken";
import models from "../models";

const { User } = models;

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
      const user = await User.findOne({ _id: data.id, "tokens.token": token });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({
          tokenExpiredError: true,
          message: "Your token has expired. Please generate a new one"
        });
    } else {
      return res.status(401).send({ message: error.message });
    }
  }
};

export default auth;
