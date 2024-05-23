import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import profile from '../../assets/images/user1.jpeg'

export default function CardMe({ aboutUser, pro, friends, name }) {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex', width: "350px" }}>
            <CardMedia
                component="img"
                sx={{ width: 130, padding: "10px", height: 130, objectFit: "fill", borderRadius: "20px" }}
                image={pro ? pro : profile}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: "-12px" }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: "12px", lineHeight: "14px", wordSpacing: "-2px", color: "#E9813B", fontFamily: "Times New Roman", fontWeight: "bold" }} variant="subtitle1" color="text.secondary" component="p">
                        {
                            friends ?
                            `${friends} Friends`
                            : "No Friends"
                        } 
                    </Typography>
                    <Typography sx={{ color: "#0E134F", fontWeight: "bolder", fontFamily: "Times New Roman" }} component="div" variant="h5">
                        {name}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", lineHeight: "14px", wordSpacing: "-2px", color: "#42526E", fontFamily: "Times New Roman" }} variant="subtitle1" color="text.secondary" component="p">
                        {
                            aboutUser ?
                                `${aboutUser}` :
                                " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti dolore sunt libero earum? Molestiae quo soluta doloremque eos quibusdam dolorem pariatur, at illum ad, fugit quae quos odit labore incidunt."
                        }

                    </Typography>
                </CardContent>
            </Box>

        </Card>
    );
}
