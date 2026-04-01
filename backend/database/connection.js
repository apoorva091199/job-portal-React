import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"JOB_PORTAL"
    }).then(()=>{
        console.log("connected to database")
    }).catch(err=>{
        console.log(`error while connecting database: ${err}`)
    })
}