const User = require('../models/UserModel.js')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')
const bcrypt = require('bcrypt')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
            
        } catch(e) {
            reject(e);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The email is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            // console.log('Compare', comparePassword)
            if (!comparePassword)
            {
                resolve({
                    status: 'OK',
                    message: 'Password or is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token: access_token,
                refresh_token: refresh_token
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const updateUser = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: 'OK',
                message: 'The user is not undefined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id,data, {new: true})
            console.log(updateUser)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: 'OK',
                message: 'The user is not undefined'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete User SUCCESS',
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Get All User SUCCESS',
                data: allUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: 'OK',
                message: 'The user is not undefined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Get Detail User SUCCESS',
                data: checkUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}