import dbConnect from '../../../util/mongo'
import Product from '../../../models/Product'

export default async function handler(req,res){

const {method, query:{id},cookies}=req;


dbConnect();

let token=cookies.token;
if(method==="PUT"){
   
    if(!token || token!==process.env.TOKEN){
        res.status(400).json("Access Denied")
    }
 
    try{
        console.log()
        const product= await Product.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(id)
    }
    catch(err){
         res.status(500).json(err)
    }


}

if(method==="DELETE"){
    if(!token || token!==process.env.TOKEN){
        res.status(400).json("Access Denied")
    }
 
    try{

        const product= await Product.findByIdAndDelete(id);
        res.status(200).json("Product is been deleted")
    }
    catch(err){
         res.status(500).json(err)
    }


}
if(method==='GET'){

    
    try{

        const product= await Product.findById(id);
        res.status(200).json(product)
    }
    catch(err){
         res.status(500).json(err)
    }


    
}


}