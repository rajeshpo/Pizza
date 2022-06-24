import dbConnect from '../../../util/mongo'
import { errorHandler, resHandler, validateResult } from '../../../utils/common'
import User from '../../../models/User'
import bcrypt from 'bcrypt'
export default async function handler(req,res){

    if(req.method!=='POST'){
        errorHandler("Invalid Request",res)
    }

    else{
        try{
            const {name,email,password}=req.body;
            validateResult(req.body)
        
            const hashPassword=await bcrypt.hash(req.body.password,8)
        
            await dbConnect()
        
             const user=new User({...req.body,password:hashPassword})
             const saveUser=await user.save()
        
             if(saveUser){
        
                const userDoc=saveUser._doc;
                console.log(userDoc)
                delete userDoc.password
                 resHandler(userDoc,res)
             }
             else{
                 errorHandler('something went wrong',res)
             }
        
        }
        catch(err){
        errorHandler(err,res)
        }
        
    }
}