//Util to calculate total number of pages to be displayed.
const calculateTotalPages = (totalResults: number, pageSize: number) => {
  return Math.ceil(totalResults / pageSize);
};

export default calculateTotalPages;
