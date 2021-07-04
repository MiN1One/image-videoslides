import { useCallback, useReducer } from "react";
import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type.toUpperCase()) {
    case 'START':
      return {
        data: null,
        loading: true,
        error: null 
      };
    case 'RESOLVE':
      return {
        data: action.data,
        loading: false
      }
    case 'REJECT':
      return {
        data: null,
        error: action.error,
        loading: false
      }

    default:
      return state;
  }
};

const useHttp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (d) => dispatch({ type: 'RESOLVE', data: d });

  const createRequest = useCallback((options) => {
    dispatch({ type: 'start' });
    axios({
      method: options.method?.toUpperCase() || 'GET',
      url: options.url,
      data: options.body || undefined,
    })
      .then(({ data: { data } }) => {
        dispatch({ type: 'resolve', data });

        options.callback && options.callback(data, setData);
      })
      .catch((er) => {
        console.error(er);
        dispatch({ type: 'reject', error: er });
      });
  }, []);
  
  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    createRequest,
    setData: useCallback(setData, [])
  };
}

export default useHttp;
