import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Layout = (props) => {  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout
