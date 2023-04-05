//Utility to create debounced version of any function.
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  timeout: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export default debounce;
