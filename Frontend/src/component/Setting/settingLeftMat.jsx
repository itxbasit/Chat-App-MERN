


import { useDispatch } from "react-redux"
import { setHeading } from "../../ReduxStore/setting"
import Cookies from 'js-cookie';

export default function Materail({icon, heading}){

    const dispatch = useDispatch();
    const setting = () => {
        dispatch(setHeading({ value: heading }));
        if(heading == "Log Out"){
            Cookies.remove("token")
        }
    }
    return(
        <>
            <div onClick={setting} className='setting-material'>
               {icon}
               <p className='sett-head'>{heading}</p> 
            </div>
        </>
    )
}