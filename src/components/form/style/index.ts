import styled, { css } from 'styled-components';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
}

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
        background: #2b625b;
        color: #fff;
      `;
    case 'secondary':
      return css`
        background: #f5e9cd;
        color: #000;
      `;
    case 'white':
      return css`
        background: #fff;
        color: #000;
      `;
    default:
      return null;
  }
};

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 320px;
  max-width: 400px;
  background-color: #f5e9cd;
  padding: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px;
  margin: 0 0 10px;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 14px;

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
  &::placeholder {
    color: #a6a6a6;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  margin: 10px 0px;
  cursor: pointer;
`;

export const Button = styled.button<ButtonProps>`
  height: 55px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  line-height: 1.2;
  ${({ size }) => getSizeStyles(size)};
  ${({ color }) => getColorStyles(color)};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: #ccc;
    color: #666;
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

export const FormErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
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
  max-width: calc(50% - 5px);
  height: 55px;
  background-color: ${props => (props.selected ? '#2b625b' : '#FFF')};
  color: ${props => (props.selected ? '#FFF' : '#A6A6A6')};
  border-radius: 12px;
  cursor: pointer;
`;

export const GenderRadioButton = styled.input`
  display: none;
`;
