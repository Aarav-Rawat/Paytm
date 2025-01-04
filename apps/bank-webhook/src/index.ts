import express from "express"
import { PrismaClient } from "@prisma/client"
import bodyParser  from "body-parser";
import cors from 'cors';

const db = new PrismaClient();
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {

    try {
        const paymentInformation: {
            token: string;
            userId: string;
            amount: string
        } = {
            token: req.body.token,
            userId: req.body.userId,
            amount: req.body.amount
        };
   
            await db.$transaction([
                db.balance.updateMany({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {

                            increment: Number(paymentInformation.amount)
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Success",
                    }
                })
            ]);

            res.status(200).json({
                message: "Captured"
            })
        

    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3002);