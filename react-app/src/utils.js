export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 2,
});

export const dateConverter = (str) => {
  const new_str = new Date(str + "T00:00").toDateString();
  return new_str.slice(4, 10) + ", " + new_str.slice(11);
};

// table to sort, index of column to sort for, boolean if asc or desc order

export const tableSorter = (table, column, asc = true) => {
  const dir = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    if (column === 0)
      return new Date(aText) > new Date(bText) ? 1 * dir : -1 * dir;
    if (column === 2)
      return parseInt(aText.slice(1)) > parseInt(bText.slice(1))
        ? 1 * dir
        : -1 * dir;

    return aText > bText ? 1 * dir : -1 * dir;
  });

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortedRows);

  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
};
