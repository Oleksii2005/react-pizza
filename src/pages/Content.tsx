import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ContentTitle,
  NotFound,
  Categories,
  PizzaBlock,
  SortPopup,
  Skeleton,
  Pagination,
} from "../components/index";
import { useRef } from "react";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { selectPizzasData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";

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

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const getPizzas = async () => {
    setIsLoading(true);
    const mainUrl = "https://6744afc7b4e2e04abea33c8d.mockapi.io/items";
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

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, currentPage, searchValue]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
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
