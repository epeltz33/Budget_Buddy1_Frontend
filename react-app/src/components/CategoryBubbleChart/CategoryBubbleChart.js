import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./CategoryBubbleChart.css";

export default function BudgetPieChart({ transactions, categories, today }) {
  // const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth());
  const transactions_monthly = transactions.filter(
    (transaction) =>
      parseInt(transaction.trans_date.slice(5, 7)) === today.getMonth() + 1
  );

  const spend_monthly_byCat = {};

  transactions_monthly.forEach((transaction) => {
    if (spend_monthly_byCat[transaction.categoryId]) {
      spend_monthly_byCat[transaction.categoryId] += transaction.trans_amount;
    } else {
      spend_monthly_byCat[transaction.categoryId] = transaction.trans_amount;
    }
  });

  const userData = {
    labels: Object.keys(spend_monthly_byCat).map(
      (key) => categories[key - 1].category_name
    ),
    datasets: [
      {
        data: Object.values(spend_monthly_byCat),
        backgroundColor: [
          "#A6CEE3",
          "#1F78B4",
          "#B2DF8A",
          "#33A02C",
          "#FB9A99",
          "#E31A1C",
          "#FDBF6F",
          "#FF7F00",
          "#CAB2D6",
          "#6A3D9A",
          "#F2EC94",
          "#B15928",
        ],
        borderColor: [
          "#A6CEE3",
          "#1F78B4",
          "#B2DF8A",
          "#33A02C",
          "#FB9A99",
          "#E31A1C",
          "#FDBF6F",
          "#FF7F00",
          "#CAB2D6",
          "#6A3D9A",
          "#F2EC94",
          "#B15928",
        ],
        borderWidth: 2,
      },
    ],
  };

  const userOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "black",
          font: {
            size: "18",
            family: "'Montserrat', sans-serif",
          },
        },
      },
    },
  };

  if (!categories.length || !transactions.length) {
    return null;
  }

  return (
    <span className="CategoryBubbleChart">
      <Doughnut options={userOptions} data={userData} />
    </span>
  );
}
