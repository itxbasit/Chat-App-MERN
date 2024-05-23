
import App from "../Profile/form"
export default function chaPass( { userAbout, userContact, username, userEmail, userBio } ) {
    return (
        <div className="main-setting-material">
            <p className="setting-heading padding-24 center">Change Password</p>
            <hr className="line" />
            <App userAbout={userAbout} userContact={userContact} username={username} userEmail={userEmail} userBio={userBio} changePass={true}/>
        </div>
    )
}