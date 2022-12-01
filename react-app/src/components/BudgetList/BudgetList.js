import ReactDOM from "react-dom";
import BudgetEdit from "../BudgetEdit/BudgetEdit";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import React from "react";
import "./BudgetList.css";

export default function BudgetList({ budgets, isEdit, setIsEdit }) {
  if (!isEdit) {
    return null;
  }

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return ReactDOM.createPortal(
    <Backdrop onClick={() => setIsEdit(false)}>
      {/* <div className='BudgetListOverlay' onClick={() => setIsEdit(false)}></div> */}
      <motion.div
        key="Budget-List"
        className="BudgetList"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          <i className="fa-solid fa-piggy-bank" /> Budgets
        </h3>
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              {budget.budget_name} | {budget.budget_amount}
              <BudgetEdit
                budgets={budgets}
                budget={budget}
                setIsEdit={setIsEdit}
              />
            </li>
          ))}
        </ul>
        <button
          id="BudgetEditCloseButton"
          className="cancel-button"
          onClick={() => setIsEdit(false)}
        >
          Close
        </button>
      </motion.div>
    </Backdrop>,
    document.getElementById("root")
  );
}
