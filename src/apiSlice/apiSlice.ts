import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiEndpoint =
  "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=p5xUFrlxXXt4dEJ60Rn8hFAQZNLNp13uIHSb0gPJ&query=";

export const getFoodNutritions = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndpoint,
  }),
  tagTypes: ["Foods"],

  endpoints: (builder) => ({
    // Define an endpoint that fetches posts
    getFoodNutritions: builder.query({
      query: (data) => {
        // console.log(data);

        return `search?/api_key=p5xUFrlxXXt4dEJ60Rn8hFAQZNLNp13uIHSb0gPJ=${data}`;
      },
      // providesTags: [
      //   { type: "Todos", id: "onDetele" },
      //   { type: "Todos", id: "onLoad" },
      //   { type: "Todos", id: "onUpdate" },
      // ],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetFoodNutritionsQuery } = getFoodNutritions;
