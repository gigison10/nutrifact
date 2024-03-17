import Header from "./widgets/Header/Header";
import Footer from "./widgets/Footer/Footer";
import Main from "./pages/Main";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { getFoodNutritions } from "./apiSlice/apiSlice";
import MyProvider from "./context/provider";

import "./App.scss";
import FoodNutritionCart from "./widgets/FoodNutritionCard/FoodNutritionCart";

const App: React.FC = () => {
  return (
    <ApiProvider api={getFoodNutritions}>
      <MyProvider>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </MyProvider>
    </ApiProvider>
  );
};

export default App;
