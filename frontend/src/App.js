import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import Layout from './container/Layout';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#F33C00'
    }
  }
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Layout {...this.props}>
            <BaseRouter />
          </Layout>
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
