import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Snackbar from 'material-ui/Snackbar'
import { StickyContainer, Sticky } from 'react-sticky'
import ScrollReveal from 'scrollreveal'

import { authActions } from '../auth/'
import * as actions from '../actions/'
import { bindActionCreators } from 'redux'
import Navbar from '../components/Navbar'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.signOut = this.signOut.bind(this)
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this)
  }

  signOut(){
    this.props.actions.signOut()
  }

  handleSnackbarRequestClose(){
    this.props.actions.handleSnackbarRequestClose()
  }

  componentDidMount(){
    window.sr = ScrollReveal()
  }

  render(){
    const { auth, children, snackbarMessage, openSnackbar, status } = this.props

    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            { auth.authenticated &&
              <StickyContainer>
                <Sticky style={{zIndex: 5}}>
                  <Navbar auth={auth} signOut={this.signOut} />
                </Sticky>
                <div className='content'>
                  { children }
                </div>
                <Snackbar
                  open={openSnackbar}
                  message={snackbarMessage}
                  autoHideDuration={2000}
                  onRequestClose={this.handleSnackbarRequestClose}
                />
              </StickyContainer>
            }
            { !auth.authenticated &&
              <div className='login-wrapper'>
                { children }
              </div>
            }
          </div>
        </MuiThemeProvider>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, authActions, actions), dispatch)
  }
}

App.propTypes = {
  children: PropTypes.any
}

export default connect(state => ({
  auth: state.auth,
  snackbarMessage: state.notifications.snackbarMessage,
  openSnackbar: state.notifications.openSnackbar,
  status: state.status
}), mapDispatchToProps)(App)
