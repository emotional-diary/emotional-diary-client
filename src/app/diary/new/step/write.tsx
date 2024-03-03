'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { LoadingModal } from '@components/modal';
import { ImageContainer } from '../page';
import { theme } from 'src/theme';
import { getLocalStorage, setLocalStorage } from '@utils/storage';

const TextEditor = dynamic(() => import('@components/textEditor'), {
  ssr: false,
});

const CloseButton = ({
  onClick,
  style,
}: {
  onClick?: () => void;
  style?: React.CSSProperties;
}) => (
  <div
    onClick={onClick}
    style={{
      position: 'absolute',
      top: 5,
      right: 15,
      zIndex: 1,
      width: 18,
      height: 18,
      borderRadius: '50%',
      backgroundColor: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.common.black,
      fontWeight: 'bold',
      cursor: 'pointer',

      ...(style ?? {}),
    }}
  >
    &#215;
  </div>
);

export default function WriteDiary({
  diary,
  setDiary,
  resetDiary,
  isLoading,
}: {
  diary: Diary;
  setDiary: (diary: Diary) => void;
  resetDiary: () => void;
  isLoading: boolean;
}) {
  React.useEffect(() => {
    const savedDiaryContent = getLocalStorage<Diary['content']>(
      'saved-diary-content'
    );
    setDiary({ ...diary, content: savedDiaryContent ?? '' });

    return () => {
      resetDiary();
    };
  }, []);

  React.useEffect(() => {
    if (!diary?.content) return;
    setLocalStorage('saved-diary-content', diary?.content);
  }, [diary?.content]);

  return (
    <>
      <LoadingModal open={isLoading} />
      <TextEditor />

      {diary?.images?.length > 0 && (
        <ImageContainer style={{ paddingBottom: '10px' }}>
          {diary.images?.map((image, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <CloseButton
                onClick={() => {
                  setDiary({
                    ...diary,
                    images: diary.images?.filter((_, i) => i !== index),
                  });
                }}
              />
              <img
                src={image.imageUrl}
                alt={'diary_image'}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 6,
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
        </ImageContainer>
      )}
    </>
  );
}
