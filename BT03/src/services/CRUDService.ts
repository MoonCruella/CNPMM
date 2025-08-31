import bcrypt from 'bcryptjs';
import db from '../models/index';

// Định nghĩa kiểu cho User (có thể import từ models nếu đã định nghĩa)
interface UserData {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: boolean | string;
  roleId: string;
}

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data: UserData): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1' ? true : false,
      roleId: data.roleId
    });
    return 'OK create a new user successfull';
  } catch (e) {
    throw e;
  }
};

const hashUserPassword = async (password: string): Promise<string> => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
};

const getAllUser = async (): Promise<any[]> => {
  try {
    const users = await db.User.findAll({
      raw: true,
    });
    return users;
  } catch (e) {
    throw e;
  }
};

const getUserInfoById = async (userId: number | string): Promise<any> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true
    });
    if (user) {
      return user;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
};

const updateUser = async (data: UserData): Promise<any[]> => {
  try {
    const user = await db.User.findOne({
      where: { id: data.id }
    });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();
      const allusers = await db.User.findAll();
      return allusers;
    }
    return [];
  } catch (e) {
    throw e;
  }
};

const deleteUserById = async (userId: number | string): Promise<void> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId }
    });
    if (user) {
      await user.destroy();
    }
  } catch (e) {
    throw e;
  }
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById
};