import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      console.log("LOADING");
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      console.log("SUCCESS");
      //   console.log(action.data);
      //   console.log(JSON.stringify(action.data));
      return {
        loading: false,
        data: JSON.stringify(action.data),
        error: null,
      };
    case "ERROR":
      console.log(action.error);
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action tyle: ${action.type}`);
  }
}

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchApi = async (param) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback(param);
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) fetchApi();
  }, deps);

  return [state, fetchApi];
}

export default useAsync;
