import mongoose from "mongoose"



const ConnectionDB = async ()=>{
    return await mongoose.connect(process.env.CONNECTED_DB)
    // return await mongoose.connect("mongodb://0.0.0.1:27017/e-commerce-menWares")
    // return await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce-menWares")
    .then((res)=> console.log("ConnectionDB Running.........."))
    .catch((err)=> console.log({message:"ConnectionDB error",err}))
}



export default ConnectionDB