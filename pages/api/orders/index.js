import dbConnect from '../../../util/mongo'
import Order from '../../../models/Order'

export default async function handler(req,res){

const {method}=req;

dbConnect();

if(method==="POST"){
 
    try{

        const order= await Order.create(req.body);
        console.log(order)
        res.status(200).json(order)
    }
    catch(err){
         res.status(500).json(err)
    }


}
if(method==='GET'){

    
    try{

        const orders= await Order.find();
        res.status(200).json(orders)
    }
    catch(err){
         res.status(500).json(err)
    }


    
}


}