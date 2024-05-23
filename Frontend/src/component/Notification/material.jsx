
import Avatar from 'react-avatar';
import convertToRelativeTime from '../../time';

export default function Materail({ data }) {
    return (
        <>
            <div className='noti-flex'>
                <div>
                    {
                        data?.proImage ?
                        <img src={data?.proImage} alt=""className='noti-profile' />
                        : <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data?.name} size={50} round="10px" />
                    }
                    
                    
                </div>
                <div className='noti-mate'>
                    <p className='noti-time'>{convertToRelativeTime(data?.time)}</p>
                    <p className='req'>{data?.msg}</p>
                </div>
            </div>
        </>
    )
}