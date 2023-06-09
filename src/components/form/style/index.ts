import styled, { css } from 'styled-components';

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
    default:
      return null;
  }
};

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  min-width: 320px;
  max-width: 600px;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: 40px 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 55px;
  padding: 20px;
  margin: 0 0 10px;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.palette.gray.light};
  font-size: 14px;

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
  &::placeholder {
    color: ${({ theme }) => theme.palette.gray.main};
  }
`;

export const Label = styled.label`
  margin: 8px 0px;
`;

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

export const HrText = styled.div`
  display: flex;
  align-items: center;
  color: #464646;
  width: 100%;
  margin: 30px 0px;
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: #464646;
    height: 1px;
    margin: 0px 16px;
  }
  &::before {
    margin-left: 0;
  }
  &::after {
    margin-right: 0;
  }
`;

export const GenderButton = styled.label<{ selected: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: calc(50% - 7.5px);
  height: 55px;
  transition: all 0.2s ease-in-out;
  background-color: ${props =>
    props.selected
      ? props.theme.palette.secondary.light
      : props.theme.palette.gray.light};
  border-radius: 50px;
  cursor: pointer;
`;

export const GenderRadioButton = styled.input`
  display: none;
`;
