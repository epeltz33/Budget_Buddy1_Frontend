import React from "react";
// import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { getCategories } from '../../store/category';
// import { getTransactions } from '../../store/transaction';
import CategoryBubbleChart from "../CategoryBubbleChart/CategoryBubbleChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "./CategoryCard.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function CategoryCard() {
  // const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transaction.all);
  const categories = useSelector((state) => state.category);

  const today = new Date();

  // useEffect(() => {
  //   dispatch(getCategories());
  //   dispatch(getTransactions());
  // }, [dispatch]);

  if (!categories.length || !transactions.length) {
    return null;
  }

  return (
    <div className="CategoryCard">
      <h3>Top Categories</h3>
      <CategoryBubbleChart
        transactions={transactions}
        categories={categories}
        today={today}
      />
    </div>
  );
}
