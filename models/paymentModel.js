import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    userId: { type: String, required: true },
    orderIds: [{ type: String, required: true }], // เก็บหลาย order IDs
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    transactionId: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
});

export default mongoose.model('payments', PaymentSchema);
