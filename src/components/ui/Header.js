import { AppBar, makeStyles, Tab, Toolbar, Typography, Tabs, Button, Menu, MenuItem, useTheme, useMediaQuery, SwipeableDrawer, IconButton, List, ListItem, Grid, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuIcon from '@material-ui/icons/Menu';
import BugReportIcon from '@material-ui/icons/BugReport';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import GitHubIcon from '@material-ui/icons/GitHub';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
    textTransform: 'none',
    '&:hover': {
      backgroundColor: "#CC313D",
      color:'white'
    }
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


export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);
  const [serviceMenuValue, setServiceMenuValue] = useState(0);
  const [drawerOpen, isDrawerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (window.location.pathname === '/services-employee-details-store-module' && serviceMenuValue !== 1)
      setServiceMenuValue(1);
    else if (window.location.pathname === '/services-attendance-management-module' && serviceMenuValue !== 2)
      setServiceMenuValue(2);
    else if (window.location.pathname === '/services-payroll-management-module' && serviceMenuValue !== 3)
      setServiceMenuValue(3);
    else if (window.location.pathname === '/services-employee-issue-resolver-module' && serviceMenuValue !== 4)
      setServiceMenuValue(4);
    else if (window.location.pathname === '/services-company-event-notifcation-module' && serviceMenuValue !== 5)
      setServiceMenuValue(5);
    else if (window.location.pathname === '/services-custom' && serviceMenuValue !== 6)
      setServiceMenuValue(6);
  }, [value, serviceMenuValue]);

  const handleChange = (event, value) => {
    setValue(value);
  }

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
      setServiceMenuValue(0);
    }
    else if (window.location.pathname.includes('services'))
      setValue(1);
    else if (window.location.pathname === '/developer' && value !== 2) {
      setValue(2);
      setServiceMenuValue(0);
    }
    else if (window.location.pathname === '/about-us' && value !== 3) {
      setValue(3);
      setServiceMenuValue(0);
    }
    else if (window.location.pathname === '/contact-us' && value !== 4) {
      setValue(4);
      setServiceMenuValue(0);
    }
  }, [value, serviceMenuValue]);

  const logoClickHandler = () => {
    setValue(0);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setServiceMenuValue(0);
    isDrawerOpen(false);
  };

  const tabs = (
    <>
      <Tabs value={value} className={classes.tabContainer} onChange={handleChange}>
        <Tab className={classes.tab} label="Home" component={Link} to='/' />
        <Tab className={classes.tab} label="Services" aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick} />
        <Tab className={classes.tab} label="Developer" component={Link} to='developer' />
        <Tab className={classes.tab} label="About Us" component={Link} to='about-us' />
        <Tab className={classes.tab} label="Contact Us" component={Link} to='contact-us' />
      </Tabs>
      <div>
        <Button variant='contained' color='secondary' className={classes.button} type='button' onClick={handleModalOpen}>
          View Code
      </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Box py={2} px={3}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='h4'>View Applications Code</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" className={classes.githubButtonBackend} startIcon={<GitHubIcon />} type='button' href='https://github.com/hardikSinghBehl/human-resource-management-system' target='_blank'>
                      BACKEND CODE
                  </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" className={classes.githubButtonFrontend} startIcon={<GitHubIcon />} type='button' href='https://github.com/hardikSinghBehl/human-resource-management-system-react-frontend' target='_blank'>
                      FRONTEND CODE
                  </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Fade>
        </Modal>
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem component={Link} to='services-employee-details-store-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 1}>
          <ListItemIcon>
            <PeopleAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Details Management" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to='services-attendance-management-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 2}>
          <ListItemIcon>
            <AssignmentTurnedInIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Attendance Management" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to='services-payroll-management-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 3}>
          <ListItemIcon>
            <MonetizationOnIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Payroll Management" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to='services-employee-issue-resolver-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 4}>
          <ListItemIcon>
            <BugReportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Issue Resolver" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to='services-company-event-notifcation-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 5}>
          <ListItemIcon>
            <NotificationsActiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Event Management" />
        </StyledMenuItem>
        <StyledMenuItem component={Link} to='services-custom' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 6}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Custom Services" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer open={drawerOpen} onOpen={() => { isDrawerOpen(true) }} onClose={() => { isDrawerOpen(false) }}>
        <List>
          <ListItem button component={Link} to='/' onClick={() => { isDrawerOpen(false); setValue(0) }} className={classes.drawerItem} selected={value === 0}>
            <ListItemText disableTypography>Home</ListItemText>
          </ListItem>
          <ListItem button className={classes.drawerItem} selected={value === 1} aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick} >
            <ListItemText disableTypography>Services</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/developer' onClick={() => { isDrawerOpen(false); setValue(2) }} className={classes.drawerItem} selected={value === 2}>
            <ListItemText disableTypography>Developer</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/about-us' onClick={() => { isDrawerOpen(false); setValue(3) }} className={classes.drawerItem} selected={value === 3}>
            <ListItemText disableTypography>About Us</ListItemText>
          </ListItem>
          <ListItem button divider component={Link} to='/contact-us' onClick={() => { isDrawerOpen(false); setValue(4) }} className={classes.drawerItem} selected={value === 4}>
            <ListItemText disableTypography>Contact Us</ListItemText>
          </ListItem>
          <ListItem button className={classes.drawerItem}>
            <ListItemText disableTypography type='button' onClick={handleModalOpen}>Code</ListItemText>

          </ListItem>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem component={Link} to='services-employee-details-store-module' onClick={handleClose} selected={serviceMenuValue === 1}>
              <ListItemIcon>
                <PeopleAltIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Details Management" />
            </StyledMenuItem>
            <StyledMenuItem component={Link} to='services-attendance-management-module' onClick={handleClose} selected={serviceMenuValue === 2}>
              <ListItemIcon>
                <AssignmentTurnedInIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Attendance Management" />
            </StyledMenuItem>
            <StyledMenuItem component={Link} to='services-payroll-management-module' onClick={handleClose} selected={serviceMenuValue === 3}>
              <ListItemIcon>
                <MonetizationOnIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Payroll Management" />
            </StyledMenuItem>
            <StyledMenuItem component={Link} to='services-employee-issue-resolver-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 4}>
              <ListItemIcon>
                <BugReportIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Issue Resolver" />
            </StyledMenuItem>
            <StyledMenuItem component={Link} to='services-company-event-notifcation-module' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 5}>
              <ListItemIcon>
                <NotificationsActiveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Event Management" />
            </StyledMenuItem>
            <StyledMenuItem component={Link} to='services-custom' onClick={() => { handleClose(); setValue(1) }} selected={serviceMenuValue === 6}>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Custom Services" />
            </StyledMenuItem>
          </StyledMenu>
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => { isDrawerOpen(!drawerOpen) }} disableRipple className={classes.drawerIcon}>
        <MenuIcon className={classes.drawerIcon}></MenuIcon>
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar color="primary">
          <Toolbar disableGutters style={{ maxHeight: "129px", padding: matches ? '10px' : '0px' }} >
            <Button component={Link} to="/" className={classes.logoContainer} onClick={logoClickHandler} disableRipple>
              {!matches ? <img src={logo} alt='Flenderson Logo' /> : <Typography variant="h4" className={classes.textualLogo}>Flenderson</Typography>}
            </Button>
            {!matches ? tabs : drawer}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}