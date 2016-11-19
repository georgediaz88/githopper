import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/'
import { Grid, Row, Col } from 'react-flexbox-grid'

import RepoList from './RepoList'
import OrganizationFilter from './OrganizationFilter'

require('../styles/settings.scss')

class Settings extends React.Component {

  componentDidMount() {
    this.props.fetchOrganizations()
    this.props.fetchRepos()
  }

  render(){
    const { repos, auth, orgs, onRepoPreferenceToggled, toggledOrg, toggleOrg, enableAll, disableAll, status } = this.props
    return(
      <div>
        <Grid>
          <Row className='row-spacing'>
            <Col xs={12}>
              <OrganizationFilter status={status} repos={repos} orgs={orgs} toggledOrg={toggledOrg} auth={auth} toggleOrg={toggleOrg} enableAll={enableAll} disableAll={disableAll}  />
              <RepoList repos={repos} auth={auth} onRepoPreferenceToggled={onRepoPreferenceToggled} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    repos: state.repos,
    auth: state.auth,
    orgs: state.orgs,
    toggledOrg: state.toggledOrg,
    status: state.status
  }
}

export default connect(mapStateToProps, actions)(Settings)
