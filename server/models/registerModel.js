import mongoose from "mongoose";

const registerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique : true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String, 
            required: true,
        }
    },
    {
        timestamps: true
    }
);


const Register = mongoose.model("Register", registerSchema);

export default Register;