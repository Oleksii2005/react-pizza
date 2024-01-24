import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Categories } from "./components/Categories/Categories";
import { Sort } from "./components/Sort/Sort";
import { PizzaBlock } from "./components/PizzaBlock/PizzaBlock";
import { ContentTitle } from "./components/ContentTitle/ContentTitle";

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://65b04f592f26c3f2139cadc0.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <ContentTitle />
            <div className="content__items">
              {items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
