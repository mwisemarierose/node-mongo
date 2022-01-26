import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require ('dotenv').config();


class authenticate{
    static generateToken(user){
        return jwt.sign({user}, process.env.SECRET_KEY ,{expiresIn:'30d'})
    }

    static hashpassword(password){
        return bcrypt.hashSync(password,10)
    }

    static comparePassword(password, hashedPassword){
        return bcrypt.compareSync(password, hashedPassword)
    }
}
export default authenticate;