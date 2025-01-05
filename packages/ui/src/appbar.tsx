

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
    <div className="text-2xl flex flex-col justify-center text-[#6a51a6] font-bold">
        AssPay
    </div>
    <div className="flex flex-col justify-center pt-2">
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={user ? onSignOut : onSignIn}> {user ? "Logout" : "Login"} </button>
      
    </div>
</div>
  
}

export default Appbar