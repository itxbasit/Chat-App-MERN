

import Sign from "../sign/sign"
export default function SignIn() {
    return (
        <>
            <div className="home">
                <Sign heading={"Hey! Login Now"} subHeading={"If you haven't account /"} creHeading={"Signup Now"} navigate={'/'} btnHead={"SignIn"}/>
            </div>

        </>
    )
}