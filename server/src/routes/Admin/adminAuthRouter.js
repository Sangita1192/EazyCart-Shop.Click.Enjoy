import express from "express";
import { adminLogin, adminLogout, registerAdminUser } from "../../controllers/Admin/adminController.js";
import multer from "multer";
import { adminAuth } from "../../middleware/auth.js";
const upload = multer();

const adminAuthRouter = express.Router();

adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.post("/register",upload.none(), registerAdminUser);
adminAuthRouter.get("/check-auth", adminAuth(), (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            id: req.adminId,
            role: req.adminRole,
        },
    });
});
adminAuthRouter.post("/logout", adminAuth(), adminLogout);

export default adminAuthRouter;
