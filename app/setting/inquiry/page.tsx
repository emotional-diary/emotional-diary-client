'use client';

import React from 'react';
import { styled } from 'styled-components';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { Button } from '@components/button';
import { theme } from 'src/theme';
import { Input } from '@components/form/style';
import { useUserStore } from '@store/index';

const TextArea = styled.textarea`
  width: 100%;
  height: 250px;
  padding: 16px;
  border: none;
  border-radius: 10px;
  resize: none;
  font-size: 14px;

  &::placeholder {
    color: ${props => props.theme.palette.gray.main};
  }
`;

export default function Inquiry() {
  const { user } = useUserStore();
  const [inquiryData, setInquiryData] = React.useState({
    email: user?.email,
    content: '',
  });

  return (
    <Container
      headerProps={{
        back: true,
      }}
      bodyProps={{
        style: {
          backgroundColor: theme.palette.common.white,
          padding: '0 30px 30px 30px',
          alignItems: 'flex-start',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '14px',
        }}
      >
        <Typography variant={'h3'}>문의하기</Typography>
      </div>

      <div
        style={{
          width: '100%',
          backgroundColor: theme.palette.gray.light,
          borderRadius: '10px',
          marginTop: '33px',
        }}
      >
        <div style={{ width: '100%', padding: '20px' }}>
          <TextArea
            onChange={e => {
              setInquiryData({
                ...inquiryData,
                content: e.target.value,
              });
            }}
            placeholder={'문의할 내용을 입력해주세요.'}
          />

          <Input
            readOnly={inquiryData?.email ? true : false}
            value={inquiryData?.email}
            style={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              marginTop: '20px',
              padding: '20px 16px',
            }}
          />
        </div>
      </div>

      <Button color={'secondary'} style={{ width: '100%', marginTop: 20 }}>
        <Typography variant={'label1'} color={'common.white'}>
          문의하기
        </Typography>
      </Button>
    </Container>
  );
}
