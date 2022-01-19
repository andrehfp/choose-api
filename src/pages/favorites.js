import { useContext, useEffect } from "react";

import FavoritesContext from "../store/favorites-context";
import Results from "../components/Results";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  const favorites = favoritesCtx.favorites;

  useEffect(()=> {},[])

  return (
    <section>
      <h2>My Favorites</h2>
      <Results data={favorites}/>
    </section>
  );
}

export default FavoritesPage;