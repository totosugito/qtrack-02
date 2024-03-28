import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import logo from "../../../assets/image-logo.png";
import React from "react";

function WebLogo(props) {
    const theme = useTheme();
    const styles = {
        title: {
            fontSize: "110%",
            fontWeight: 'bold',
            textTransform: 'none'
        },
        subtitle: {
            fontSize: '75%',
        },
        avatar: {
            width: 32,
            height: 32,
            mr: "10px"
        }
    }
    return (
        <Button href={"/"}>
            <Stack direction="row" alignItems={'center'}>
                <Box
                    component="img"
                    sx={styles.avatar}
                    src={logo}/>
                <Stack>
                    <Typography sx={styles.title} style={{color: props.color}}>trackAI</Typography>
                    <Typography sx={styles.subtitle} style={{color: props.color}}>Knowledge Navigator</Typography>
                </Stack>
            </Stack>
        </Button>
    )
}

export default WebLogo
