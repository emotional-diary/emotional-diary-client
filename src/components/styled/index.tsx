import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;
