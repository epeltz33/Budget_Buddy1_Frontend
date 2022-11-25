export const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});

export const dateConverter = (str) => {
    const new_str = new Date(str + 'T00:00:00').toDateString();
    return new_str.slice(4, 10) + new_str.slice(11); // remove day of week and year from date
};

// table to sort. index of column to sort by. boolean to sort ascending or descending (true = ascending)

export const tableSorter = (table, col, asc) => {
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  const dir = asc ? 1 : -1; //  1 = ascending, -1 = descending

  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${col + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${col + 1})`)
      .textContent.trim();

    if (col === 0)
      return new Date(aText) > new Date(bText) ? 1 * dir : -1 * dir;
    if (col=== 2)
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
    .querySelector(`th:nth-child(${col + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${col + 1})`)
    .classList.toggle("th-sort-desc", !asc);
};