import { useContext, useState } from "react";

import FavoritesContext from "../store/favorites-context";
import ListItem from "../components/ListItem";
import Search from "../components/Search";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  const favorites = favoritesCtx.favorites;

  return (
    <section>
      {favorites.map((item, index) => {
        return <ListItem key={index} item={item} />;
      })}
    </section>


  );
}

export default FavoritesPage;
