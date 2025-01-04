"use server"
import {PrismaClient} from "@prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from 'axios';
const db = new PrismaClient;

 
export async function createOnrampTransaction(provider: string, amount: number){
    
    try{
        const session = await getServerSession(authOptions);
        if(!session?.user || !session?.user?.id){
            return {
                message: 'User not found'
            }
        }
        const token = (Math.random() * 1000).toString();
        await db.onRampTransaction.create({
             data:{
                status :   "Processing",
                token,
                provider,
                amount: amount * 100,
                startTime: new Date(),
                userId: Number(session?.user?.id)
               
             }
        })

        const bankResponse = await axios.post("http://localhost:3001/hdfcWebhook",{
            token,
            amount: amount*100,
            userId: session?.user?.id
        })
           
        if(bankResponse.data.message === "Captured"){
            return {
                message: "Done"
            }
        }

        return{
            message: "err from bank"
        }
    }
    catch(err){
        console.log(err);
    }
}