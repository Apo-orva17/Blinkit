import UserModel from "../models/user.model.js"
import bcrypt, { genSalt } from 'bcryptjs'//for encryption of password
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"
import sendEmail from "../config/sendEmail.js"
import jwt from 'jsonwebtoken'
import generateRefreshToken from "../utils/generateRefreshToken.js"
import generateAccessToken from "../utils/generateAccessToken.js"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"
import generateOTP from "../utils/generateOTP.js"
import forgotPasswordTemplateController from "../utils/forgotPasswordTemplate.js"
import generateaccessToken from "../utils/generateAccessToken.js"


//register user
export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body//extraxt these 3 mandatory feilds from the request body
        //if name, email or password is missing
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
                error: true,
                success: false
            })
        }
        //else if all 3 are present
        //check if the email is already registred
        const user = await UserModel.findOne({ email })
        if (user) {
            //email already registred
            return res.status(400).json({
                message: "Email is already registred",
                error: true,
                success: false
            })
        }
        else {
            //encryption of password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            //creating a new user
            const payload = {
                name,
                email,
                password: hashPassword
            }
            const newuser = new UserModel(payload)
            const save = await newuser.save()//save the user data in database

            const verifyEmailURL = `${process.env.FRONTEND_URL}/verify_email?codes=${save._id}`


            const verifyEmail = await sendEmail({
                sendTo: email,
                subject: "Please verify your email",
                html: verifyEmailTemplate({
                    name,
                    url: verifyEmailURL
                })

            })
            return res.json({
                message: "User registered successfully. Please check your email to verify your account.",
                error: false,
                success: true,
                data: save//display the saved user data
            })

        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//verify email and change status to verified
export async function verifyEmailController(req, res) {
    try {

        const { codes } = req.body
        const user = await UserModel.findOne({ _id: code })

        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }
        else {
            const updateUser = await UserModel.updateOne({ _id: codes }, {
                verify_email: true
            })
            return res.json({
                message: "Email verified successfully",
                error: false,
                success: true
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//login user
export async function loginController(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                error: true,
                success: false
            })
        }

        //check if the email is registred or not
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "email not registred",
                error: true,
                success: false
            })
        }
        else {
            //email registred
            //now check for if the email is active or not

            if (user.status !== "Active") {
                return res.status(400).json({
                    message: "Your account is not active. Please contact admin",
                    error: true,
                    success: false
                })
            }
            else {
                //user is active
                //now match the password
                const checkPassword = await bcrypt.compare(password, user.password)
                if (!checkPassword) {
                    //incorrect password
                    return res.status(400).json({
                        message: "Invalid password",
                        error: true,
                        success: false
                    })
                }
                else {
                    //correct password
                    //login successfull
                    const accessToken = await generateAccessToken(user._id)
                    const refreshToken = await generateRefreshToken(user._id)


                    //sending cookies
                    const cookieOptions = {
                        httpsOnly: true,
                        secure: true,
                        sameSite: "None"
                    }
                    res.cookie('accessToken', accessToken, cookieOptions)
                    res.cookie('refreshToken', refreshToken, cookieOptions)

                    return res.json({
                        message: "Login successful",
                        error: false,
                        success: true,
                        data: {
                            accessToken,
                            refreshToken
                            //passing tokens as sometimes cookies might not be sent
                        }
                    })
                }
            }
        }
    }



    catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout user
export async function logoutController(req, res) {
    try {
        const userId = req.userId//using middleware 'auth'

        //actual logout part
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie('accessToken', cookieOption)
        res.clearCookie('refreshToken', cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        })

        return res.json({
            message: "Logout successful",
            error: false,
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//upload user avatar
export async function uploadAvatarController(req, res) {
    try {
        const userId = req.userId//using auth middleware
        const image = req.file //using mukter middleware
        const upload = await uploadImageCloudinary(image)


        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.json({
            message: "Profile updates successfully ",
            error: false,
            success: true,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//update user details
export async function updateDetailsController(req, res) {
    try {
        const userId = req.userId//auth middleware
        const { name, email, password, mobile } = req.body

        let hashPassword = ""
        if (password) {//encrypt new password
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),//if the name is provided then update otherwise nochange
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword }),

        })

        return res.json({
            message: "User details updated successfully",
            error: false,
            success: true,
            data: updateUser
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//forgot password controller=>when user not logged in
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email })

        if (!user) {
            //login email not registred
            return res.json({
                message: "Email not found",
                error: true,
                succcess: false
            })
        }
        //email registred
        //send otp

        const otp = generateOTP()
        const expireTime = new Date() + 60 * 60 * 1000//expiry time:1 hour


        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forogot_password_expiry: new Date(expireTime).toString()
        })
        //send otp through email
        await sendEmail({
            sendTo: email,
            subject: "Forgot password for BlinkIt",
            html: forgotPasswordTemplateController({
                name: user.name,
                otp: otp
            })
        })

        return res.json({
            message: "OTP sent to your email",
            error: false,
            succcess: true

        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//verify otp for forget password
export async function verifyForgotPasswordOTP(req, res) {
    try {
        const { email, otp } = req.body//coming from request

        if (!email || !otp) {//if either email or otp is not provided by the user
            return res.status(400).json({
                message: "Email and OTP both are required",
                error: true,
                success: false
            })
        }


        const user = await UserModel.findOne({ email })

        if (!user) {
            //login email not registred
            return res.json({
                message: "Email not found",
                error: true,
                succcess: false
            })
        }

        //valid user
        const currentTime = new Date().toString()

        if (user.forogot_password_expiry < currentTime) {
            //otp expired
            return res.status(400).json({
                message: "OTP expired",
                error: true,
                success: false
            })
        }

        //otp not expired
        //check otp
        if (otp !== user.forgot_password_otp) {
            //wrong otp
            return res.status(400).json({
                message: "Incorrect OTP",
                error: true,
                success: false
            })
        }

        //correct otp
        //correct time
        //let the user change password

        return res.json({
            message: "OTP verified successfully",
            error: false,
            succcess: true
        })


    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//reset password
export async function resetPassword(req, res) {
    try {

        const { email, newPassword, confirmPassword } = req.body

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: " All fields are required",
                error: true,
                success: false
            })
        }

        //all details given by user
        const user = await UserModel.findOne({ email })

        //check if the email exists in database or not
        if (!email) {
            return res.status(400).json({
                message: " Email not found",
                error: true,
                success: false
            })
        }

        //legit user
        //check if both passwors are same
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password and Confirm password must be same",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)



        const update = await UserModel.findOneAndUpdate(user._id, {
            password: hashPassword
        })

        return res.json({
            message: "Password updated successfully",
            error: false,
            success: true
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//refresh token controller
export async function refreshTokenController(req, res) {
    try {

        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]//the command after or is for mobile version
        //bearer token=> [bearer token]

        if (!refreshToken) {
            return res.status(402).json({
                message: "Invalid token",
                error: "true",
                success: false
            })
        }

       const verifyToken= await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

       //EXPIRED TOKEN
       if(!verifyToken){
        return res.status(401).json({
            message:" Token expired",
            error:true,
            succcess:false
        })
       }

       //unexpired token
       const userId=verifyToken._id
       const newAccessToken=await generateaccessToken(userId)
  //sending cookies
                    const cookieOptions = {
                        httpsOnly: true,
                        secure: true,
                        sameSite: "None"
                    }
       res.cookie('accessToken', newAccessToken, cookieOptions)

       return res.json({
        message:"New Access Token Genrated",
        error:false,
        succcess:true,
        data:{
            accessToken: newAccessToken
        }
       })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}