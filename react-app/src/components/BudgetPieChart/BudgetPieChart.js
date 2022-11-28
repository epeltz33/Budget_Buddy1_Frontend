import React from "react";
import { Pie } from "react-chartjs-2";
import { currencyFormatter } from "../../utils";
import "./BudgetPieChart.css";

export default function BudgetPieChart({
  budgets,
  transactions,
  today,
  days_in_month,
}) {
  // const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth());
  const transactions_monthly = transactions.filter(
    (transaction) =>
      parseInt(transaction.trans_date.slice(5, 7)) === today.getMonth() + 1
  );
  const spend_monthly = transactions_monthly.reduce(
    (acc, el) => acc + el.trans_amount,
    0
  );

  const budget_monthly = budgets.find(
    (budget) => budget.categoryId === 1
  ).budget_amount;
  const budget_left = budget_monthly - spend_monthly;
  let budget_left_daily = budget_left / days_in_month;

  if (budget_left_daily === Infinity || budget_left_daily === -Infinity) {
    budget_left_daily = budget_left / 1;
  }

  const userData = {
    labels: ["Spent", "Left"],
    datasets: [
      {
        data: [spend_monthly, budget_left],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const userOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "black",
          font: {
            size: "14",
            family: "'Montserrat', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Budget",
        color: "black",
        font: {
          size: "20",
          family: "'Montserrat', sans-serif",
        },
      },
    },
  };

  if (!budgets.length || !transactions.length) {
    return null;
  }

  if (
    spend_monthly >
    budgets.find((budget) => budget.categoryId === 1).budget_amount
  ) {
    return (
      <>
        <span className="OverbudgetText">
          {budgets.length && (
            <ul>
              <li>
                You are{" "}
                {currencyFormatter.format(
                  spend_monthly -
                    budgets.find((budget) => budget.categoryId === 1)
                      .budget_amount
                )}{" "}
                over
              </li>
              <li>your monthly budget!!!</li>
              <li>( {currencyFormatter.format(budget_left_daily)} per day )</li>
            </ul>
          )}
        </span>
      </>
    );
  }

  return (
    <>
      <div className="BudgetPieChart">
        <Pie options={userOptions} data={userData} />
      </div>
      <span className="BudgetPieText">
        <ul>
          {budgets.length && (
            <>
              <li>
                Monthly Budget{" "}
                {currencyFormatter.format(
                  budgets.find((budget) => budget.categoryId === 1)
                    .budget_amount
                )}
              </li>
              <li>Monthly Spend {currencyFormatter.format(spend_monthly)}</li>
              <li>
                Budget Left{" "}
                {currencyFormatter.format(
                  budgets.find((budget) => budget.categoryId === 1)
                    .budget_amount - spend_monthly
                )}
              </li>
              <li>( {currencyFormatter.format(budget_left_daily)} per day )</li>
            </>
          )}
        </ul>
      </span>
    </>
  );
}
