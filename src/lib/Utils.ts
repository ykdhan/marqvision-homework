export const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const mm = month < 10 ? "0" + month : month;
  const dd = day < 10 ? "0" + day : day;

  return `${year}-${mm}-${dd}`;
};

export const createRandomId = (): string => {
  let result = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ints = "0123456789";
  const charsLength = chars.length;
  const intsLength = ints.length;

  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  for (let i = 0; i < 4; i++) {
    result += ints.charAt(Math.floor(Math.random() * intsLength));
  }
  return result;
};

export const requestAPI = async <T = any>(
  method: string,
  url: string,
  params?: URLSearchParams
) => {
  const options: RequestInit = {
    method,
  };
  if (params) options.body = params;

  const res = await fetch(url, options);
  const json = await res?.json();

  if (!res.ok) {
    console.log("error");
  }

  return json as T;
};
