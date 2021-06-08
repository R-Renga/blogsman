import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import PostRoutes from './routes/Posts.js'
import userRouter from './routes/user.js'
import dotenv from 'dotenv';

const app = express()

dotenv.config();



app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',PostRoutes)
app.use('/user',userRouter)

app.get('/',(req,res)=> {
    res.send('APP IS WORKING');
});

const CONNECTION_URL = "mongodb+srv://rengaraja:rengaraja123@cluster0.ubmjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true })
.then(()=> app.listen(PORT,() => console.log(`Server Running on port : ${PORT}` )))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify' , false);