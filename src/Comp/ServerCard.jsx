import React, { useEffect, useState } from 'react'

export default function ServerCard({ s, setUpdate }) {
    const [status, setStatus] = useState(false)
    const [checked, setChecked] = useState(false)

    const setStatusFun = async (statusOnOf, sda) => {
        await fetch(`https://newserver-test.herokuapp.com/setStatus`, {
            method: "put",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ statusServer: statusOnOf, serverId: s.id })
        })
        setUpdate(a => !a)
        setChecked(a => !a)
    }
    useEffect(() => {
        if (s.status == "Online") {
            setChecked(true)
        }
    }, [])

    return (
        <tr className="ServerCard">
            <td>{s.name}</td>
            <td>{s.ip}</td>
            <td>
                <h2 style={s.status == "Online" ? { color: "green" } : { color: "red" }}>
                    {s.status}
                </h2>
            </td>
            <td>{new Date(s.date).toLocaleString()}</td>
            {/* אני יודע שיכולתי לעשות גוין אבל הזמן היה קצר למרות שאופציה זאת היא בונוס שלי */}
            <td>
                {}
                {s.hostingId == 1 ? "Microsoft": null}
                {s.hostingId == 2 ? "IBM": null}
                {s.hostingId == 3 ? "GoDaddy": null}
                {s.hostingId == 4 ? "DigitalO": null}
            </td>
            <td>
                <label className="switch">
                <input type="checkbox"
                    checked={s.status == "Online"}
                    onChange={() => {
                        if (!checked) {
                            setStatusFun("Online")
                        } else {
                            setStatusFun("Ofline")
                        }
                    }}
                />
                <span className="slider"></span>
            </label>
            </td>
        </tr>
    )
}
