import React, { PropTypes } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import { Row, Col } from 'react-flexbox-grid'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import RaisedButton from 'material-ui/RaisedButton'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'

import { map, isEmpty } from 'lodash'
import { connect } from 'react-redux'
import * as actions from './../actions/'

require('../styles/organization_filter.scss')

const styles ={
  filterArea: {
    marginBottom: 18
  },
  loader: {
    position:'relative'
  }
}

class OrganizationFilter extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.enableAll = this.enableAll.bind(this)
    this.disableAll = this.disableAll.bind(this)
  }

  handleChange(event, index, value){
    let selectedOrg = this.props.orgs[index]
    this.props.toggleOrg(selectedOrg)
  }

  disableAll(){
    let repoNames = map(this.props.repos, (repo)=>{ return repo.reference_name })
    this.props.disableAll(repoNames)
  }

  enableAll(){
    let repoNames = map(this.props.repos, (repo)=>{ return repo.reference_name })
    this.props.enableAll(repoNames)
  }

  render(){
    const {auth, orgs, toggledOrg, enableAll, disableAll, status} = this.props
    return(
      <div>
        <div className='loader' style={styles.loader}>
          <RefreshIndicator
            left={-20}
            top={0}
            size={60}
            status={ status.loading ? 'loading' : 'hide' }
            style={{marginLeft: '50%'}}
          />
        </div>
        { !isEmpty(toggledOrg) &&
          <Row style={styles.filterArea} className="animated fadeIn">
            <Col xs={12}>
              <DropDownMenu value={toggledOrg.login} onChange={this.handleChange}>
                {orgs.map((org, index)=>{
                  return(
                    <MenuItem key={index} value={org.login} primaryText={org.login} leftIcon={<Avatar src={org.avatar_url} />} />
                  )
                })}
              </DropDownMenu>
              <span className='button-area'>
                <RaisedButton
                  label = 'Enable All'
                  primary={true}
                  onClick={this.enableAll}
                  icon={<FaThumbsOUp/>}
                />
                &nbsp;
                <RaisedButton
                  label = 'Disable All'
                  secondary={true}
                  onClick={this.disableAll}
                  icon={<FaThumbsODown/>}
                />
              </span>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

OrganizationFilter.propTypes = {
  orgs: PropTypes.array.isRequired,
  repos: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleOrg: PropTypes.func.isRequired,
  toggledOrg: PropTypes.object.isRequired
}

export default OrganizationFilter
