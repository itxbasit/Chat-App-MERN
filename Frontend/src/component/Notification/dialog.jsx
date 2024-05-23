import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Materail from './material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Avatar from 'react-avatar';
import axios from 'axios';
import Link from '../../Link';
import { useSelector } from 'react-redux';

export default function ResponsiveDialog({ data }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const token = useSelector((state) => state.token.value)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const disAgree = () => {
        axios.delete(`${Link}delReq`, {
            headers: {
                'token': token
            },
            data: {
                friendRequestId: data?.userId,
            }
        })
            .then(function (res) {
                setOpen(false)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    const agree = () => {
        axios.post(`${Link}confReq`, {
            friendRequestId: data?.userId,
        },
            {
                headers: {
                    'token': token
                },
            })
            .then(function (res) {
                setOpen(false)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    return (
        <React.Fragment>
            <button className='btn-dialog' onClick={handleClickOpen}>
                <Materail data={data} />
            </button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className='dialog-container'
            >
                <div className='dialog-avatar'>
                    {
                        data?.proImage ?
                            <img className='profile-dialog' src={data?.proImage} alt="" />
                            : <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data?.name} size={100} round="100px" />
                    }
                </div>

                <DialogTitle className='dialog-title' id="responsive-dialog-title">
                    {data?.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className='dialog-about'>
                        {
                            data?.about ?
                                `${data?.about}`
                                : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam aliquam illo reprehenderit omnis vitae tenetur nesciunt amet exercitationem, voluptatibus quidem veniam placeat porro debitis, quae eligendi totam alias quo odio!"
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex-dialog'>
                    <Button className='rej-btn' autoFocus onClick={disAgree}>
                        <CloseOutlinedIcon className='dialog-icon' />
                        Reject
                    </Button>
                    <Button className='acc-btn' onClick={agree} autoFocus>
                        <DoneOutlinedIcon className='dialog-icon' />
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
