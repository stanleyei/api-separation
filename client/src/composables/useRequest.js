const getCookie = (name) => {
  const result = document.cookie.split(';')
    .map(cookie => cookie.split('=', 2))
    .find(cookieKV => cookieKV[0].trim() === name)?.[1];

  return decodeURIComponent(result);
};

export {
  getCookie,
};
