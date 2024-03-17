import React, { useEffect, useState } from "react";
import "./FoodNutritionCart.scss";
import useMyContext from "../../context/useMyContextHook";
import { useGetFoodNutritionsQuery } from "../../apiSlice/apiSlice";
type FoodCardNutritionProps = {
  name?: string;
  description?: string;
};

type NutritionCardType = {
  foodName: string;
  nutrientName: string;
  unitName: string;
  value: string;
};

///Q57y8O6Ms6ypxjdnWmYkzfc6dLnIjAuvxy8oDrnuBCvxPId1PIWqo6hA

///https://api.pexels.com/v1/search?query=apple

const FoodNutritionCart: React.FC<FoodCardNutritionProps> = (props) => {
  const contextValue = useMyContext();
  const [nutritionCard, setNutritionCard] = useState<NutritionCardType[]>([]);
  const [imageSrc, setImageSrc] = useState("");

  const {
    data: food,
    isSuccess,
    isError,
    refetch,
  } = useGetFoodNutritionsQuery(contextValue.value, {
    skip: contextValue.value === "", // Enable the query when userId is truthy
  });

  async function imageOnSearch() {
    const apiKey = "Q57y8O6Ms6ypxjdnWmYkzfc6dLnIjAuvxy8oDrnuBCvxPId1PIWqo6hA";
    const query = contextValue.value;
    const url = `https://api.pexels.com/v1/search?query=${query}`;

    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setImageSrc(data?.photos[0]?.src.large2x);
    }
    console.log(data);
  }

  useEffect(() => {
    setImageSrc("");

    imageOnSearch();

    console.log("nutri");
  }, [nutritionCard]);

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
      const updatedNutritionCard: NutritionCardType[] =
        foodList[0]?.foodNutrients.map((e) => ({
          foodName: foodList[0].description,
          nutrientName: e.nutrientName,
          unitName: e.unitName,
          value: e.value.toString(),
        }));
      setNutritionCard(updatedNutritionCard);
      // console.log(foodList[0].description, updatedNutritionCard); // Logging the
    }
  }, [isSuccess && food]);

  function nutriCard() {
    if (nutritionCard.length !== 0) {
      let nutritions: NutritionCardType[] = [];
      nutritions = nutritionCard.filter((e) => e.value > "0");

      return (
        <div
          className="foodNutritionCardBackground"
          style={{
            backgroundImage: `url('${imageSrc}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="foodNutritionCard">
            <div className="foodNutritionCardHeader">
              <h4 className="foodNutritionCardHeaderLabel">
                {nutritionCard[0].foodName}
              </h4>
            </div>
            <div className="foodNutritionCardBody">
              {nutritions.map((nutrit: NutritionCardType, index: number) => {
                return (
                  <div
                    className="foodNutritionCardBodyNutritionLine"
                    key={index}
                  >
                    <h6>{nutrit.nutrientName}</h6>
                    <h6>{nutrit.value}</h6>
                    <h6>{nutrit.unitName}</h6>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{nutriCard()}</>;
};

export default FoodNutritionCart;
