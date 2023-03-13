import User from "../models/User";

export default async (id: string) => {
  const user = await User.findById(id);
  
  if (user) {
   return user
  } else {
    throw new Error('Invalid token');
  }
};