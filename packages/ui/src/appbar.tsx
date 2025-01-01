
import { Button } from './button.js'

export const Appbar = (
    {
        user,
        onSignIn,
        onSignOut
    }:
    {
        user?: {
            name?: string | null
        },
        onSignIn: any,
        onSignOut: any,

    }
) => {
  
    return <div className="flex justify-between border-b px-4">
    <div className="text-lg flex flex-col justify-center">
        Paytm
    </div>
    <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignOut : onSignIn}>{user ? "Logout" : "Login"}</Button>
    </div>
</div>
  
}

export default Appbar