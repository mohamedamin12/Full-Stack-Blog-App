const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
        publicId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

// Generate Auth Token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET_KEY);
}

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 8, // الحد الأدنى لطول كلمة المرور
  max: 30, // الحد الأقصى لطول كلمة المرور
  lowerCase: 1, // يجب أن تحتوي على حرف صغير واحد على الأقل
  upperCase: 1, // يجب أن تحتوي على حرف كبير واحد على الأقل
  numeric: 1, // يجب أن تحتوي على رقم واحد على الأقل
  symbol: 1, // يجب أن تحتوي على رمز واحد على الأقل
  requirementCount: 2, // عدد الشروط التي يجب أن تتحقق
};


// validate register user
const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password:  passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(obj);
};

// validate login user
const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(obj);
};

// validate update user
const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50),
    bio: Joi.string(),
    password: passwordComplexity(complexityOptions),
  });
  return schema.validate(obj);
};

// Validate Email
function validateEmail(obj) {
  const schema = Joi.object({
      email: Joi.string().trim().min(5).max(100).required().email(),
  });
  return schema.validate(obj);
}


// Validate New Password
function validateNewPassword(obj) {
  const schema = Joi.object({
      password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateEmail,
  validateNewPassword,
};