import React from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

import ResultsPage from "./pages/results";
import FavoritesPage from "./pages/favorites";
import MainNavigation from "./components/MainNavigation";

function App() {
  return (
    <div>
      <MainNavigation></MainNavigation>
      <Content style={{ padding: "20px 50px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ResultsPage
                url={"https://imoveislocacaoapi.herokuapp.com/conceito"}
              />
            }
          ></Route>
          <Route
            path="/api2"
            element={
              <ResultsPage
                url={"https://imoveislocacaoapi.herokuapp.com/casatop"}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={<FavoritesPage />}
          ></Route>
        </Routes>
      </Content>
    </div>
  );
}

export default App;
