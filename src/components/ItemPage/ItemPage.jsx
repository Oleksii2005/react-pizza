import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ItemPage = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          "https://65b04f592f26c3f2139cadc0.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log("Error: ", error);
        alert("Error");
      }
    }
    fetchItem();
  }, []);
  if (!pizza) {
    return "Loading...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
    </div>
  );
};
