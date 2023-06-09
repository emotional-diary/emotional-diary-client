import React from 'react';
import router from 'next/router';

import { Container } from '@components/layout';
import { Button, FormContainer, IconButton } from '@components/form/style';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { Modal } from '@components/modal';
import { theme } from 'src/theme';
import { hexToRgb } from '@modules/index';

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
const loremIpsum2 = `개인정보 처리방침입니다. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec`;

export default function Terms() {
  const [checked, setChecked] = React.useState({
    terms: false,
    privacy: false,
  });
  const [modal, setModal] = React.useState({
    open: false,
    title: '',
    content: '',
  });

  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <Modal
        open={modal.open}
        title={modal.title}
        content={modal.content}
        onClose={() => setModal({ ...modal, open: false })}
      />
      <FormContainer style={{ paddingTop: 0 }}>
        <Typography variant={'h3'} style={{ marginBottom: 30 }}>
          필수 이용약관에 동의해주세요
        </Typography>

        <Button
          size={'small'}
          // color={checked.privacy && checked.terms ? 'primary' : 'gray'}
          onClick={() =>
            setChecked(() => {
              if (checked.privacy && checked.terms) {
                return {
                  terms: false,
                  privacy: false,
                };
              }
              return {
                terms: true,
                privacy: true,
              };
            })
          }
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '20px 24px',
            backgroundColor:
              checked.privacy && checked.terms
                ? hexToRgb(theme.palette.tertiary.main, 0.1)
                : theme.palette.gray.light,
          }}
        >
          {checked.privacy && checked.terms ? (
            <Icons.Check />
          ) : (
            <Icons.UnCheck />
          )}
          <Typography
            variant={'label2'}
            color={
              checked.privacy && checked.terms ? 'tertiary.main' : 'gray.main'
            }
            style={{ marginLeft: 10 }}
          >
            필수 약관 전체 동의
          </Typography>
        </Button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: 20,
              padding: '0px 24px',
            }}
          >
            <IconButton
              onClick={() => setChecked({ ...checked, terms: !checked.terms })}
            >
              {checked.terms ? <Icons.Check /> : <Icons.UnCheck />}

              <Typography
                variant={'body4'}
                color={checked.terms ? 'tertiary.main' : 'gray.main'}
                style={{ marginLeft: 10 }}
              >
                서비스 이용약관(필수)
              </Typography>
            </IconButton>
            <IconButton
              style={{ marginLeft: 'auto' }}
              onClick={() =>
                setModal({
                  open: true,
                  title: '서비스 이용약관',
                  content: loremIpsum,
                })
              }
            >
              <div>{'>'}</div>
            </IconButton>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: 20,
              padding: '0px 24px',
            }}
          >
            <IconButton
              onClick={() =>
                setChecked({ ...checked, privacy: !checked.privacy })
              }
            >
              {checked.privacy ? <Icons.Check /> : <Icons.UnCheck />}

              <Typography
                variant={'body4'}
                color={checked.privacy ? 'tertiary.main' : 'gray.main'}
                style={{ marginLeft: 10 }}
              >
                개인정보 처리방침(필수)
              </Typography>
            </IconButton>
            <IconButton
              style={{ marginLeft: 'auto' }}
              onClick={() =>
                setModal({
                  open: true,
                  title: '개인정보 처리방침',
                  content: loremIpsum2,
                })
              }
            >
              <div>{'>'}</div>
            </IconButton>
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
              color={'secondary'}
              disabled={!checked.privacy || !checked.terms}
              onClick={() => router.push('/signup')}
              style={{ width: '100%' }}
            >
              <Typography variant={'label1'} color={'common.white'}>
                다음
              </Typography>
            </Button>
          </div>
        </div>
      </FormContainer>
    </Container>
  );
}
