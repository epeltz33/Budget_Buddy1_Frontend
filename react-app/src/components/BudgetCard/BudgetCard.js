import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BudgetPieChart from "../BudgetPieChart/BudgetPieChart";
import BudgetBarChart from "../BudgetBarChart/BudgetBarChart";
import BudgetList from "../BudgetList/BudgetList";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js"; // https://www.chartjs.org/docs/latest/getting-started/integration.html
import { AnimatePresence } from "framer-motion";
import "./BudgetCard.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function BudgetCard() {
  const [isEdit, setIsEdit] = useState(false);

  const budgets = useSelector((state) => state.budget.all);
  const transactions = useSelector((state) => state.transaction.all);

  const today = new Date();
  const days_in_month =
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() -
    today.getDate();

  if (!budgets?.length || !transactions?.length) return null; // no need to render if there are no budgets or transactions

  return (
    <div className="BudgetCard">
      <AnimatePresence
        key="edit-budget-modal"
        initial={false}
        mode="wait"
        onExitComplete={() => null} // set isEdit to false after animation is complete
      >
        {isEdit && (
          <BudgetList budgets={budgets} isEdit={isEdit} setIsEdit={setIsEdit} />
        )}
      </AnimatePresence>
      <BudgetPieChart
        budgets={budgets}
        transactions={transactions}
        days_in_month={days_in_month}
        today={today}
      />
      <BudgetBarChart
        budgets={budgets}
        transactions={transactions}
        today={today}
      />
      <button id="EditBudgetsButton" onClick={() => setIsEdit(true)}>
        Edit Budgets
      </button>
    </div>
  );
}
