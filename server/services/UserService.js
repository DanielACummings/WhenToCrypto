import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import User from "../models/User"
import ApiError from "../utils/ApiError"

//Obfuscates passwords by using bcrypt hashing and salt
const SALT = 10

const _repository = mongoose.model('User', User)

class UserService {
  async create(body) {
    //VALIDATE PASSWORD LENGTH
    if (!body.hasOwnProperty("password") || body.password.length < 6) {
      throw new ApiError('Password must be at least 6 characters', 400)
    }
    //CHANGE THE PASSWORD TO A HASHED PASSWORD
    body.hash = this.generateHash(body.password)
    //CREATE THE USER
    let user = await _repository.create(body)
    //REMOVE THE PASSWORD BEFORE RETURNING
    //@ts-ignore
    delete user._doc.hash
    return user
  }
  async getByEmailAndLogin(body) {
    let user = await _repository.findOne({ email: body.email })
    if (!user) {
      throw new ApiError("Invalid email")
    }
    //CHECK THE PASSWORD
    // @ts-ignore
    let valid = await user.validatePassword(body.password)
    if (!valid) {
      throw new ApiError("Invalid password")
    }
    //@ts-ignore
    delete user._doc.hash
    return user
  }

  async authenticate(id) {
    let user = await _repository.findOne({ _id: id })
    if (!user) {
      throw new ApiError("Please login to continue", 401)
    }
    //@ts-ignore
    delete user._doc.hash
    return user
  }
  generateHash(password) {
    return bcrypt.hashSync(password, SALT)
  }
}

const _userService = new UserService()
export default _userService