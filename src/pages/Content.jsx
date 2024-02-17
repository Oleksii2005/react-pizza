import { useState, useEffect, useContext } from "react";
import { Categories } from "../components/Categories/Categories";
import { ContentTitle } from "../components/ContentTitle/ContentTitle";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Content = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  // console.log("redux state", categoryId);

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  // const setCategoryId = () => {};

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const mainUrl = "https://65b04f592f26c3f2139cadc0.mockapi.io/items";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `${mainUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  // .filter((obj) => {
  //       if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //         return true;
  //       }
  //       return false;
  //     })

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <ContentTitle />
      <div className="content__wrapper">
        <ul className="content__items">{isLoading ? skeletons : pizzas}</ul>
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
