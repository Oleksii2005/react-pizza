import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Content } from "./pages/Content";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import { BucketPage } from "./pages/Bucket/Bucket";
import { createContext, useState } from "react";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/bucket" element={<BucketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
