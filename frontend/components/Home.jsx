import React from 'react'
import { Grid } from 'react-flexbox-grid'
import { connect } from 'react-redux'

import { isEmpty } from 'lodash'
import moment from 'moment'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import * as actions from './../actions/'
import Activity from './Activity'

require('../styles/home.scss')

const style = {
  loader: {
    position:'relative',
    minHeight: '120px'
  }
}

class Home extends React.Component {

  componentDidMount(){
    this.props.fetchUserEvents()
  }

  componentWillReceiveProps(nextProps){
    if(isEmpty(this.props.userEvents)){
      sr.reveal('.scrum, .two-ago, .three-ago, .four-ago, .five-ago, .six-ago, .seven-ago')
    }
  }

  render(){
    const { userEvents, status } = this.props
    return(
      <div>
        <div className="animated fadeIn">

          <div className='scrum'>
            <h2 className='header'>
              Scrum <span className='day-of-week'>yesterday</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[1]) && userEvents[1].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[1]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[1]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

          <div className='two-ago'>
            <h2 className='header'>
              2 days ago <span className='day-of-week'>{ moment().local().subtract(2, 'days').format('ddd') }</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[2]) && userEvents[2].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[2]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[2]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

          <div className='three-ago'>
            <h2 className='header'>
              3 days ago <span className='day-of-week'>{ moment().local().subtract(3, 'days').format('ddd') }</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[3]) && userEvents[3].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[3]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[3]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

          <div className='four-ago'>
            <h2 className='header'>
              4 days ago <span className='day-of-week'>{ moment().local().subtract(4, 'days').format('ddd') }</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[4]) && userEvents[4].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[4]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[4]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

          <div className='five-ago'>
            <h2 className='header'>
              5 days ago <span className='day-of-week'>{ moment().local().subtract(5, 'days').format('ddd') }</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[5]) && userEvents[5].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[5]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[5]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

          <div className='six-ago'>
            <h2 className='header'>
              6 days ago <span className='day-of-week'>{ moment().local().subtract(6, 'days').format('ddd') }</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[6]) && userEvents[6].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[6]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[6]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

          <div className='seven-ago'>
            <h2 className='header'>
              7 days ago <span className='day-of-week'>{ moment().local().subtract(7, 'days').format('ddd') }</span>
            </h2>
            <Grid>
              { !isEmpty(userEvents[7]) && userEvents[7].map((userEvent, index)=>{
                return(
                  <Activity userEvent={userEvent} key={index} index={index} />
                )
              })}
              { isEmpty(userEvents[7]) && status.loading &&
                <div className='loader' style={style.loader}>
                  <RefreshIndicator
                    left={-20}
                    top={20}
                    size={60}
                    status={ status.loading ? 'loading' : 'hide' }
                    style={{marginLeft: '50%'}}
                  />
                </div>
              }
              { isEmpty(userEvents[7]) && !status.loading &&
                <div className='no-activity-msg'>No Activity Found</div>
              }
            </Grid>
          </div>

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
