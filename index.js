const express=require('express');
const cookieParser = require('cookie-parser')
const fileUpload=require('express-fileupload');
const { dbconnect } = require('./Config/databases');
const patientRoutes=require('./Routes/patientRoutes')
require('dotenv').config();

const app=express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.get('/',(req,res)=>{
    res.send("Welcome to server")
})

app.use('/api/v1/patient',patientRoutes);

const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("Server is running at PORT ",PORT);
})

dbconnect();