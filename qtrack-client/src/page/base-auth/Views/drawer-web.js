import {
    Divider, Grid,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme
} from "@mui/material";

import React from "react";
import Paths from "../../../constants/Paths";
import {Icon} from "semantic-ui-react";

const DrawerMenu = ({open, path, icon, text}) => {
    const theme = useTheme()
    const styles = {
        menuItem: {
            color: theme.palette.text.primary,
        },
    }
    return (
        <>
            <Link underline={'none'} href={path}>
                <ListItem disablePadding={true} disableGutters={true}>
                    <ListItemButton sx={styles.menuItem}>
                        {icon}
                        <ListItemText primary={text} sx={{ml: '5px', opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        </>
    )
}

export default function DrawerWeb(props) {
    const theme = useTheme()
    const styles = {
        title: {
            color: theme.palette.text.secondary,
            mt: "5px",
            ml: "10px",
        },
        headerAppbar: {
            background: 'transparent',
            alignItems: 'center',
            justifyContent: 'right'
        },
        headerContainer: {
            background: theme.palette.background.default,
            color: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }

    return (
        <div>
            <Grid container direction='row' sx={styles.headerContainer} style={{height: '50px'}}>
                {(props.header && props.open) && props.header}
            </Grid>
            {
                !props.open && (
                    <Grid container direction='row' sx={styles.headerContainer}>
                        {props.header && props.header}
                    </Grid>
                )
            }
            <Divider/>
            <List>
                <DrawerMenu open={props.open} path={Paths.ROOT} icon={<Icon name='home' size='large'/>} text={"Home"}/>
                <DrawerMenu open={props.open} path={Paths.PROJECT_MAP} icon={<Icon name='map marker alternate' size='large'/>} text={"Map"}/>
                <DrawerMenu open={props.open} path={Paths.PROJECTS_LIST} icon={<Icon name='folder' size='large'/>} text={"Projects"}/>
            </List>

            <Divider/>
            <List>
                {/*<ListItemText primary={"INFO"} sx={styles.title}/>*/}
                <DrawerMenu open={props.open} path={'#'} icon={<Icon name='comments' size='large'/>} text={"Testimonials"}/>
                <DrawerMenu open={props.open} path={'#'} icon={<Icon name='building' size='large'/>} text={"Clients"}/>
                <DrawerMenu open={props.open} path={'#'} icon={<Icon name='envelope' size='large'/>} text={"Contact Us"}/>
                <DrawerMenu open={props.open} path={'#'} icon={<Icon name='info circle' size='large'/>} text={"About Us"}/>
            </List>
        </div>
    );
}
