export const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "usd",
  minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});

export const dateConverter = (str) => {
  const new_str = new Date(str + "T00:00:00").toDateString();
  return new_str.slice(4, 10) + new_str.slice(11); // remove day of week and year from date
};

// Convert a string to a date, and then to a number that represents the number of days since January 1, 1970.
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
