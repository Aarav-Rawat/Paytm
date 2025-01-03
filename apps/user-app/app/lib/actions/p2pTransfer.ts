"use server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
const db = new PrismaClient;

export async function p2pTransfer(number: string, amount: number) {

    try {
        const session = await getServerSession(authOptions);
        const fromUser = session?.user?.id;
        if (!fromUser) {
            return {
                message: "user not exist"
            }
        }

        const toUser = await db.user.findFirst({
            where: {
                number
            }
        });

        if (!toUser) {
            return {
                message: "User not found"
            }
        }

        await db.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;
    
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(fromUser) },
              });
                
              if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
              }
    
              await tx.balance.update({
                where: { userId: Number(fromUser) },
                data: { amount: { decrement: amount } },
              });
    
              await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
              });
    
             
        });
    }
    catch (err) {
        return {
            message: "err while p2p",
            err
        }
    }
}