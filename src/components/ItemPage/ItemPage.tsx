import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../loader/Loader";

const ItemPage: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          "https://65b04f592f26c3f2139cadc0.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error");
        navigate("/ ");
      }
    }
    fetchItem();
  }, []);
  if (!pizza) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  );
};
export default ItemPage;
