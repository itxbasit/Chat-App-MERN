
import Avatar from "react-avatar"
import profile from '../../assets/images/4.jpg'
import convertToRelativeTime from "../../time"

export default function LeftMsgMat({ profile, name, activeAt, about}) {
    return (
        <div className="msg-flex hove">
            <div>
                {
                    profile ?
                    <img className="msg-img" src={profile} alt="" />
                    :<Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={name} size={55} round="10px" />
                }
            </div>
            <div>
                <div className="msg-flex-just">
                    <p className="heading">{name}</p>
                    <p className="time">{convertToRelativeTime(activeAt) === "Just now" ? "Online" : convertToRelativeTime(activeAt)}</p>
                </div>
                <div>
                    <p className="msg-para">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit..
                    </p>
                </div>
            </div>

        </div>
    )
}