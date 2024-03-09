import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPizzasArgs, PizzaItem, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params: fetchPizzasArgs) => {
    const { mainUrl, currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `${mainUrl}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
