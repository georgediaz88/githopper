import React from 'react'
import {List, ListItem} from 'material-ui/List';
import { Row, Col } from 'react-flexbox-grid'
import GoGitBranch from 'react-icons/lib/go/git-branch'
import GoGitCommit from 'react-icons/lib/go/git-commit'
import GoGitMerge from 'react-icons/lib/go/git-merge'
import GoGitPullRequest from 'react-icons/lib/go/git-pull-request'
import GoTag from 'react-icons/lib/go/tag'
import Avatar from 'material-ui/Avatar'

import moment from 'moment'
import { isEmpty } from 'lodash'

require('../styles/activity.scss')

const style = {
  eventAvatar:{
    lineHeight: '13px',
    fontSize: '14px',
    padding: '6px 16px 20px 36px'
  },
  commitMessage: {
    padding: '4px 12px 12px 12px'
  },
  organizationAvatar: {
    top:0,
    left:0
  }
}

class Activity extends React.Component {

  constructor(props) {
    super(props)
    this.truncate = this.truncate.bind(this)
  }

  truncate(words){
    if (words.length > 50) {
      return words.substring(0,50)+'...'
    }
    else {
      return words
    }
  }

  render(){
    const { index, userEvent } = this.props
    return(
      <Row key={index} className='animated fadeIn'>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row className='user-event'>
            <Col xs={3} sm={2} md={1} lg={1} className='github-icon-container'>
              {userEvent.action_type == 'pull_request' &&
                <GoGitPullRequest className='github-icon'/>
              }
              {userEvent.action_type == 'branch' &&
                <GoGitBranch className='github-icon'/>
              }
              {userEvent.action_type == 'commit' &&
                <GoGitCommit className='github-icon'/>
              }
              {userEvent.action_type == 'tag' &&
                <GoTag className='github-icon'/>
              }
              <div className='timestamp'>
                { moment(Date.parse(userEvent.created_at)).local().format('h:mm a') }
              </div>
            </Col>
            <Col xs={9} sm={10} md={11} lg={11} className='message-area'>
              <div className='message'>
                {userEvent.action_text}&nbsp;
                { !isEmpty(userEvent.event_url) &&
                  <a className='link' href={userEvent.event_url} target='_blank'>{userEvent.title}</a>
                }
                { isEmpty(userEvent.event_url) &&
                  <strong>{userEvent.title}</strong>
                }
              </div>
              <List>
                { userEvent.action_type == 'commit' && userEvent.commits.slice(0,2).map((commit, index)=>{
                  return(
                    <ListItem disabled={true} key={index} style={style.commitMessage}>
                      <a className='link' href={`https://github.com/${userEvent.repo_name}/commit/${commit.sha}`} target='_blank'>
                        { this.truncate(commit.message) }
                      </a>
                    </ListItem>
                  )
                })}
                { userEvent.commits.length > 2 &&
                  <ListItem disabled={true} key={index} style={style.commitMessage}>
                    <a className='link' href={userEvent.compare_url} target='_blank'>see more...</a>
                  </ListItem>
                }
                <ListItem
                  style={style.eventAvatar}
                  disabled={true}
                  leftAvatar={
                    <Avatar
                      src={userEvent.organization.avatar_url}
                      size={30}
                      style={style.organizationAvatar}
                    />
                  }
                >
                  {userEvent.repo_name}
                </ListItem>
              </List>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Activity
