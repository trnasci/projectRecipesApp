import { useEffect, useContext } from 'react';
import Context from '../context/Context';
import Card from './Card';

function Recipes() {
  const { fetchAPI } = useContext(Context);
  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);
  return (
    <section>
      <Card />
    </section>
  );
}

export default Recipes;
