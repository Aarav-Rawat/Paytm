"use client"
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export function AddMoney() {
    const [amount, setAmount] = useState(0);

    return (
        <Card title="Add Money">
            <div>
                <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => setAmount(Number(val))} />

                <div className="py-4 text-left">
                    Bank
                </div>

           <Select options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
            </div>
        </Card>
    )
}