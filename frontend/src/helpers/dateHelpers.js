export const pad = (n) => (n < 10 ? "0" + n : n);

export const format = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const addDays = (d, days) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const isValidISO = (str) =>
  /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str));


export const toPersianDate = (iso) => {
  // iso "2025-07-03"
  const [y, m, d] = iso.split("-");
  const g = new Date(+y, +m - 1, +d);

  return g.toLocaleDateString(
    "fa-IR-u-ca-persian",
    { year: "numeric", month: "long", day: "numeric" }
  );
};
