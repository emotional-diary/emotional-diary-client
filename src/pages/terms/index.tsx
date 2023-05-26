import React from 'react';
import router from 'next/router';

import { Container } from '@components/layout';
import { Button, FormContainer } from '@components/form/style';
import { Typography } from '@components/typography';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
  malesuada lorem maximus mauris scelerisque, at rutrum nulla
  dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.
  Curabitur ut augue finibus, luctus tortor at, ornare erat. Nulla
  facilisi. Sed est risus, laoreet et quam non, malesuada viverra
  lacus. Mauris semper vehicula mauris, eget interdum sem congue
  quis. Proin et urna turpis. Fusce tincidunt augue in velit
  tincidunt posuere. Ut ac faucibus lectus. Vivamus consequat mi ut
  massa ultrices varius. Maecenas vitae eros lorem. Cras in varius
  enim. Vestibulum eget est ac felis aliquet bibendum. Cras eget
  turpis sem.`;

export default function Terms() {
  const [isTermsChecked, setIsTermsChecked] = React.useState(false);

  return (
    <Container>
      <FormContainer style={{ minHeight: '100vh' }}>
        <img src={'/images/icons/coffee_bean.png'} />
        <Typography.h3 style={{ marginTop: 10 }}>이용 약관 동의</Typography.h3>

        <Button
          size={'small'}
          color={isTermsChecked ? 'primary' : 'white'}
          onClick={() => setIsTermsChecked(!isTermsChecked)}
          style={{ width: '100%' }}
        >
          전체 동의합니다
        </Button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
          }}
        >
          <Typography.body1 style={{ marginTop: 40 }}>
            서비스 이용약관(필수)
          </Typography.body1>
          <div
            style={{
              maxHeight: '200px',
              backgroundColor: '#FFF',
              marginTop: '10px',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
              overflowY: 'auto',
            }}
          >
            {loremIpsum}
          </div>

          <Typography.body1 style={{ marginTop: 25 }}>
            개인정보 처리방침(필수)
          </Typography.body1>
          <div
            style={{
              maxHeight: '200px',
              backgroundColor: '#FFF',
              marginTop: '10px',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
              overflowY: 'auto',
            }}
          >
            {loremIpsum}
          </div>

          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'flex-end',
              marginTop: '30px',
            }}
          >
            <Button
              disabled={!isTermsChecked}
              onClick={() => router.push('/signup')}
              style={{ width: '100%' }}
            >
              다음
            </Button>
          </div>
        </div>
      </FormContainer>
    </Container>
  );
}
