import React from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

import ResultsPage from "./pages/resultspage";
import FavoritesPage from "./pages/favorites";
import MainNavigation from "./components/MainNavigation";
import LoginPage from "./pages/loginPage";

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
            path="/api3"
            element={
              <ResultsPage
                url={"https://jsonplaceholder.typicode.com/comments"}
              />
            }
          ></Route>
          <Route path="/favorites" element={<FavoritesPage />}></Route>
          <Route path="/loginPage" element={<LoginPage />}></Route>
        </Routes>
      </Content>
    </div>
  );
}

export default App;
