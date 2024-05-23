
import Sign from "./sign/sign"

export default function Home(){
    return(
        <>
            <div className="home">
                <Sign heading={"Welcome! Signup Now"} subHeading={"If already have account /"} creHeading={"Login Now"} navigate={'/signIn'} btnHead={"SignUp"} signUp={true}/>
            </div>
        </>
    )
}