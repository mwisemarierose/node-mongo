import User from '../models/db/user.model';


class Admin {

    static async getAllUsers (req, res) {
       const users = await User.find({});
       res.status(200).json({
           status: 200,
           data: users,
       })
    }
    

}

export default Admin