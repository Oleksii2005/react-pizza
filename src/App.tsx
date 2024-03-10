import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import "./scss/app.scss";
import { Content } from "./pages/Content";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Layout } from "./layouts/Layout";
import { Loader } from "./loader/Loader";

const Cart = React.lazy(() => import("./pages/Cart/CartPage"));
const ItemPage = React.lazy(() => import("./components/ItemPage/ItemPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Content />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="/pizza/:id" element={<ItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
