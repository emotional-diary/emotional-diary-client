'use client';

import React from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';

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
  const [inquiryData, setInquiryData] = React.useState<Inquiry>({
    email: user?.email,
    content: '',
  });

  const sendInquiryMutation = useMutation({
    mutationFn: async (inquiryData: Inquiry) => {
      try {
        const res = await axios.post('/api/user/inquiry', inquiryData);
        return res.data;
      } catch (error: any) {
        console.log('error', error);
        return error.response.data;
      }
    },
  });

  const validate = () => {
    if (!inquiryData.content) {
      alert('문의 내용을 입력해주세요.');
      return false;
    }

    if (!inquiryData.email) {
      alert('이메일을 입력해주세요.');
      return false;
    }

    return true;
  };

  const sendInquiry = async () => {
    if (!validate()) return;
    const { data, statusCode, responseMessage } =
      await sendInquiryMutation.mutateAsync({
        email: inquiryData.email,
        content: inquiryData.content,
      });

    if (statusCode >= 400) {
      alert(responseMessage);
      return;
    }

    alert('문의가 접수되었습니다.');
  };

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
            value={inquiryData?.email}
            onChange={e => {
              setInquiryData({
                ...inquiryData,
                email: e.target.value,
              });
            }}
            style={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '10px',
              marginTop: '20px',
              padding: '20px 16px',
            }}
          />

          <Typography variant={'caption1'} color={'error.main'}>
            *답변 받을 이메일을 정확히 입력해주세요. 잘못 기입하신 경우 원활한
            안내가 어려울 수 있습니다.
          </Typography>
        </div>
      </div>

      <Button
        color={'secondary'}
        style={{ width: '100%', marginTop: 20 }}
        onClick={sendInquiry}
      >
        <Typography variant={'label1'} color={'common.white'}>
          문의하기
        </Typography>
      </Button>
    </Container>
  );
}
