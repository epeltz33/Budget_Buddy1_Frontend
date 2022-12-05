import React from "react";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import AccountAdd from "../AccountAdd/AccountAdd";
import AccountDelete from "../AccountDelete/AccountDelete";
import AccountEdit from "../AccountEdit/AccountEdit";
import { AnimatePresence } from "framer-motion";
import "./AccountList.css";

export default function AccountList({ isMax }) {
  const accounts = useSelector((state) => state.account.all);

  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState();

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
    setEditId();
  };

  const minList = useMemo(
    () => (
      <ul>
        {accounts.map((account) => (
          <li key={account?.id}>
            <i className="fa-solid fa-cheese" /> {account?.account_name}
          </li>
        ))}
      </ul>
    ),
    [accounts]
  );

  const maxList = useMemo(
    () => (
      <ul>
        {accounts.map((account) => (
          <li key={account?.id}>
            {editId !== account?.id && <i className="fa-solid fa-cheese" />}
            {editId !== account?.id && account?.account_name}
            <AccountEdit
              setEditId={setEditId}
              editId={editId}
              account={account}
              accounts={accounts}
            />
            {editId !== account?.id && <AccountDelete oldAccount={account} />}
          </li>
        ))}
      </ul>
    ),
    [accounts, editId]
  );

  return (
    <div className="AccountList">
      <h3>Accounts</h3>
      {isMax ? (
        <button className="NewAccountButton" onClick={toggleAdd}>
          New Account
        </button>
      ) : (
        <button className="NewAccountButton" onClick={toggleAdd}>
          <i className="fa-solid fa-square-plus" /> Add
        </button>
      )}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {isAdd && <AccountAdd setIsAdd={setIsAdd} accounts={accounts} />}
      </AnimatePresence>
      {isMax ? maxList : minList}
    </div>
  );
}
