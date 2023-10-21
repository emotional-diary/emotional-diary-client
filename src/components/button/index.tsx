import styled, { css } from 'styled-components';

import { hexToRgba } from '@utils/index';
import { ButtonProps } from '../../../@types/theme';

const getSizeStyles = (size: ButtonProps['size'] = 'medium') => {
  switch (size) {
    case 'small':
      return css`
        padding: 5px 10px;
        font-size: 13px;
      `;
    case 'medium':
      return css`
        padding: 10px 20px;
        font-size: 16px;
      `;
    case 'large':
      return css`
        padding: 15px 30px;
        font-size: 20px;
      `;
    default:
      return null;
  }
};

const getColorStyles = (color: ButtonProps['color'] = 'primary') => {
  switch (color) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) => theme.palette.common.white};
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.palette.secondary.light};
        color: ${({ theme }) => theme.palette.common.white};
      `;
    case 'tertiary':
      return css`
        background: ${({ theme }) => theme.palette.tertiary.main};
        color: ${({ theme }) => theme.palette.common.white};
      `;
    case 'tertiary.light':
      return css`
        background: ${({ theme }) =>
          hexToRgba(theme.palette.tertiary.main, 0.1)};
        color: ${({ theme }) => theme.palette.tertiary.main};
      `;
    case 'error.light':
      return css`
        background: ${({ theme }) => hexToRgba(theme.palette.error.main, 0.1)};
        color: ${({ theme }) => theme.palette.error.main};
      `;
    case 'white':
      return css`
        background: #fff;
        color: ${({ theme }) => theme.palette.common.black};
      `;
    case 'gray':
      return css`
        background: ${({ theme }) => theme.palette.gray.light};
        color: ${({ theme }) => theme.palette.gray.main};
      `;
    case 'gray.dark':
      return css`
        background: ${({ theme }) => theme.palette.gray.main};
        color: ${({ theme }) => theme.palette.common.white};
      `;
    default:
      return null;
  }
};

export const Button = styled.button<ButtonProps>`
  height: 55px;
  border: 0;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  ${({ size }) => getSizeStyles(size)};
  ${({ color }) => getColorStyles(color)};

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: #ccc;
    & > :nth-of-type(1) {
      color: ${({ theme }) => `${theme.palette.common.black}`};
    }
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
