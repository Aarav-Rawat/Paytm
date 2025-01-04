import { SidebarItem } from "../../components/SidebarItem"

export default function layout({ children }: { children: React.ReactNode }):JSX.Element {
    return (
        <div className="flex">
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <SidebarItem href={"/wallet"} icon={<TransferIcon />} title="Add to Wallet" />
                    <SidebarItem href={"/transfer"} icon={<P2PTransferIcon />} title="Transfer" />
                </div>
            </div>
            {children}
        </div>
    )
}


function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
}

function P2PTransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
}