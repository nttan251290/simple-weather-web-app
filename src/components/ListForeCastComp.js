import React from 'react'
import moment from 'moment-timezone';
import { PropTypes } from 'prop-types'

const ListForeCastComp = props => {
	const { title, list } = props.data

	const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="wrap-forecast">

			<h1 className="title-city">{title}</h1>
			<ul className="list-forecast">

				{ Array.isArray(list) &&	
						list.map(obj => (
							<li className="item" key={obj.id}>
								<div className="content-item">
									<dd className="weatherstate" data-original-title="" title="">
										<div className={`state-icon-sml state-${obj.weather_state_abbr}`}></div>
										<span className="text-weather">{obj.weather_state_name}</span>
									</dd>
									<div className="day">{WEEKDAYS[moment(obj.applicable_date).day()]}</div>
									<div className="min">Min : {parseInt(obj.min_temp)}°C</div>
									<div className="max">Max : {parseInt(obj.max_temp)}°C</div>
								</div>
							</li>
						))
				}
			</ul>

		</div>
  )
}

export default ListForeCastComp;

ListForeCastComp.propTypes = {
	data: PropTypes.object
}
