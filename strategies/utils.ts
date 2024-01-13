const getReturns = (open: number, close: number) => {
  return (close / open - 1) * 100;
};

export { getReturns };
