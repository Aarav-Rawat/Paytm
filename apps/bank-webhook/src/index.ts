import express from "express"
import { PrismaClient } from "@prisma/client"
const db = new PrismaClient();
const app = express();

app.post("/hdfcWebhook",async (req,res)=>{
    const paymentInfo = {
        userId: req.body.id,
        amount: req.body.amount,
        token: req.body.token
    }

try{
    await db.balance.update({ 
    
        where:{
            userId: paymentInfo.userId
        },
        data:{
            amount:{
                increment: paymentInfo.amount
            }
        }
    })

     await db.onRampTransaction.update({
        where:{
            token: paymentInfo.token
        },
        data:{
            status: "Success"
        }
     })

     res.status(200).json({
        message: "captured"
     })
}
catch(err){
    console.log(err);
    res.status(411).json({
        message: "error while payment processing webhook"
    })
}
  
})