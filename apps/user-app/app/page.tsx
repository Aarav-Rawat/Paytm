
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
      {/* <Appbar onSignIn={signIn} onSignOut={signOut} user={session.data?.user}/> */}
     
      if(session?.user){
        redirect("/dashboard")
      }
      else{
      redirect("/api/auth/signin")
      }
     
}