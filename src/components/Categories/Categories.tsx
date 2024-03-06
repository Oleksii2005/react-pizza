import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};
const categories = [
  "All",
  "Meat pizza",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    useWhyDidYouUpdate("Categories", { value });
    return (
      <div className="categories">
        <ul className="categories__ul">
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
