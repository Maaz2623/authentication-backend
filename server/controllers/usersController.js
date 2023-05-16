import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    const {username, password} = req.body
    try {
        const existingUser = await User.findOne({username})
        if (existingUser) return res.status(400).json({message: "User already exists."})
        const hashedPassword = await bcrypt.hash(password, 12)
        const savedUser = await User.create({username, password: hashedPassword})
        const token = jwt.sign({username: savedUser.username, id: savedUser._id}, 'test', {expiresIn: '1h'})
        res.status(200).json({result: savedUser, token})
        console.log(token)
    } catch (error) {
        res.status(400).json({message: "Something went Wrong."})
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body
    try {
        const existingUser = await User.findOne({username})
        if(!existingUser) return res.status(400).json({message: "User does not exist."})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials."})
        const token = jwt.sign({username: existingUser.username, id: existingUser._id}, 'test', {expiresIn: '1h'})
        res.status(200).json({result: "Authenticated Successfully", existingUser, token})
    } catch (error) {
        res.status(400).json({messafe: "Something went wrong."})
    }
}