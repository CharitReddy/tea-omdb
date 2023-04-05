const debounce = (func: (searchTerm: string) => void, time: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<typeof func>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, time);
  };
};
export default debounce;
