import { createContext, useState, useEffect } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (item) => {},
  removeFavorite: (item) => {},
  itemIsFavorite: (item) => {},
});

export function FavoritesContextProvider({children}) {
  const [userFavorites, setUserFavorites] = useState(()=> {
    const localData = localStorage.getItem('userFavorites');
    return localData ? JSON.parse(localData) : []
  });

  useEffect(()=> {
   localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
  },[userFavorites])

  function addFavoritesHandler(item) {
    setUserFavorites((prev) => {
      return prev.concat(item);
    });
  }

  function removeFavoriteHandler(item) {
    setUserFavorites((prev) => {
      return prev.filter(
        (favorite) => JSON.stringify(favorite) !== JSON.stringify(item)
      );
    });
  }

  function itemIsFavoriteHandler(item) {
    return userFavorites.some(
      (favorite) => JSON.stringify(favorite) === JSON.stringify(item)
    );
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
