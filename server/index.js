import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Register from "./models/registerModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import  helmet  from "helmet";



dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

// app.use(cors(
//     {
//       origin: "http://localhost:9000"
//     }
  
//   ));

app.get("/", (req, res) => {
    res.send("Hi");
})
const isvalidaEmail = (email) => {
    const charEmail = Array.from(email);
    if (email.includes('@') && email[email.length - 4] == ".") {
        return true
    }
    else {
        return false;
    }
}
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body;
        if (password != repeatPassword) {
            res.status(402).json({ message: "Both the Passwords should be same" });
        }
        else {
            const validate = isvalidaEmail(email);
            // const salt =  bcrypt.genSalt(saltRounds,(err,salt)=>{
            //     bcrypt.hash(password,salt,(err,hash)=>{
            //         password=hash
            //         hashed=1;
            //         console.log(`Hello ${password}`);
            //     })
            // });
            if (validate) {
                const user = await Register.create({ name, email, password })
                res.status(201).json({ message: "user created" })
            } else {
                res.status(404).json({ message: "Please enter a valid E-mail" });
            }
        }

    } catch (err) {
        {
            const errString = JSON.stringify(err);
            if (errString.includes("email")) {
                res.status(403).json({ message: "E-mail is already in use" });
            }
        }
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // const user = Register.findOne({name:name}).exec();
    // const isMatch = await bcrypt.compare(password,user.password);
    const user = await Register.findOne({ email: email, password: password }).exec()
    const users = await Register.find();

    if (!user) {
        res.status(404).json({ message: "User Not Found" });
    }
    else {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Logged in", user: token });
    }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to DB");
}).catch((error) => {
    console.log(error)
})

app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
})