import mongoose from 'mongoose';
const { Schema } = mongoose;

const PosterSchema = new Schema({
    name: String,
    img: String,
    status: String,
    create_at: { type: Date, default: Date.now }
});

export default mongoose.model('posters', PosterSchema);
