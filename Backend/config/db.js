import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rs3501194:F8RQqBZnQvwwqICr@cluster0.2ezynrf.mongodb.net/foodies').then(() => console.log("Database Connected"));
}