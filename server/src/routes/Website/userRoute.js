import express from 'express';
import { logoutUser, registerUserController, resendOTP, updateUserDetails, userLogin, userProfileUpload, verifyUserAccount } from '../../controllers/Website/userController.js';
import auth from '../../middleware/auth.js';
import upload from '../../middleware/multer.js';
import { removeImageFromCloudinary } from '../../utils/Cloudinary/removeImgCloudinary.js';


const userRouter = express.Router();

userRouter.post('/register',upload.none(), registerUserController);
userRouter.post('/verify-email', verifyUserAccount);
userRouter.post('/resend-otp', resendOTP);
userRouter.post('/login', userLogin);
userRouter.get('/logout', auth, logoutUser);
userRouter.put('/upload-profile', auth, upload.array('profilePicture'), userProfileUpload);
userRouter.delete('/remove-img',auth, removeImageFromCloudinary);
userRouter.put('/update-detail/:id', auth,  updateUserDetails);
export default userRouter;