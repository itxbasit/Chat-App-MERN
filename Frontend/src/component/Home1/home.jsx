import { NavLink } from "react-router-dom"
import CardMe from "./card"
import Notification from "../Notification/notification"
import { useEffect, useState } from "react"
import Link from "../../Link"
import axios from "axios"
import { useSelector } from "react-redux"

function Home() {
    const [data, setData] = useState()
    let token = useSelector((state) => state.token.value)
    useEffect(() => {
        axios.get(`${Link}getUser`, {
            headers: {
                'token': token
            }
        })
            .then(function (res) {
                setData(res?.data?.allUsers)
            })
    }, [data])
    return (
        <>
            <div className="margin-top-100">
                <div className="home-heading">
                    <p>Discover Users</p>
                </div>

                <div className="sub-home">

                    {
                        data ?
                            data.map((v, i) => {
                                return (
                                    <NavLink className='text-dec' to={v ? `/about?email=${v?.email}` : '/'}>
                                        <div className="card-home">
                                            <CardMe name={v?.username} friends={v?.friends?.length} pro={v?.proImage} aboutUser={v?.about}/>
                                        </div>
                                    </NavLink>
                                )
                            })
                            :
                            <p>No user found</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Home