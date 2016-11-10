import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux'
import { authActions } from '../auth/index'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardText } from 'material-ui/Card'
import FaGithub from 'react-icons/lib/fa/github'

require('../styles/login.scss')

const Login = ({signInWithGithub}) => {
  return(
    <div>
      <Grid>
        <Row className='flex-parent' center='xs'>
          <Col xs={8} sm={6} md={4} className='flex-child'>
            <div className='login-title'>Githopper</div>
            <p className='login-msg'>No more forgetting what you did yesterday. See your weekly Github activity.</p>
            <RaisedButton
              label = 'Login with Github'
              onClick={signInWithGithub}
              primary={true}
              fullWidth={true}
              icon={<FaGithub/>}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

Login.propTypes = {
  signInWithGithub: PropTypes.func.isRequired
}

export default connect(null, authActions)(Login)
