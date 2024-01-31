import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Content } from "./pages/Content";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { BucketPage } from "./pages/Bucket/Bucket";
import { useState } from "react";
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Content searchValue={searchValue} />} />
          <Route path="/bucket" element={<BucketPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
