

import Materail from "./material"
import ResponsiveDialog from "./dialog"
import { useEffect, useState } from "react"
import Link from "../../Link"
import { useSelector } from "react-redux"
import axios from "axios"

export default function Notification() {
    const token = useSelector((state) => state.token.value)
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(`${Link}getNoti`, {
            headers: {
                'token': token
            }
        })
            .then(function (res) {
                setData(res?.data?.message)
            })
    }, [data])

    return (
        <>
            <div className="notification">
                <p className="noti-main-head">Notifications</p>

                {
                    data?.length > 0 ?
                        data.map((v, i) => {
                            if (v.type === "request") {
                                return (
                                    <ResponsiveDialog key={i} data={v} />
                                );
                            } else {
                                return (
                                    <Materail data={v}/>
                                )
                            }
                        })
                        : <p>No notification found</p>
                }


            </div>
        </>
    )
}