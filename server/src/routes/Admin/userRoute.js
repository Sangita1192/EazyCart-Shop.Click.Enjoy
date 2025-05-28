import express from 'express';
import { logoutUser, registerUserController, removeImageFromCloudinary, resendOTP, updateUserDetails, userLogin, userProfileUpload, verifyUserAccount} from '../../controllers/Admin/userController.js';
import auth from '../../middleware/auth.js';
import upload from '../../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyUserAccount);
userRouter.post('/resend-otp', resendOTP);
userRouter.post('/login', userLogin);
userRouter.get('/logout', auth, logoutUser);
userRouter.put('/upload-profile', auth, upload.array('profilePicture'), userProfileUpload);
userRouter.delete('/remove-img',auth, removeImageFromCloudinary);
userRouter.put('/update-detail/:id', auth,  updateUserDetails);
export default userRouter;