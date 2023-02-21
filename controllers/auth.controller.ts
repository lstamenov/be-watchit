import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const register = async (params: {
  username: string;
  password: string;
  email: string;
}) => {
  const { username, password, email } = params;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      showsList: [],
      moviesList: [],
      avatarURL: "",
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    return null;
  }
};

const login = async (params: { username: string, password: string }) => {
  const { username, password } = params;

  const user = await User.findOne({ username });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { message: "Invalid password" };

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secret');
   return { jwt: token, user };
  } else {
    return { message: 'There is no such user' };
  }
};

export {
  register,
  login,
};
