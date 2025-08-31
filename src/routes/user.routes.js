import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    // Define multiple fields for file uploads using multer
    upload.fields([
        {
            // First field: for uploading a single "avatar" image
            name: "avatar",      // field name in the form-data
            maxCount: 1          // allow only 1 file
        },
        {
            // Second field: for uploading a single "coverImage"
            name: "coverImage",  // field name in the form-data
            maxCount: 1          // allow only 1 file
        }
    ]),

    registerUser
 )


export default router;