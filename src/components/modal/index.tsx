import { Button } from '@components/form/style';
import { Typography } from '@components/typography';
import { theme } from 'src/theme';

export const Modal = ({
  open,
  title,
  content,
  onClose,
}: {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 'calc(100% - 60px)',
          maxWidth: '540px',
          backgroundColor: 'white',
          padding: 30,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h1'} style={{ marginBottom: 20 }}>
          {title}
        </Typography>
        <Typography
          variant={'body2'}
          style={{ maxHeight: 300, overflowY: 'auto' }}
        >
          {content}
        </Typography>
        <Button
          color={'secondary'}
          style={{ width: '100%', marginTop: 20 }}
          onClick={onClose}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export const LoadingModal = ({ open }: { open: boolean }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: open ? 0 : '100%',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        zIndex: 100,
        backgroundColor: theme.palette.common.white,
        visibility: open ? 'visible' : 'hidden',
        transition: 'all 0.5s ease',
      }}
    >
      <img
        src={'/images/icons/loading.png'}
        alt={'loading'}
        style={{ width: 90, height: 90 }}
      />
      <Typography variant={'h3'} color={'gray.dark'} style={{ marginTop: 30 }}>
        작성한 일기를 <span style={{ color: '#35C591' }}>분석중</span>
        이예요
        <br />
        잠시만 기다려주세요
      </Typography>
    </div>
  );
};
