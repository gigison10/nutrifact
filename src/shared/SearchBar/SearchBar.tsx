import "./SearchBar.scss";
import React, { useState, useRef, useEffect, createContext } from "react";
import { useGetFoodNutritionsQuery } from "../../apiSlice/apiSlice";
import useMyContext from "../../context/useMyContextHook";

interface FoodApiResponse {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageList: number[];
  foodSearchCriteria: FoodSearchCriteria;
  foods: FoodItem[];
}

interface FoodSearchCriteria {
  query: string;
  generalSearchInput: string;
  pageNumber: number;
  numberOfResultsPerPage: number;
  pageSize: number;
  // Add other properties if needed
}

interface FoodItem {
  fdcId: number;
  description: string;
  commonNames?: string;
  additionalDescriptions?: string;
  dataType: string;
  scientificName?: string;
  // Add other properties if needed
}

//p5xUFrlxXXt4dEJ60Rn8hFAQZNLNp13uIHSb0gPJ

function SearchBar() {
  const [currentValue, setCurrentValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [foods, setFoods] = useState<FoodApiResponse[] | null>(null);
  const contextValue = useMyContext();

  const {
    data: food,
    isSuccess,
    isError,
    refetch,
  } = useGetFoodNutritionsQuery(currentValue, {
    skip: currentValue === "", // Enable the query when userId is truthy
  });

  useEffect(() => {
    interface Item {
      description: string;
      foodNutrients: ItemNutrients[];
    }
    interface ItemNutrients {
      value: number;
      foodNutrientId: number;
      indentLevel: number;
      nutrientId: number;
      nutrientName: string;
      nutrientNumber: string;
      rank: number;
      unitName: string;
    }

    let foodList: Item[] = [];

    food?.foods.forEach((item: Item) => {
      if (item?.description.includes("raw")) {
        foodList.push(item);
      }
    });

    if (foodList[0]?.foodNutrients) {
      foodList[0]?.foodNutrients.forEach((e) => {
        if (e.value) {
          // console.log(e.nutrientName, e.value, e.unitName);
          // console.log(e);
        }
      });
    }

    // console.log(foodList[0]?.foodNutrients[0]?.value);
  }, [isSuccess && food]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCurrentValue(inputRef.current?.value || "");
    contextValue.setValue(inputRef.current?.value || "");

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <input type="text" placeholder="search" ref={inputRef}></input>
    </form>
  );
}

export default SearchBar;
