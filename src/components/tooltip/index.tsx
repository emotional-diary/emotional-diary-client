import { Typography } from '@components/typography';
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  text: string;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
};

const ComponentWithTooltip = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.div`
  position: absolute;
  width: auto; /* 가변적인 가로 사이즈를 적용하기 위해 'auto'로 설정합니다. */
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  cursor: pointer;
  z-index: 9999;
`;

const Arrow = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

export default function Tooltip({ children, text, anchor = 'left' }: Props) {
  const [show, setShow] = React.useState(true);

  const handleClick = () => {
    setShow(false);
  };

  const anchorStyle = {
    left: {
      right: 'calc(100% + 16px)',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    right: {
      left: 'calc(100% + 16px)',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    top: {
      right: '50%',
      bottom: 'calc(100% + 16px)',
      transform: 'translateX(50%)',
    },
    bottom: {
      right: '50%',
      top: 'calc(100% + 16px)',
      transform: 'translateX(50%)',
    },
  };

  const anchorArrowStyle = {
    left: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      ['clipPath']: 'polygon(0 0, 100% 50%, 0 100%)',
    },
    right: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      ['clipPath']: 'polygon(0 50%, 100% 0, 100% 100%)',
    },
    top: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      ['clipPath']: 'polygon(0 0, 50% 100%, 100% 0)',
    },
    bottom: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      ['clipPath']: 'polygon(0 100%, 50% 0, 100% 100%)',
    },
  };

  return (
    <ComponentWithTooltip>
      {children}
      {show && (
        <StyledTooltip
          onClick={handleClick}
          style={{
            ...anchorStyle[anchor],
          }}
        >
          <Typography variant={'body4'} color={'background.paper'}>
            {text}
          </Typography>
          <Arrow style={{ ...anchorArrowStyle[anchor] }} />
        </StyledTooltip>
      )}
    </ComponentWithTooltip>
  );
}
