import express from 'express';
const router = express.Router();
import { signUp, verifyOtp ,login,getBlogs,addBlog} from'../Controllers/userController.js';
import verifyAuthentication from '../Middleware/verifyjwt.js';

router.route('/api/signup')
    .post(signUp);

router.route('/api/signup/verify')
    .post(verifyOtp);

router.route('/api/login')
    .post(login);

router.route('/showBlogs')
    .all(verifyAuthentication)
    .get(getBlogs);

router.route('/addBlog')
    .all(verifyAuthentication)
    .post(addBlog);    

export default router;