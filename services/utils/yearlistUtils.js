/* eslint-disable no-plusplus */
const getListYear = () => {
  const year = parseInt(new Date().getFullYear(), 10) - 5;
  const temp = [];
  for (let index = 0; index < 11; index++) {
    temp.push({
      value: (index + year).toString(),
      label: (index + year).toString(),
    });
  }
  return temp;
};
export { getListYear };
