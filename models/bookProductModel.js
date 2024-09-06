import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookProductSchema = new Schema({
    name: String,
    img: String,
    author: String,
    format: String,
    book_depository_stars: Number,
    price: Number,
    old_price: Number,
    category: String,
    create_at: { type: Date, default: Date.now }
});

export default mongoose.model('bookProducts', BookProductSchema);
