
import { useEffect, useState } from "react"
import LeftMsgMat from "./leftMessageMat"
import { useSelector } from "react-redux"
import axios from "axios"
import Link from "../../Link"
import { useDispatch } from "react-redux"
import { setMsgV } from "../../ReduxStore/setting"

export default function Left() {
    const [data, setData] = useState()
    const dispatch = useDispatch()
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
    const conversatin = (v) => {
        dispatch(setMsgV({ value: v}));
    }


    return (
        <div className="msg-left-frame margin">
            <div className='setting-flex'>
                <p className='setting-heading fixed'>Messages</p>
            </div>

            {
                data?.map((v, i) => {
                    return (
                        <div onClick={() => conversatin(v)} className="margin-msg-top">
                            <LeftMsgMat name={v?.username} profile={v.proImage} activeAt={v?.
                                ActiveAt} />
                        </div>
                    )
                })
            }

        </div>
    )
}