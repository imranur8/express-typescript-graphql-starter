import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MongoPaging from "mongo-cursor-pagination";
import mongoose, { Schema } from "mongoose";
import { isEmail } from "validator";

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    trim: true,
    validate: [isEmail, "invalid email"]
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    trim: true,
    minlength: [6, "Password need to be longer!"],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: "{VALUE} is not a valid password!",
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", function(next) {

  this.updatedAt = Date.now();

  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },

  createToken() {
    return jwt.sign({
      _id: this._id,
      name: this.name,
      email: this.email,
    },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  },
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      token: `Bearer ${this.createToken()}`,
    };
  },
};

// add MongoPaging plugin to schema
UserSchema.plugin(MongoPaging.mongoosePlugin);
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
