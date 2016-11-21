import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import * as actions from './../actions/'
import Section from './Section'

class Home extends React.Component {

  componentDidMount(){
    this.props.fetchUserEvents()
  }

  componentWillReceiveProps(nextProps){
    if(isEmpty(this.props.userEvents)){
      sr.reveal('.one-ago, .two-ago, .three-ago, .four-ago, .five-ago, .six-ago, .seven-ago')
    }
  }

  render(){
    const { userEvents, status } = this.props
    const days = [1, 2, 3, 4, 5, 6, 7]
    return(
      <div>
        <div className="animated fadeIn">
          {
            days.map((daysAgo, index)=>{
              return(
                <Section daysAgo={daysAgo} status={status} data={userEvents[daysAgo]} key={index} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userEvents: state.userEvents,
    status: state.status
  }
}

export default connect(mapStateToProps, actions)(Home)
