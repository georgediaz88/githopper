import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaGithub from 'react-icons/lib/fa/github'
import FaMedium from 'react-icons/lib/fa/medium'

class Footer extends React.Component {

  render(){
    const { repos, auth, orgs, onRepoPreferenceToggled, toggledOrg, toggleOrg, enableAll, disableAll, status } = this.props
    return(
      <footer className='footer'>
        <Row className='animated fadeInUp'>
          <Col xs={9}>
            <a href="http://www.twitter.com/@georgediaz23" target="_blank">
              <FaTwitter/>
            </a>
            <a href="https://github.com/georgediaz88" target="_blank">
              <FaGithub/>
            </a>
            <a href="https://medium.com/@georgediaz" target="_blank">
              <FaMedium/>
            </a>
          </Col>
          <Col xsOffset={1} xs={2}>
            © 2016 George Diaz
          </Col>
        </Row>
      </footer>
    )
  }
}
export default Footer
