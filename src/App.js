import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchData from './utils/useFetchData';

import IconLoadingComp from './components/IconLoadingComp';
import ListForeCastComp from './components/ListForeCastComp';

import { URL_LOCATION_SEARCH, URL_LOCATION_FORECAST, URL_LIST_CITIES } from './utils/constant';
import "./styles.css";


function App() {

	const [listCity, setListCity] = useState([]);
	const [city, setCity] = useState('Ho Chi Minh');
	
	const [{ data, isLoading, isError }, setFetchUrl] = useFetchData({
		initialData: {
			data: {}
		},
		urlLocationSearch: URL_LOCATION_SEARCH + city,
		urlLocationForeCast: URL_LOCATION_FORECAST
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(URL_LIST_CITIES);
				setListCity(data.cities);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);


	return (
		<div className="container">
			<h1 className="title">WEATHER FORECAST</h1>
			<form className="pure-form"
						onSubmit={e => {
							e.preventDefault();
							setFetchUrl(URL_LOCATION_SEARCH + city);
						}}>

				<div className="pure-control-group">
					<input
						className="input-city"
						list="city-list"
						onChange={e => {
							setCity(e.target.value);
						}}
					/>

					<datalist id="city-list">
						{Array.isArray(listCity) && listCity.map((city, index) => <option key={index} value={city}></option>)}
					</datalist>

				</div>
			</form>

			{isError && <label className="error" id="error-msg">Your City you enter is not correct. Please try another city in the list</label>}

			{isLoading && <IconLoadingComp />}

			{!isError && !isLoading && <ListForeCastComp data={data} />}

		</div>
	);
}

export default App;
