import React, { useEffect, useState } from 'react'
import ServerCard from './ServerCard'

export default function ServerList() {
    const [servers, setServers] = useState([])
    const [update, setUpdate] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await fetch('https://newserver-test.herokuapp.com/servers')
            const data = await res.json()
            setServers(data)
        })()
    }, [update])
    const onlineServers = async () => {
        const res = await fetch(`https://newserver-test.herokuapp.com/onlineServers`)
        const data = await res.json()
        setServers(data)
    }
    return (
        <div className="ServerList">
            <div className="Tilte">
                <h1>Servers List</h1>
                <div>
                    <h4>Show Active Servers</h4>
                    <label className="switch">
                        <input type="checkbox"
                            onClick={() => {
                                if (!checked) {
                                    setChecked(a => !a)
                                    onlineServers()
                                } else {
                                    setChecked(a => !a)
                                    setUpdate(a => !a)
                                }
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            <div className="MainServer">

                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr className="HeaderTable">
                            <th>Name</th>
                            <th>Ip</th>
                            <th>Status</th>
                            <th>Register</th>
                            <th>Hosting</th>
                            <th>Set</th>
                        </tr>
                        {servers.map((s, i) => <ServerCard key={i} s={s} setUpdate={setUpdate} />)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
