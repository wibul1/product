import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// สร้าง ProductSchema
const ProductSchema = new Schema({
    name: String,
    img: String,
    price: Number,
});

// สร้าง BookOrderSchema
const BookOrderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },  // อ้างอิงถึง User
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', required: true 
    }, // อ้างอิงถึง Product
    quantity: { 
        type: Number, 
        required: true 
    },
    sumPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'pending' 
    }, // สถานะเริ่มต้นเป็น 'pending'
    create_at: { 
        type: Date, 
        default: Date.now }
});

// ส่งออกโมเดล bookorders
export default mongoose.model('bookorders', BookOrderSchema);
