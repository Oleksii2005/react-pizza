import React from "react";
import "./scss/app.scss";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import ContentTitle from "./components/ContentTitle/ContentTitle";

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />
            </div>
            <ContentTitle />
            <div class="content__items">
              <PizzaBlock title="Celentano" price={200 + "kr"} />
              <PizzaBlock title="Mexicano" price={175 + "kr"} />
              <PizzaBlock title="4 seazons" price={175 + "kr"} />
              <PizzaBlock title="Calcone" price={150 + "kr"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
