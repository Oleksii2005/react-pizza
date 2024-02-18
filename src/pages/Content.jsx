import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { ContentTitle } from "../components/ContentTitle/ContentTitle";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort/Sort";
import { list } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import axios from "axios";

export const Content = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);
    const mainUrl = "https://65b04f592f26c3f2139cadc0.mockapi.io/items";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    const apiURL = `${mainUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    axios
      .get(apiURL)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setItems([]);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);
  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
