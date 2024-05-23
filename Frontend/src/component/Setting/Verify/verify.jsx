
import App from "../Profile/form"
export default function Verify({ userAbout, userContact, username, userEmail, userBio }) {
    return (
        <div className="main-setting-material">
            <p className="setting-heading padding-24 center">Verify Your Account</p>
            <hr className="line" />
            <App userAbout={userAbout} userContact={userContact} username={username} userEmail={userEmail} userBio={userBio} verify={true}/>
        </div>
    )
}