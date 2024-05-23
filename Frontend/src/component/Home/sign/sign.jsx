
import App from "./signPage"
import { NavLink } from "react-router-dom"

export default function Sign({ heading, subHeading, creHeading, navigate, btnHead, signUp }) {
    return (
        <>

            <div className="container">
                <h1 className="heading">{heading}</h1>
                <App btnHead={btnHead} signUp={signUp}/>
                <p className="col-silver">{subHeading} <NavLink to={navigate} className="sign-font">{creHeading}</NavLink></p>
            </div>
        </>
    )
}