import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'react-flexbox-grid'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import FaGithub from 'react-icons/lib/fa/github'
import ScrollReveal from 'scrollreveal'

const styles = {
  card: {
    marginBottom: 24
  },
  toggle: {
    maxWidth: 200
  }
}

class RepoList extends React.Component {

  componentWillReceiveProps(nextProps){
    setTimeout(()=>{
      sr.reveal('.repo-list')
    }, 1000)
  }

  render(){
    const {repos, auth, onRepoPreferenceToggled} = this.props
    return(
      <div>
        <Row>
          {repos.map((repo, index)=>{
            return(
              <Col className="animated zoomIn" xs={12} sm={6} md={4} lg={4} key={index} style={styles.card}>
                <Card initiallyExpanded={true} className="repo-list">
                  <CardHeader
                    title={repo.name}
                    avatar={repo.owner.avatar_url}
                    subtitle={repo.owner.login}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    <strong>Activity Feed Preferences</strong>
                    <br/>
                    <br/>
                    <Toggle
                      style={styles.toggle}
                      label="Subscribe"
                      defaultToggled={repo.subscribed}
                      onToggle={()=> onRepoPreferenceToggled(repo)}
                    />
                  </CardText>
                  <CardActions expandable={true}>
                    <FlatButton
                      label="GitHub"
                      href={repo.html_url}
                      target="_blank"
                      secondary={true}
                      icon={<FaGithub/>}
                    />
                  </CardActions>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  onRepoPreferenceToggled: PropTypes.func.isRequired
}

export default RepoList
