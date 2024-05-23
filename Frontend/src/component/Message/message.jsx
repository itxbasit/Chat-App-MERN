
import Left from "./leftFrame"
import MsgFrame from "./msgFrame"
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux"
import { setFilUser } from "../../ReduxStore/setting"
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Link from "../../Link";

export default function Message() {
    const socket = useRef()
    const dispatch = useDispatch()
    const conversationId = useRef(null)
    const [data, setData] = useState()
    const [filteredUserData, setFilteredUserData] = useState(null)
    const [value, setValue] = useState()
    const [allMsg, setAllMsg] = useState(null)
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState()
    let token = useSelector((state) => state.token.value)
    let msgVal = useSelector((state) => state.msgV.value)
    let filUser = useSelector((state) => state.filUser)
    const [currentData, setCurrentData] = useState()


    useEffect(() => {

        token && axios.get(`${Link}searchByEmail`, {
            headers: {
                'token': token
            }
        })
            .then(function (response) {
                setCurrentData(response?.data?.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [currentData])

    useEffect(() => {
        socket.current = (io("ws://localhost:8900/"));
        socket.current.on("getMessage", (data) => console.log(data))
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", currentData?._id);
        socket.current.on("getUsers", users => {
            // Filter out users with userId === null
            const filteredUsers = users.filter(user => user.userId !== null);
            // Set filtered users into state
            setUsers(filteredUsers);
            dispatch(setFilUser({ value: users }));
        });
    }, [setUsers])



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

    useEffect(() => {
        axios.get(`${Link}conversation/find/${currentData?._id}`, {
            headers: {
                'token': token
            }
        })
            .then(function (res) {
                setConversations(res.data)

            })
            .catch(function (err) {
                console.log(err)
            })
    }, [conversations])
    useEffect(() => {
        if (data) {
            const userDa = data?.filter(user => user.username === msgVal.username)

            axios.post(`${Link}conversation/create/${userDa[0]?._id}`, {}, {
                headers: {
                    'token': token
                }

            })
                .then(function (res) {
                    console.log(res)
                    conversationId.current = res?.data?.message?._id
                    console.log(conversationId)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    }, [msgVal])

    useEffect(() => {
        if (data) {
            if (conversationId) {
                axios.get(`${Link}message/${conversationId.current}`, {
                    headers: {
                        'token': token
                    }
                })
                    .then(function (res) {
                        setAllMsg(res.data)
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        }
    }, [allMsg, conversationId])

    console.log(allMsg)
    return (
        <div className={conversationId.current ? "msg1" : "msg"}>
            <Left />
            {
                conversationId.current &&
                <MsgFrame allMsg={allMsg} msgUser={msgVal} currentUserId={currentData?._id} conversationId={conversationId} receiverId={msgVal?._id} socket={socket} />
            }

        </div>
    )
}