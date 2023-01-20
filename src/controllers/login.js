import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './../models/user'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.SECRETKEY;
    

/*=====================================================USER LOGIN=========================================*/



export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).send({ error: 'Invalid username' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({ error: 'Invalid password' });
            return;
        }

        const payload = {
            userId: user._id,
            username: user.username
        };
        const token = jwt.sign(payload, secretKey);
        res.send({ message:`welcome ${user.username} `,token });

    } catch (error) {
        res.status(404).send({ error: 'Error logging in' });
    }
};
/*=====================================================USER LOGIN=========================================*/



/*=====================================================USER PROFILE=========================================*/

export const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization;

        const decoded = jwt.verify(token, secretKey);

        const user = await User.findOne({ _id: decoded.userId });

        res.send(user);
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};
/*=====================================================USER PROFILE=========================================*/


/*=====================================================USER AUTHOTICATION=========================================*/

export const authenticat = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}


/*=====================================================USER AUTHOTICATION=========================================*/

