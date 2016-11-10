import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { authActions } from '../auth/'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()


const styles = {
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}

class Navbar extends React.Component {

  render(){
    const { auth, signOut } = this.props
    return(
      <AppBar
        style={{
          backgroundColor: '#333'
        }}
        title={<Link to='/' style={styles.link}>Githopper</Link>}
        iconElementLeft={<span></span>}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            {auth.authenticated ? <MenuItem primaryText="Settings" containerElement={<Link to='/settings'/>} /> : null}
            {auth.authenticated ? <MenuItem primaryText="Sign out" onClick={ signOut } /> : null}
          </IconMenu>
        }
      />
    )
  }
}

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default Navbar
