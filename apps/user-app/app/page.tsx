"use client"
import {Appbar} from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Page(): JSX.Element {
  const session = useSession();
  return (
    <div >
      <Appbar onSignIn={signIn} onSignOut={signOut} user={session.data?.user}/>
     
    </div>
  )
}