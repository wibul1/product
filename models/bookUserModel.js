import mongoose from 'mongoose';
const { Schema } = mongoose;

const AutenSchema = new Schema({
    email: String,
    password: String,
    token: String,
});

const UserSchema = new Schema({
    name: String,
    img: String,
    address: String,
    phoneNumber: String,
    auten: AutenSchema,
    status: String,
    create_at: { type: Date, default: Date.now }
});

export default mongoose.model('bookUser', UserSchema);
