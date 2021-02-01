const dateObj = {};

dateObj.calculateAge = (birthDate) => {
  const today = new Date();
  let yearsDiff = today.getFullYear() - birthDate.getFullYear();

  if(today.getMonth() < birthDate.getMonth() || 
  (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())){
    yearsDiff--;
  }

  return yearsDiff;
}

dateObj.convertToDate = (dateStr) => {
  console.log(`birthdate: ${dateStr}`)
  const year = dateStr.split("/")[0];
  const month = dateStr.split("/")[2];
  const day = dateStr.split("/")[1];

  // month is 0-indexed so we subtract 1 to get the correct month
  return new Date(year, month-1, day); 
}

module.exports = dateObj;
