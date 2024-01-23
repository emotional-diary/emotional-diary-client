import { AxiosError } from 'axios';

export const commonErrorHandler = (error: Error) => {
  const { response } = error as AxiosError<{ responseMessage: string }>;

  switch (response?.status) {
    case 400:
      // 비즈니스 에러 별도 처리
      break;
    case 401:
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
      break;
    case 403:
      alert('권한이 없습니다.');
      break;
    case 404:
      alert('페이지를 찾을 수 없습니다.');
      break;
    case 500:
      // AI 서버 에러
      if (response?.data?.responseMessage === 'AI_INTERNAL_SERVER_ERROR') {
        alert('현재 AI 상태가 좋지 않아 일기 저장에 실패했어요.');
        window.location.href = '/login';
        break;
      }
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      break;
    default:
      alert(response?.data?.responseMessage || '오류가 발생했습니다.');
      console.error('common error', error);
      break;
  }
};
