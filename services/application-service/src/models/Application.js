import mongoose from 'mongoose'

const appSchema = new mongoose.Schema({
    userId: {type: String , required: true},
    company: String,
    role: String,
    status:{
        type:String,
        enum: ["Applied", "Interview", "Rejected", "Offer"],
        default: "Applied",
    },
    notes: String
},{timestamps: true});

const Application = mongoose.model("Application",appSchema);

export default Application;