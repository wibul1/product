import axios from 'axios';
import express from 'express';
import speedInsights from '@vercel/speed-insights';
import bodyParser from 'body-parser'; // เปลี่ยน require เป็น import
import cors from 'cors'; // เปลี่ยน require เป็น import
import dotenv from 'dotenv'; // เปลี่ยน require เป็น import
dotenv.config(); // ต้องเรียกใช้แบบนี้ใน ES module

// import services
import { connectToDb } from './services/connectdb.js'; // ใส่ .js ต่อท้ายด้วย

// import routes
import product from './routes/productRoutes.js'; // ใส่ .js ต่อท้ายด้วย
import user from './routes/userRoutes.js'; 
import order from './routes/orderRoutes.js'; 
import payment from './routes/paymentRoutes.js';

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // ใช้ body-parser เพื่อ parse ข้อมูลที่เข้ามาเป็น JSON
app.use(cors({ methods: '*' })); // ใช้ CORS เพื่ออนุญาต request จาก domain อื่น

connectToDb(); //เชื่อมต่อ db

// กำหนด part และเส้นทางของ routes
app.use('/product', product);
app.use('/user', user);
app.use('/order', order);
app.use('/payment', payment);

// เส้นทางสำหรับตรวจสอบประสิทธิภาพเว็บไซต์
app.get('/performance', async (req, res) => {
    try {
        const urlToTest = 'https://example.com'; // URL ที่จะตรวจสอบ

        // ตั้งค่า header Authorization โดยใช้ Bearer Token
        const headers = {
            'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` // อ่านจาก .env
        };

        // เรียก API ของ Vercel โดยใส่ Authorization Header
        const insights = await axios.post('https://api.vercel.com/v1/speed-insights', {
            url: urlToTest,
            strategy: 'mobile' // หรือ 'desktop'
        }, { headers });

        // ส่งผลลัพธ์กลับให้ผู้ใช้
        res.json(insights.data);
    } catch (error) {
        console.error('Error fetching speed insights:', error);
        res.status(500).json({ error: 'Unable to fetch speed insights' });
    }
});

// กำหนด port ในการรัน Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
