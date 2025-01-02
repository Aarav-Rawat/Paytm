"use server"
import {PrismaClient} from "@prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
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
           
            return {
                message: "Done"
            }
    }
    catch(err){
        console.log(err);
    }
}