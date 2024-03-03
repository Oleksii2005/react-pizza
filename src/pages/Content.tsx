import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { ContentTitle } from "../components/ContentTitle/ContentTitle";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { SortPopup } from "../components/Sort/Sort";
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
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzasData,
} from "../redux/slices/pizzaSlice";
import { NotFound } from "../components/NotFound/NotFound";
import { useAppDispatch } from "../redux/store";

export const Content: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { items, status } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
        currentPage: String(currentPage),
        category,
        sortBy,
        order,
        search,
      })
    );
  };

  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  //   // isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);
  // // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1) as string
  //     ) as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, currentPage, searchValue]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup />
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
