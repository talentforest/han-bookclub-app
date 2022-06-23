export function getMonthNumber(id: string) {
  if (id.split("-")[1].split("")[0] === "0") {
    return id.split("-")[1].slice(1, 2);
  } else {
    return id.split("-")[1];
  }
}
