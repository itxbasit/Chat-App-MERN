import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Avatar from 'react-avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../ReduxStore/setting';
import { showNotification, hideNotification } from '../../ReduxStore/notificationReducer';
import { useState, useEffect } from "react"
import Notification from '../Notification/notification';
import { ColumnChooserSelection } from 'devextreme-react/cjs/data-grid';
import axios from 'axios';
import Link from '../../Link';
import im from '../../assets/images/user.png'

const drawerWidth = 240;
const navItems = ['Home', 'Messages', 'Notification', 'Settings'];
const icon = [<HomeOutlinedIcon className='margin-nav' />, <MailOutlineOutlinedIcon className='margin-nav' />, <NotificationsNoneOutlinedIcon className='margin-nav' />, <WidgetsOutlinedIcon className='margin-nav' />]

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const [data, setData] = useState()
    const token = useSelector((state) => state.token.value)

    useEffect(() => {
      axios.put(`${Link}ActiveAt`, {}, {
        headers: {
          'token': token,
        }
      })
    })

    useEffect(() => {

        token && axios.get(`${Link}searchByEmail`, {
            headers: {
                'token': token
            }
        })
            .then(function (response) {
                setData(response?.data?.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [data])

    const dispatch = useDispatch();

    function logOut() {
        Cookies.remove('token')
        dispatch(setToken(null));
    }

    const isVisibleFromRedux = useSelector((state) => state.notification.isVisible);

    const handleButtonClick = () => {
        if (isVisibleFromRedux) {
            dispatch(hideNotification())

        }
        else {
            dispatch(showNotification());
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {
                    data?.proimage ?
                        <img src={data?.proimage} alt="" className="header-profile-img" /> :
                        <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data?.username} size={30} round="20px" />
                }

            </Typography>

            <Divider />
            <List>
                {/* {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <NavLink to='/' className='navlink-btn-header' style={({ isActive }) => ({
                    color: isActive ? "#E9813B" : "#B7B7B7",
                })} >
                    <ListItem key="Home" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <NavLink to='/message' className='navlink-btn-header' style={({ isActive }) => ({
                    color: isActive ? "#E9813B" : "#B7B7B7",
                })} >
                    <ListItem key="Message" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="Message" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

                <ListItem onClick={handleButtonClick} to="" className='navlink-btn-header' key="notification" sx={isVisibleFromRedux ? { textTransform: 'capitalize', color: "#E9813B" } : { textTransform: 'capitalize', color: "#B7B7B7" }} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Notifications" />
                    </ListItemButton>
                </ListItem>

                <NavLink to='/setting' className='navlink-btn-header' style={({ isActive }) => ({
                    color: isActive ? "#E9813B" : "#B7B7B7",
                })} >
                    <ListItem key="Settings" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Box sx={{ display: 'flex', backgroundColor: "black" }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: "#FFFFFF" }} component="nav">
                <Toolbar>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: "black" }}
                        >
                            <MenuIcon />

                        </IconButton>
                    </div>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <div className='flex'>
                            {
                                data?.proimage ? <img src={data?.proimage} alt="" className="header-profile-img" /> :
                                    <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={data?.username} size={30} round="20px" />
                            }
                            <p onClick={logOut} className='para hove'>Log out</p>
                        </div>

                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <NavLink to="/" className='navlink-btn-header' style={({ isActive }) => ({
                            color: isActive ? "#E9813B" : "#B7B7B7",
                        })} key="home" sx={{ textTransform: 'capitalize' }}>
                            <HomeOutlinedIcon className='margin-nav' />
                            <span className='nav-name'>Home</span>
                        </NavLink>

                        <NavLink to="/message" className='navlink-btn-header' style={({ isActive }) => ({
                            color: isActive ? "#E9813B" : "#B7B7B7",
                        })} key="message" sx={{ textTransform: 'capitalize' }}>
                            <MailOutlineOutlinedIcon className='margin-nav' />
                            <span className='nav-name'>Message</span>
                        </NavLink>

                        <Button onClick={handleButtonClick} to="" className='navlink-btn-header' key="notification" sx={isVisibleFromRedux ? { textTransform: 'capitalize', color: "#E9813B" } : { textTransform: 'capitalize', color: "#B7B7B7" }}>
                            <NotificationsNoneOutlinedIcon className='margin-nav' />
                            <span className='nav-name'>Notification</span>
                        </Button>

                        <NavLink to="/setting" className='navlink-btn-header' style={({ isActive }) => ({
                            color: isActive ? "#E9813B" : "#B7B7B7",
                        })} key="setting" sx={{ textTransform: 'capitalize' }}>
                            <WidgetsOutlinedIcon className='margin-nav' />
                            <span className='nav-name'>Settings</span>
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            {
                isVisibleFromRedux &&
                <Notification />
            }

        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;
