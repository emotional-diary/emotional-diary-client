import { AxiosError } from 'axios';

export const commonErrorHandler = (error: Error) => {
  const { response } = error as AxiosError<{ responseMessage: string }>;

  switch (response?.status) {
    // 비즈니스 에러 별도 처리
    case 400:
      break;
    case 401:
      alert('세션이 만료되었습니다.\n다시 로그인해주세요.');
      window.location.href = '/login';
      break;
    case 403:
      alert('권한이 없습니다.');
      break;
    case 404:
      alert('페이지를 찾을 수 없습니다.');
      break;
    // AI 서버 에러
    case 498:
      alert(response?.data?.responseMessage);
      window.location.href = '/login';
      break;
    case 500:
      alert('서버 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.');
      break;
    default:
      console.error('common error', error);
      alert(response?.data?.responseMessage || '오류가 발생했습니다.');
      break;
  }
};
