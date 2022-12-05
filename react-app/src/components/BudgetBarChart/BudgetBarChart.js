import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../../utils";
import "./BudgetBarChart.css";

export default function BudgetBarChart({ budgets, transactions, today }) {
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

  if (!budgets.length || !transactions.length) {
    return null;
  }

  return (
    <span className="BudgetBarChart">
      <h4>Category Budget</h4>
      {budgets
        .filter((budget) => budget.categoryId !== 1)
        .map((budget) => getCard(budget, spend_monthly_byCat))}
    </span>
  );
}

function getVariant(now, max) {
  const ratio = now / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

function getCard(budget, spend_monthly_byCat) {
  if (spend_monthly_byCat[budget.categoryId] > budget.budget_amount) {
    return (
      <Card className="mb-3 bg-danger bg-opacity-10">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div>{budget.budget_name}</div>
            <div>
              {currencyFormatter.format(spend_monthly_byCat[budget.categoryId])}{" "}
              / {currencyFormatter.format(budget.budget_amount)}
            </div>
          </Card.Title>
        </Card.Body>
        <ProgressBar
          className="rounded-pill m-3"
          variant={getVariant(
            spend_monthly_byCat[budget.categoryId],
            budget.budget_amount
          )}
          min={0}
          max={budget.budget_amount}
          now={spend_monthly_byCat[budget.categoryId]}
          label={`${
            Math.floor(
              (spend_monthly_byCat[budget.categoryId] / budget.budget_amount) *
                100
            ) || 0
          }%`}
        />
      </Card>
    );
  } else {
    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div>{budget.budget_name}</div>
            <div>
              {currencyFormatter.format(
                spend_monthly_byCat[budget.categoryId] || 0
              )}{" "}
              / {currencyFormatter.format(budget.budget_amount)}
            </div>
          </Card.Title>
        </Card.Body>
        <ProgressBar
          className="rounded-pill m-3"
          variant={getVariant(
            spend_monthly_byCat[budget.categoryId],
            budget.budget_amount
          )}
          min={0}
          max={budget.budget_amount}
          now={spend_monthly_byCat[budget.categoryId]}
          label={`${
            Math.floor(
              (spend_monthly_byCat[budget.categoryId] / budget.budget_amount) *
                100
            ) || 0
          }%`}
        />
      </Card>
    );
  }
}
