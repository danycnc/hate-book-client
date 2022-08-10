function useDateFormatter(date) {
  const formattedDate = date.replace('T', ' ').split('.', 1);
  return formattedDate;
}

export default useDateFormatter;
