const getCookie = (name) => {
  let result = '';
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key.trim() === name) return result = value;
  }
  return decodeURIComponent(result);
};

const useFetch = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json();
  return data;
};

export {
  getCookie,
};
