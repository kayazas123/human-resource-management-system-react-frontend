import { AppBar, Button, makeStyles, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useScrollTrigger, useTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.svg";


function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid black',
        boxShadow: '4px 4px 4px 4px rgba(0,0,0,0.8)',
        padding: theme.spacing(2, 4, 3),
    },
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "6em"
    },
    logoContainer: {
        padding: 0,
        marginLeft: '-5px',
        '&:hover': {
            backgroundColor: 'transparent'
        },
        [theme.breakpoints.down("md")]: {
            height: "8rem"
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        fontSize: "1.2rem",
        fontWeight: 700,
        color: "white"
    },
    button: {
        backgroundColor: 'white',
        boxShadow: '3px 3px 3px 3px rgba(255,0,0,0.5)',
        borderRadius: '25px',
        marginRight: '25px',
        marginLeft: '20px',
        fontSize: '1.2rem',
        textTransform: 'none'
    },
    drawerIcon: {
        marginLeft: 'auto',
        height: "50px",
        width: "50px"
    },
    drawerItem: {
        fontSize: "1.4rem",
        fontWeight: 700
    },
    codeGithubIcon: {
        fontSize: '3rem'
    },
    githubButtonFrontend: {
        backgroundColor: 'darkRed',
        fontSize: '1.4rem'
    },
    githubButtonBackend: {
        backgroundColor: 'black',
        fontSize: '1.4rem'
    },
    textualLogo: {
        color: 'white',
        fontFamily: 'Shrikhand',
        fontSize: '2.2rem'
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


export default function EmployeeHeader(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState(0);
    const [moreOptionsMenuValue, setMoreOptionsMenuValue] = useState(0);
    const [drawerOpen, isDrawerOpen] = useState(false);
    const [open, setOpen] = React.useState(false);


    const logoClickHandler = () => {
        setValue(0);
    }
    
    return (
        <>
            <ElevationScroll {...props}>
                <AppBar color="primary">
                    <Toolbar disableGutters style={{ maxHeight: "129px", padding: matches ? '6px' : '0px' }} >
                        <Button component={Link} to="/" className={classes.logoContainer} onClick={logoClickHandler} disableRipple>
                            {!matches ? <img src={logo} alt='Flenderson Logo' /> : <Typography variant="h4" className={classes.textualLogo}>Flenderson</Typography>}
                        </Button>
                        {!matches ? '' : 'drawer'}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    );

}