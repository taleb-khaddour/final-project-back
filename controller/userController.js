import Users from "../model/userModel.js";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from "../errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       throw new BadRequestError("Please provide both email and password.");
//     }

//     const user = await Users.findOne({ email }).select("+password");
//     if (!user) {
//       throw new UnauthorizedError("Invalid email or password.");
//     }

//     const isCorrect = await user.comparePassword(password);
//     if (!isCorrect) {
//       throw new UnauthorizedError("Invalid email or password.");
//     }

//     const token = user.createJWT();
//     user.password = undefined;
//     res
//       .status(200)
//       .header("Authorization", `Bearer ${token}`)
//       .json({ success: true, user: user, token: token });
//   } catch (error) {
//     next(error);
//   }
// };

export const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).send("All input is required");
    }

    // Validate if user exists in the database
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    // Compare passwords
    // const hashPassword = bcrypt.hashSync(password, 10);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid Credentials");
    }

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      { expiresIn: "5h" }
    );

    // Set token as a cookie
    res.cookie("auth-token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // Return success response with user and token
    return res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .json({ success: true, user, token });
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

/**
 * Create a new user
 * @param {*} req
 * @param {*} res
 * @returns JsonResponse
 */

export const createUser = async (req, res, next) => {
  const { name, email, password, address, phone } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password,
      address,
      phone,
    });

    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const errorMessage = "You are already Signup";
      return next(new BadRequestError(errorMessage));
    }
    next(error);
  }
};

/**
 * Function to read all users from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {};

    if (req.query.name) {
      filters.name = { $regex: new RegExp("^" + req.query.name, "i") };
    }
    if (req.query.email) {
      filters.email = { $regex: new RegExp("^" + req.query.email, "i") };
    }

    const user = await Users.paginate(filters, { page, limit });

    if (!user.docs.length) {
      if (req.query.name) {
        throw new NotFoundError(`No user found for ${req.query.name}`);
      }
      if (req.query.email) {
        throw new NotFoundError(`No user found for ${req.query.email}`);
      }
      throw new NotFoundError(`No user found`);
    }
    return res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Function to Delete a user from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteUser = async (req, res, next) => {
  try {
    const total = await Users.countDocuments({});
    if (total === 1 || req.params.id === req.user._id) {
      throw new MethodNotAllowedError("Can't delete the last user or yourself");
    }
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    console.log(total);
    res.status(200).json({
      success: true,
      error: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * function to Update user profile
 */
export const updateUser = async (req, res, next) => {
  const { name, email, address, phone } = req.body;
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.user._id,
      { name, email, address, phone },
      {
        new: true,
      }
    );

    if (updatedUser.nModified === 0) {
      throw new NotFoundError("User not found");
    }

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUsers = async (req, res, next) => {
  const { name, email } = req.body;

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { name: name, email: email },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * function to Update user profile
 */
// export const updateUserPrev = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await Users.findById(userId);
//     console.log(user);
//     if (!user) {
//       throw new NotFoundError(`User ${userId} not found`);
//     }

//     user.IsAdmin = !user.IsAdmin;

//     const updatedUser = await user.save();

//     return res.status(200).json({
//       success: true,
//       data: updatedUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Function to read a  user by id from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw new NotFoundError(`User ${id} not found`);
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Function to read a  user by id from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUserbyName = async (req, res) => {
  const name = req.query.name;
  try {
    const user = await Users.find({
      name: { $regex: `.*${name}.*`, $options: "i" },
    });
    if (!user) {
      throw new NotFoundError(`User ${name} Not found`);
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * This Function it updates the password field
 * @param {*} req
 * @param {*} res
 * @returns Object status of the success and the message or data
 */
export const updatePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      throw new BadRequestError("Old password and new password are required");
    }
    const user = await Users.findById(userId).select("password");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new UnauthorizedError("Old password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
