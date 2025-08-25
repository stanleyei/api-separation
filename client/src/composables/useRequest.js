import axios from 'axios';

const apiHost = import.meta.env.VITE_API_HOST;

const getCookie = (name) => {
  const result = document.cookie.split(';')
    .map(cookie => cookie.split('=', 2))
    .find(cookieKV => cookieKV[0].trim() === name)?.[1];

  return decodeURIComponent(result);
};

const useFetch = async (path, method, body) => {
  const url = `${apiHost}/laravel${path}`;
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
    credentials: 'include',
  };

  if (body) {
    option.body = JSON.stringify(body);
  }

  let data = null;
  try {
    const res = await fetch(url, option);
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

const useAxios = axios.create({
  baseURL: apiHost,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

useAxios.interceptors.request.use((config) => {
  config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
  return config;
});

export {
  useFetch,
  useAxios,
};
