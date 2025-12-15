import express from "express";
import { adminLogin, adminLogout, registerAdminUser } from "../../controllers/Admin/adminController.js";
import multer from "multer";
import { adminAuth } from "../../middleware/auth.js";
import AdminModel from "../../models/admin.model.js";
const upload = multer();

const adminAuthRouter = express.Router();

adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.post("/register",upload.none(), registerAdminUser);
adminAuthRouter.get("/check-auth", adminAuth(), async (req, res) => {
    const user = await AdminModel.findOne(req.adminId);

    return res.status(200).json({
        success: true,
        user: {
            id: user._id,
            role: user.role,
            email:user.email,
            name: user.name
        },
    });
});
adminAuthRouter.post("/logout", adminAuth(), adminLogout);

export default adminAuthRouter;
