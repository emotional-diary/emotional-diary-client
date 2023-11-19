export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';'); // 쿠키 문자열을 세미콜론으로 분리
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1); // 쿠키 값 반환
    }
  }
  return null; // 해당 이름의 쿠키를 찾지 못한 경우
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    if (!key) throw new Error('key is required');
    const item = window.localStorage.getItem(key);

    const parsedItem = JSON.parse(item ?? '') as {
      value: T;
      expires: string;
    };

    if (parsedItem?.expires !== 'persistent') {
      const expires = new Date(parsedItem?.expires ?? '');
      if (expires < new Date()) {
        window.localStorage.removeItem(key);
        return null;
      }
    }

    return parsedItem?.value ?? null;
  } catch (error) {
    console.log('getLocalStorage error', error);

    return null;
  }
};

export const setLocalStorage = (
  key: string,
  value: string,
  options: {
    expires?: number;
    expireAtMidnight?: boolean;
  } = {}
) => {
  try {
    if (!key || !value) throw new Error('key and value are required');

    let expires = '';

    if (options?.expires) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires);
      expires = date.toString();
    }
    if (options?.expireAtMidnight) {
      const date = new Date();
      date.setHours(24, 0, 0, 0);
      expires = date.toString();
    }

    const item = JSON.stringify({
      value,
      expires: expires || 'persistent',
    });

    window.localStorage.setItem(key, item);
  } catch (error) {
    console.log('setLocalStorage error', error);
  }
};

export const getSessionStorage = <T>(key: string): T | null => {
  try {
    if (!key) throw new Error('key is required');
    const item = window.sessionStorage.getItem(key);

    const parsedItem = JSON.parse(item ?? '') as T;

    return parsedItem ?? null;
  } catch (error) {
    console.log('getSessionStorage error', error);

    return null;
  }
};

export const setSessionStorage = (key: string, value: string) => {
  try {
    if (!key || !value) throw new Error('key and value are required');

    const item = JSON.stringify(value);

    window.sessionStorage.setItem(key, item);
  } catch (error) {
    console.log('setSessionStorage error', error);
  }
};
