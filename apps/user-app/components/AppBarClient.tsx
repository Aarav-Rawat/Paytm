"use client"
import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";


export function AppBarClient() {
    const session = useSession();
    const router = useRouter();
    return (
        <Appbar user={session?.data?.user} onSignIn={signIn} onSignOut={async () => {
            await signOut();
            router.push("/api/auth/signin");
        }} />
    )
}