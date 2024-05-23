
import Avatar from "react-avatar"
import InputField from "./inputField"
import im from '../../assets/images/4.jpg'
import rating from '../../assets/images/rating.png'

export default function MsgFrame({ conversationId, receiverId, socket, currentUserId, msgUser, allMsg }) {
    return (
        <div className="main-setting-material">
            <div className="dis-flex-jus">
                <p className="setting-heading padding-24 center">{msgUser.username}</p>
                <img src={rating} alt="" className="icon-msg-frame none" />
            </div>

            <hr className="line " style={{ marginTop: "2px" }} />
            <div className="text-frame">

                {
                    allMsg?.length > 0 ?
                    allMsg.map((v, i) => {
                        console.log(v)
                        if (v.sender === currentUserId) {
                            return (
                                <div className="current-user-flex">
                                    <div className="current-user-msg">
                                        <p>{v.text}</p>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="sender-user-flex">
                                    <div className="margin-12">
                                        {
                                            msgUser?.proImage ?
                                            <img src={msgUser?.proImage} alt="" className="header-profile-img" />
                                            : <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={msgUser?.username} size={30} round="20px" />
                                        }
                                        
                                        
                                    </div>
                                    <div style={{ backgroundColor: "#FCEFE6" }} className="current-user-msg">
                                        <p>{v.text}</p>
                                    </div>

                                </div>
                            )
                        }
                        
                    })
                    :<p className="no-conv">No conversation found</p>
                }





            </div>
            <InputField currentUserId={currentUserId} conversationId={conversationId} socket={socket} receiverId={receiverId} />
        </div>
    )
}