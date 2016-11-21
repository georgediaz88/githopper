import React from 'react'
import { Grid } from 'react-flexbox-grid'

import { isEmpty } from 'lodash'
import moment from 'moment'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import Activity from './Activity'

require('../styles/section.scss')

const style = {
  loader: {
    position:'relative',
    minHeight: '120px'
  }
}

class Section extends React.Component {

  render(){
    const { daysAgo, data, status } = this.props
    const dayNames = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven']

    return(
      <div className={dayNames[daysAgo]+'-ago'}>
        <h2 className='header'>
          { daysAgo == 1 &&
            <div>Scrum <span className='day-of-week'>yesterday</span></div>
          }
          { daysAgo != 1 &&
            <div>{daysAgo} days ago <span className='day-of-week'>{ moment().local().subtract(daysAgo, 'days').format('ddd') }</span></div>
          }
        </h2>
        <Grid>
          { !isEmpty(data) && data.map((userEvent, index)=>{
            return(
              <Activity userEvent={userEvent} key={index} index={index} />
            )
          })}
          { isEmpty(data) && status.loading &&
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
          { isEmpty(data) && !status.loading &&
            <div className='no-activity-msg'>No Activity Found</div>
          }
        </Grid>
      </div>
    )
  }
}

export default Section
