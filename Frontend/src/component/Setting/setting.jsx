
import SettingLeft from "./settingLeft"
import Main from "./Profile/profile"
import ChaPass from "./ChangePassword/changePass";
import { setHeading } from "../../ReduxStore/setting"
import { useSelector } from 'react-redux';
import Verify from "./Verify/verify";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "../../Link";

export default function Settings() {
    const heading = useSelector((state) => state.heading.value);
    const [data, setData] = useState()
    const token = useSelector((state) => state.token.value)

    useEffect(() => {
        token && axios.get(`${Link}searchByEmail`, {
            headers: {
                'token': token
            }
        })
            .then(function (response) {
                setData(response.data?.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [data])

    return (
        <div className="setting-main1">
            <SettingLeft ver={data?.verified}/>

            {
                heading == "Profile Settings" &&
                <Main userAbout={data?.about} userContact={data?.contact} username={data?.username} userEmail={data?.email} userBio={data?.bio} proImage={data?.proImage} />
            }

            {
                heading == "Change Password" &&
                <ChaPass userAbout={data?.about} userContact={data?.contact} username={data?.username} userEmail={data?.email} userBio={data?.bio}/>
            }

            {
                heading == "Verify Your Account" &&
                <Verify userAbout={data?.about} userContact={data?.contact} username={data?.username} userEmail={data?.email} userBio={data?.bio}/>
            }

        </div>
    )
}