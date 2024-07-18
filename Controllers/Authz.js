const jwt=require('jsonwebtoken');
const Patient=require('../Models/Patient');
require('dotenv').config();

//signup
exports.createNewPatient=async (req,res)=>{
    try{

        //fetching all data from req body
        const{
            patientName,
            phoneNumber,
            age,
            gender,
            accountType
        }=req.body;

        //cheking are there all fields
        if(!patientName || !phoneNumber || !gender || !age || !accountType)
        {
            return res.status(400).json({
                success:false,
                message:"Fill all details",
            })
        }

        //check user already exist or not
        const isUserPresent=await Patient.findOne({phoneNumber});
        if(isUserPresent)
        {
            return res.status(400).json({
                success:false,
                message:"Paitent is already Registered"
            })
        }

        //creating entry in User DB
        const user=await Patient.create({
            patientName,
            phoneNumber,
            age,
            gender,
            accountType,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${patientName}${patientName}`,
        })

        console.log(51);
        //return response
        return res.status(200).json({
            success:true,
            message:"Patient registered SuccessFully",
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

//login
exports.loginPatient=async (req,res)=>{
    try{
        //fetch data from req body
        const {patientName,
              phoneNumber}=req.body;
        
        //console.log("email -> ",email);
        //if fields are absent
        if(!patientName || !phoneNumber)
        {
            return res.status(400).json({
                success:false,
                message:"Enter all fields"
            })
        }

        console.log(phoneNumber);
        //check user exist or not
        const user=await Patient.findOne({phoneNumber});
        console.log(user);
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"Patient is not registered , please create patient first"
            })
        }

        //passward matching
        const payLoad={
            phoneNumber:user.phoneNumber,
            id:user._id,
            accountType:user.accountType,
        }

        const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:"4h",
        })

        user.token=token;
        user.password=undefined;

        //create cookies and send
        const options={
            expries:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }

        return res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Patient logged in SuccessFully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
