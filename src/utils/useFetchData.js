import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import fetchDataReducer from './fetchDataReducer'


const useFetchData = ({ initialData, urlLocationSearch, urlLocationForeCast }) => {

	const [{ data, isLoading, isError }, dispatch] = useReducer(fetchDataReducer, { data: initialData, 
																																									isLoading: false, 
																																									isError: false });

  const [fetchUrlSearch, setFetchUrl] = useState(urlLocationSearch);

  useEffect(() => {
		
    const fetchData = async () => {
      dispatch({
        type: 'FETCH_INIT'
			});
			
      try {
				const { data } = await axios.get(fetchUrlSearch);
				const listWeather = await axios.get(urlLocationForeCast + data[0].woeid);
				
				const listSolidWeather = listWeather.data.consolidated_weather;
				const optimizeData = { 'list': listSolidWeather, 'title': listWeather.data.title + ' - ' + listWeather.data.parent.title };

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            data: optimizeData
          }
				});
				
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILED'
        });
      }
    };

		fetchData();

  }, [fetchUrlSearch, urlLocationForeCast]);

  return [{data, isLoading, isError}, setFetchUrl];
};

export default useFetchData;