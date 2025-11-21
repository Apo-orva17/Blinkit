import {Router} from "express"
import { forgotPasswordController, refreshTokenController, registerUserController, resetPassword, updateDetailsController, verifyForgotPasswordOTP } from "../controllers/user.controllers.js"
import { verifyEmailController } from "../controllers/user.controllers.js"
import { loginController } from "../controllers/user.controllers.js"  
import { logoutController } from "../controllers/user.controllers.js"
import auth from "../middleware/auth.js"  
import { uploadAvatarController } from "../controllers/user.controllers.js"
import upload from "../middleware/multer.js"

const userRouter=Router()

userRouter.post(`/register`, registerUserController)
userRouter.post(`/verify-email`, verifyEmailController)
userRouter.post(`/login`, loginController)
userRouter.get(`/logout`, auth, logoutController)//for logout 'auth' is the middleware so that the login option is//available only when the user is logged in already
userRouter.put(`/upload-avatar`, auth, upload.single('avatar'), uploadAvatarController)
userRouter.put(`/update-user`, auth, updateDetailsController),
userRouter.put(`/forgot-password`, forgotPasswordController),
userRouter.put(`/verify-forgot-password-otp`, verifyForgotPasswordOTP)
userRouter.put(`/reset-password`, resetPassword)
userRouter.post(`/refresh-token`, refreshTokenController)

export default userRouter