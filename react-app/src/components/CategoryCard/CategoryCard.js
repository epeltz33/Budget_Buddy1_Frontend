import React from "react";
import { useSelector } from "react-redux";
import CategoryBubbleChart from "../CategoryBubbleChart/CategoryBubbleChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "./CategoryCard.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function CategoryCard() {
  const transactions = useSelector((state) => state.transaction.all);
  const categories = useSelector((state) => state.category);

  const today = new Date();

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
