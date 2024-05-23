import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import Materail from './settingLeftMat';

export default function SettingLeft({ ver }) {
    return (
        <div className='setting'>
            <div className='setting-flex'>
                <p className='setting-heading'>Settings</p>
                {
                    !ver  ?
                        <div className='setting-flex setting-main'>
                            <PersonOffOutlinedIcon fontSize='12' />
                            <p className='font-12'>Unverified</p>
                        </div>
                    : ""
                }


            </div>

            <Materail icon={<PermIdentityOutlinedIcon className='sett-icon' />} heading={"Profile Settings"} />

            <Materail icon={<HttpsOutlinedIcon className='sett-icon' />} heading={"Change Password"} />

            <Materail icon={<DateRangeOutlinedIcon className='sett-icon' />} heading={"Invitations"} />

            <Materail icon={<CallToActionOutlinedIcon className='sett-icon' />} heading={"Available For Invitation"} />

            <Materail icon={<HowToRegOutlinedIcon className='sett-icon' />} heading={"Verify Your Account"} />

            <Materail icon={<ShieldOutlinedIcon className='sett-icon' />} heading={"Privacy Policy"} />

            <Materail icon={<LogoutOutlinedIcon className='sett-icon' />} heading={"Log Out"} />
        </div>
    )
}