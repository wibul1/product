import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookUserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    type: String,
    create_at: { type: Date, default: Date.now }
});

export default mongoose.model('bookUsers', BookUserSchema);
