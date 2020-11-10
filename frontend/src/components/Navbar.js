import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SearchBar from '../container/SearchBar';
import PageSelection from './PageSelection';
import { clearBookmarkList } from '../store/actions/bookmark';
import { logout } from '../store/actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import logo from '../img/logo.png';


const Navbar = (props) => {
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const { sites } = useSelector(state => ({
    sites: [state.selectPage.craigslist, state.selectPage.kijiji],
  }));

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: 'white',
      color: 'black',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    accountSection: {
      position: 'absolute',
      right: '30px',
      top: '10%',
    },
    toolBar: {
      display: "flex",
      flexWrap: 'wrap'
    },
    textColor: {
      color: "#f33c00",
      textDecoration: 'none',
    },
    image: {
      width: '7rem',
    },
    acountOptions: {
      position: 'absolute',
      right: '30px',
      top: '0',
    },
    toCenter: {
      alignSelf: 'center',
    }
  }));
  const classes = useStyles();

  const goToBookmark = () => {
    props.history.push('/bookmark')
  };

  const signOut = (event) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(clearBookmarkList());
  };

  return (
    <AppBar position="relative">
      <Toolbar className={classes.root}>
        <Container className={classes.toolBar}>

          <Link to="/"><img src={logo} alt="Logo" className={`${classes.title}, ${classes.image}`} /></Link>

          <SearchBar pageChoice={sites} />
          <PageSelection pageChoice={sites} />
          {isAuthenticated ? (
            <div className={classes.acountOptions}>              
              <IconButton
                aria-label="Bookmark"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={goToBookmark}
                color="inherit"
              >
                <FavoriteBorderRoundedIcon />
              </IconButton>

              <IconButton
                aria-label="Log out"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={signOut}
                color="inherit"
              >
                <ExitToAppRoundedIcon />
              </IconButton>
            </div>
            // </Typography>
          ) : (
              <Typography variant="subtitle1" className={`${classes.title}, ${classes.accountSection}`} align='right'>
                <Link to="/signup/" className={classes.textColor}>Register </Link>
                or
                <Link to="/login" className={classes.textColor}> Login</Link>
              </Typography>
            )
          }
        </Container>
      </Toolbar>
    </AppBar>
  )
}


export default withRouter(Navbar);
