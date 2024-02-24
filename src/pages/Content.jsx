import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { ContentTitle } from "../components/ContentTitle/ContentTitle";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort/Sort";
import { list } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useRef } from "react";
import { fetchPizzas, selectPizzasData } from "../redux/slices/pizzaSlice";
import { NotFound } from "../components/NotFound/NotFound";

export const Content = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { items, status } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    setIsLoading(true);
    const mainUrl = "https://65b04f592f26c3f2139cadc0.mockapi.io/items";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        mainUrl,
        currentPage,
        category,
        sortBy,
        order,
        search,
      })
    );
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);
  // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
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
      isSearch.current = true;
    }
  }, []);
  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, currentPage, searchValue]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <ContentTitle />
      <div className="content__wrapper">
        {status === "error" ? (
          <NotFound />
        ) : (
          <ul className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </ul>
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
