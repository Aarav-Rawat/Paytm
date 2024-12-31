import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const db = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any ) {
                
                const existUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                })

                if (existUser) {
                    const result = await bcrypt.compare(credentials.password, existUser.password)
                    if (result) {
                        return {
                            id: existUser.id.toString(),
                            name: existUser.name,
                            email: existUser.email
                        }
                    }

                    return null;
                }

                try {
                    const hashedPass = await bcrypt.hash(credentials.password, 10);
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPass
                        }
                    })

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }

                } catch (e) {
                    console.log(e);
                }

                return null;
            },

        })
    ]
}