import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import { Content } from "./pages/Content";
import { BucketPage } from "./pages/Bucket/Bucket";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ItemPage } from "./components/ItemPage/ItemPage";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Content />} />
        <Route path="/bucket" element={<BucketPage />} />
        <Route path="/pizza/:id" element={<ItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
