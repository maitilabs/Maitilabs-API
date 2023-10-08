import mongoose from "mongoose";


export function connectDB(){

    if(mongoose.connection.readyState > 0){
        return;
    }

    mongoose
    .connect('mongodb+srv://labsmaiti:pcSNC21Lhvy6EaWZ@cluster0.6ja9aht.mongodb.net/blogData') // Final (Maiti labs account) database
    .then(() => {
        console.log(`Mongo DB Connected `);
    })
    .catch((err) => {
        console.log(`Mongo DB Not Connected `,(err || '').toString());
    })

}