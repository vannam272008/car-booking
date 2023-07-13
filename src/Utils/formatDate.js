const changeFormatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return formattedDate;
};

  const changeFormatDate1 = (date) => {
    let newDate = new Date(date);
    let options = { weekday: 'short', day: 'numeric' };
    return newDate.toLocaleDateString("en-us", options);
  };

export {changeFormatDate, changeFormatDate1};