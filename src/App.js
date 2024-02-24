import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Content } from "./pages/Content";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { BucketPage } from "./pages/Bucket/Bucket";
import { createContext, useState } from "react";
import { ItemPage } from "./components/ItemPage/ItemPage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="/pizza/:id" element={<ItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
