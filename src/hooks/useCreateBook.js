import {useEffect, useReducer} from "react";
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        isLoading: true,
        _forceRefresh: false
      }
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        fulfilled: true,
        _forceRefresh: false,
      }
    case 'FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        _forceRefresh: false,
      }
    case 'REFRESH':
      return {
        ...state,
        fulfilled: false,
        isError: false,
        _forceRefresh: true,
      }
    default:
      return {...state}
  }
}

export const useCreateBook = (book) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    fulfilled: false,
    _forceRefresh: false,
  })

  useEffect(() => {
    if (state._forceRefresh) {
      (async () => {
        dispatch({type: 'INIT'});
        const baseUri = process.env.REACT_APP_API_BASE_URI;
        try {
          await axios.post(`${baseUri}/api/v1/book`, book);
          dispatch({type: 'SUCCESS'});
        } catch (e) {
          dispatch({type: 'FAILURE'});
        }
      })()
    }
  }, [state._forceRefresh])

  return [{...state}, () => dispatch({type: 'REFRESH'})]
}
