import moment from "moment";

const getCurrentQuarter = (): string => {
  const today = moment();

  const quarters = [
    { name: "Q1", start: moment(`${today.year()}-03-01`), end: moment(`${today.year()}-05-19`) }, // March 1 - May 19
    { name: "Q2", start: moment(`${today.year()}-05-20`), end: moment(`${today.year()}-08-11`) }, // May 20 - Aug 11
    { name: "Q3", start: moment(`${today.year()}-08-12`), end: moment(`${today.year()}-10-20`) }, // Aug 12 - Oct 20
    { name: "Q4", start: moment(`${today.year()}-10-21`), end: moment(`${today.year()}-12-31`) }, // Oct 21 - Dec 31
  ];

  const currentQuarter = quarters.find(q => today.isBetween(q.start, q.end, "day", "[]"));

  return currentQuarter ? currentQuarter.name : "Q1"; // Default to Q1 if no match
}

export default getCurrentQuarter
