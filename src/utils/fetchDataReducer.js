const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data
      };
    case "FETCH_FAILED":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default fetchDataReducer