'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Container } from '@components/layout';
import { Button, IconButton } from '@components/button';
import { FormContainer } from '@components/form/style';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { Modal } from '@components/modal';
import { hexToRgba } from '@utils/index';
import { theme } from 'src/theme';
import { SignUpProps } from 'src/app/signup/page';
import { TERMS } from 'src/constants/terms';

export default function TermsClient({
  searchParams,
}: {
  searchParams: SignUpProps;
}) {
  const router = useRouter();
  const [checked, setChecked] = React.useState({
    terms: false,
    privacy: false,
  });
  const [modal, setModal] = React.useState({
    open: false,
    title: '',
    content: <></>,
  });

  console.log('searchParams', searchParams);

  const queryString = React.useMemo(() => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams);
    console.log('params', params.toString());
    return params.toString();
  }, [searchParams]);

  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <Modal
        open={modal.open}
        title={modal.title}
        onClose={() => setModal({ ...modal, open: false })}
      >
        <Typography
          variant={'body2'}
          style={{ maxHeight: 300, overflowY: 'auto' }}
        >
          {modal.content}
        </Typography>
      </Modal>
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
                ? hexToRgba(theme.palette.tertiary.main, 0.1)
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
                  content: TERMS.USE,
                })
              }
            >
              <Icons.Arrow
                width={15}
                height={15}
                direction={'right'}
                color={'#D3D3D3'}
              />
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
                  content: TERMS.POLICY,
                })
              }
            >
              <Icons.Arrow
                width={15}
                height={15}
                direction={'right'}
                color={'#D3D3D3'}
              />
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
              onClick={() => router.push(`/signup?${queryString}`)}
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
