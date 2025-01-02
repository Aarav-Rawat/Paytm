import {PrismaClient} from "@prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { useRouter } from "next/navigation";
const db = new PrismaClient;

const router = useRouter();

export async function createOnRampTransaction(provider: string, amount: number){
    try{
        const session = await getServerSession(authOptions);
        if(!session?.user || !session?.user?.id){
            router.push("/api/auth/signin");
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
            //  await db.user.update({
            //     where:{
            //         id: Number(session?.user?.id)
            //     }
            //  })

            return {
                message: "Done"
            }
    }
    catch(err){
        console.log(err);
    }
}