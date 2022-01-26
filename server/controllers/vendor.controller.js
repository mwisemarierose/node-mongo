import User from '../models/db/user.model';
import jwtDecode from 'jwt-decode';

class Vendor {

    static async getAllclients (req, res) {
        
        const {authorization } = req.headers;
        const token = authorization.split(' ')[1];
        
        const decodedToken = jwtDecode(token);

       const users = await User.find({});
       res.status(200).json({
           status: 200,
           data: users,
       })
    }
    
}

export default Vendor; 