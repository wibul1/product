import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/bookUserModel.js'; // ใช้ชื่อโมเดลให้ถูกต้อง

export const registerUser = async (req, res, next) => {
    try {
        const { name, img, address, phoneNumber, email, password } = req.body;

        // ตรวจสอบว่าผู้ใช้งานมีอยู่ในระบบแล้วหรือไม่
        const existingUser = await User.findOne({ 'auten.email': email });
        if (existingUser) {
            return res.status(400).send({
                message: 'Email already exists',
            });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างผู้ใช้ใหม่
        const newUser = new User({
            name,
            img,
            address,
            phoneNumber,
            auten: {
                email,
                password: hashedPassword,
                token: ''
            },
            status: 'active'
        });

        await newUser.save();

        res.status(201).send({
            message: 'User registered successfully',
            data: newUser,
        });
    } catch (error) {
        console.error('Error registering user:', error.message);
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await User.findOne({ 'auten.email': email });
        if (!user) {
            return res.status(400).send({
                message: 'Invalid email or password',
            });
        }

        // เปรียบเทียบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.auten.password);
        if (!isMatch) {
            return res.status(400).send({
                message: 'Invalid email or password',
            });
        }

        // สร้าง JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.auten.email },
            'your_jwt_secret', // เปลี่ยนเป็นค่า secret ของคุณ
            { expiresIn: '1h' }
        );

        // บันทึก token ในฐานข้อมูล (ถ้าต้องการ)
        user.auten.token = token;
        await user.save();

        res.status(200).send({
            message: 'Login successful',
            token,
            user: {
                name: user.name,
                email: user.auten.email,
            }
        });
    } catch (error) {
        console.error('Error during authentication:', error.message);
        next(error);
    }
}

export const GetUserId = async (req, res, next) => {
    try {
        const { userId } = req.query;  // รับ userId จาก query parameters
        console.log(userId);

        // ค้นหาผู้ใช้ตาม userId โดยไม่ดึงฟิลด์ auten
        const user = await User.findById(userId).select('-auten');

        if (!user) {
            return res.status(404).send({
                message: 'User not found',
            });
        }

        res.status(200).send({
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        next(error);
    }
};
