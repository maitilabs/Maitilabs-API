import jwt from 'jsonwebtoken';
import  User from '../Model/userModel.js';

function authenticate(req, res, next) {

    const authHeader = req.headers['authorization']
    if (authHeader) {
        let token = authHeader.split(' ')[1]
        // verify the token 
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decoded);
            if (decoded) {
                const email = decoded.email
                const persistedUser = User.findOne({email})
                if (persistedUser) {
                    next() // carry on with the original request 
                } else {
                    // user does not exist 
                    res.json({ success: false, message: 'User does not exist!' })
                }
            } else {
                // decoding fails 
                res.status(401).json({ success: false, message: 'No authorization headers found!' })
            }
        } catch (error) {
            res.status(401).json({ success: false, message: 'Token has been tampered!' })
        }
    } else {
        // no authentication headers 
        res.status(401).json({ success: false, message: 'No authorization headers found!' })
    }

}

export default authenticate ;