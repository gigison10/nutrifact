import React, { useEffect, useState } from "react";
import "./Main.scss";
import FoodNutritionCart from "../widgets/FoodNutritionCard/FoodNutritionCart";

const Main: React.FC = () => {
  return (
    <div className="body">
      <div className="container">
        <FoodNutritionCart></FoodNutritionCart>
      </div>
    </div>
  );
};

export default Main;
