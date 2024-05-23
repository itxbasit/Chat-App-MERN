import { useEffect, useState } from "react";
import Profile from "./profile"
import SubAbout from "./subAbout"
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Link from "../../Link";
import { useSelector } from "react-redux";
import Overlay from "../../overlay";
import toast, { Toaster } from 'react-hot-toast'

export default function About() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const [data, setData] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [freeze, setFreeze] = useState(false)
    useEffect(() => {
        token && axios.get(`${Link}searchByEmail`, {
            headers: {
                'token': token
            }
        })
            .then(function (response) {
                setCurrentUser(response.data?.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [currentUser])

    const isCurrentUserFriend = data?.friends?.filter(friend =>
        friend.email === currentUser?.email
    ).length > 0;
    const isRequests = data?.friendRequest?.filter(friend =>
        friend.email === currentUser?.email
    ).length > 0;
    const isFollowing = data?.following?.filter(friend =>
        friend.email === currentUser?.email
    ).length > 0;

    useEffect(() => {
        axios.get(`${Link}otherUserEmail/${email}`)
            .then(function (res) {
                setData(res.data.message)
            })
    }, [data])

    const token = useSelector((state) => state.token.value)


    const handleOtherClick = () => {
        if (!isCurrentUserFriend && isFollowing) {
            axios.post(`${Link}confReq`, {
                friendRequestId: data._id,
            },
                {
                    headers: {
                        'token': token
                    },
                })
                .then(function (res) {
                    setOpen(false)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        if (isRequests) {
            setFreeze(true)
            axios.delete(`${Link}cancelReq`, {
                headers: {
                    'token': token
                },
                data: {
                    friendUserId: data._id
                }
            })
                .then(function (res) {
                    toast.success(res.data.message)
                    setFreeze(false)
                })
                .catch(function (error) {
                    setFreeze(false)
                });

        }
        if (!isCurrentUserFriend && !isFollowing && !isRequests) {
            setFreeze(true)
            axios.post(`${Link}addFriends`, {
                friendUserId: data._id
            }, {
                headers: {
                    'token': token
                },
            })
                .then(function (res) {
                    toast.success(res.data.message)
                    setFreeze(false)
                })
                .catch(function (err) {
                    setFreeze(false)
                })
        }
        if (isCurrentUserFriend) {
            setFreeze(true)
            axios.delete(`${Link}unfriend`, {
                headers: {
                    'token': token
                },
                data: {
                    friendUserId: data._id
                }
            })
                .then(function (res) {
                    toast.success(res.data.message)
                    setFreeze(false)
                })
                .catch(function (error) {
                    setFreeze(false)
                });
        }
    }
    return (
        <div className="about">
            <div className="display-flex">
                <div>
                    <div className="sub-about">
                        <Profile profile={data?.proImage} username={data?.username} />
                        <div>
                            <p className="heading m-heading">{data?.username}</p>
                            <p className="sub-heading-about">{data?.bio ? data?.bio : data?.email}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleOtherClick} className="about-btn hove">
                            {isCurrentUserFriend && 'Unfriend'}
                            {isRequests && 'Withdraw request'}
                            {!isCurrentUserFriend && isFollowing && 'Confirm request'}
                            {!isCurrentUserFriend && !isFollowing && !isRequests && 'Send request'}
                        </button>
                    </div>

                </div>

                <div className="margin-left-about">
                    <SubAbout about={data?.about} />
                </div>
            </div>
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            {
                freeze &&
                <Overlay />
            }

        </div>
    )
}