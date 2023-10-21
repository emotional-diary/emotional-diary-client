import styled from 'styled-components';

import { hexToRgba } from '@utils/index';

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
      ? hexToRgba(props.theme.palette.tertiary.main, 0.1)
      : props.theme.palette.gray.light};
  border-radius: 50px;
  cursor: pointer;
`;

export const GenderRadioButton = styled.input`
  display: none;
`;
