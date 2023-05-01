import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 0 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  font-size: 16px;

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const Button = styled.button`
  background: #50b801;
  border: 0;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  &:hover {
    background: #42a306;
  }
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
