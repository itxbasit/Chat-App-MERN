
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import user from '../../../assets/images/user.png'
import App from './form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Link from '../../../Link';
import { useState } from 'react';

export default function Main({ userAbout, userContact, username, userEmail, userBio, proImage }) {
    const token = useSelector((state) => state.token.value);
    const [media, setMedia] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const formData = new FormData();
                formData.append('image', file);

                if (token) {
                    axios.post(`${Link}profileImg`, formData, {
                        headers: {
                            'token': token,
                        }
                    })
                        .then(function (response) {
                            console.log(response.data);
                            // Handle response as needed
                        })
                        .catch(function (error) {
                            console.log(error);
                            // Handle error
                        });
                }

                setMedia(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <div className="main-setting-material">
                <p className="setting-heading padding-24 center">Profile Settings</p>
                <hr className="line" />
                <div>
                    <div>
                        <img className='post-profile-img1' src={proImage ? proImage : user} alt="profile" />
                        <label className="camera-icon">
                            <FileUploadOutlinedIcon style={{ color: "#E9813B", fontSize: 24 }} />
                            <input onChange={handleFileChange} accept="image/x-png, image/gif, image/jpeg" style={{ display: "none" }} type="file" />
                        </label>
                    </div>
                    <App userAbout={userAbout} userContact={userContact} username={username} userEmail={userEmail} userBio={userBio} profile={true} />
                </div>
            </div>
        </>
    )
}