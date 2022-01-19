import { useContext, useEffect } from "react";

import FavoritesContext from "../store/favorites-context";
import UserContext from "../store/user-context";
import Results from "../components/Results";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  const userCtx = useContext(UserContext);
  const favorites = favoritesCtx.favorites;

  useEffect(()=> {},[])

  let content;

  if (userCtx.loginStatus){
    content = <Results data={favorites}/>
  }
  else {
    content = <p>Log In to see your favorites!</p>
  }

  return (
    <section>
      <h2>My Favorites</h2>
      {content}
    </section>
  );
}

export default FavoritesPage;