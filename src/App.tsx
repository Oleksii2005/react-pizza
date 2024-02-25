import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import { Content } from "./pages/Content";
import { CartPage } from "./pages/Cart/CartPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ItemPage } from "./components/ItemPage/ItemPage";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Content />} />
        <Route path="/bucket" element={<CartPage />} />
        <Route path="/pizza/:id" element={<ItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
