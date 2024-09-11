import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'BookUser', required: true  // เปลี่ยนให้ใช้ ObjectId แทน String
    },
    orderIds: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'BookOrder', required: true  // เปลี่ยนเป็น ObjectId เพื่อเก็บหลาย order
    }],
    paymentMethod: { 
        type: String, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
    },
    transactionId: { 
        type: String, 
        required: true 
    },
    paymentDate: { 
        type: Date, 
        default: Date.now 
    },
});

export default mongoose.model('Payment', PaymentSchema);
