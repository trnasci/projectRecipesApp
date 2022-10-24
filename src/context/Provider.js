import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const requestAPI = async () => {
  //     const response = await fetch('https://swapi.dev/api/planets');
  //     const { results } = await response.json();
  //     setData(results);
  //     // results: [{tatoonine}, {alderan}...] ---> array object;
  //   };
  //   requestAPI();
  // }, []);
  // const contextBase = { data };
  return (
    <Context.Provider>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
