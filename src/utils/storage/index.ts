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
