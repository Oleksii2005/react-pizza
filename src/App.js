import React from "react";
import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Categories } from "./components/Categories/Categories";
import { Sort } from "./components/Sort/Sort";
import { PizzaBlock } from "./components/PizzaBlock/PizzaBlock";
import { ContentTitle } from "./components/ContentTitle/ContentTitle";
import pizzas from "./assets/pizzas.json";

console.log(pizzas);
function App() {
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
              {pizzas.map((obj) => (
                <PizzaBlock {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
{
  /* <PizzaBlock title="Celentano" price={205 + "kr"} />
              <PizzaBlock title="Mexicano" price={175 + "kr"} />
              <PizzaBlock title="4 seazons" price={230 + "kr"} />
              <PizzaBlock title="Calcone" price={155 + "kr"} /> */
}
