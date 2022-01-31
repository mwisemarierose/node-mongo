import User from '../models/db/user.model';
import jwtDecode from 'jwt-decode';

class Vendor {

    static async getAllclients (req, res) {

        const clients = await User.find({roles: 'client'});
        res.status(200).json({
            status: 200,
            data: clients
        })
    }
       
    }
export default Vendor; 