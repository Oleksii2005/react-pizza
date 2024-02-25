import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
};

export const Categories: React.FC<CategoriesProps> = ({
  value,
  onChangeCategory,
}) => {
  const categories = [
    "All",
    "Meat pizza",
    "Vegetarian",
    "Grill",
    "Spicy",
    "Closed",
  ];

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
};
