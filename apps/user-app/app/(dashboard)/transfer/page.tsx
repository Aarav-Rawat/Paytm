import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { PrismaClient } from "@prisma/client"
import Transactions from "../../../components/Transaction";

const db = new PrismaClient;

const getTrxn = async () => {
    const session = await getServerSession(authOptions);

    const bothTrxns = await db.user.findUnique({
        where: {
            id: Number(session?.user?.id)
        },
        include: {
            sentTransfers: true,
            receivedTransfers: true,
        },
    })

    const trxns = [
        ...(bothTrxns?.receivedTransfers || []),
         ...(bothTrxns?.sentTransfers || [])
        ]

    return trxns;
}

export default async function () {
    const trxns = await getTrxn();
    return (
        <div className="w-full flex items-center gap-44 justify-center ">
            <SendCard />
            <Transactions trxns={trxns} />
        </div>
    )
}