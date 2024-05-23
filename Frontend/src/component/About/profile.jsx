
import Avatar from 'react-avatar';
import im from '../../assets/images/4.jpg'

export default function Profile({profile, username}){
    return(
        <div className='about-pro'>
            {
                profile ?
                <img src={profile} alt="" className='about-profile'/> :
                <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={username} size={80} round={100} />
            }
            
            
        </div>
    )
}