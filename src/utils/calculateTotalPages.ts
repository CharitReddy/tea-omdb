const calculateTotalPages = (totalResults: number, pageSize: number) => {
  return Math.ceil(totalResults / pageSize);
};

export default calculateTotalPages;
