import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const db = new PrismaClient();


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: { credentials: any }) {
                
                const user = await db.user.findFirst({
                    where: {
                        number: credentials.phone;
                    }
                })

                if (user) {
                    const result = await bcrypt.compare(credentials.password, user.password)
                    console.log(result)
                    if (result) {
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            id: user.email
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
})