import mongoose from "mongoose";
const selectPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    email: { type: String, required: true },
});

const SelectPlan = mongoose.model("SelectPlan", selectPlanSchema);
export default SelectPlan;