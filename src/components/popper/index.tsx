import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  open: boolean;
  content: React.ReactNode;
};

const ComponentWithTooltip = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.div`
  position: absolute;
  right: calc(100% + 12px);
  /* top: 50%; */
  transform: translateY(-25%);
  width: auto; /* 가변적인 가로 사이즈를 적용하기 위해 'auto'로 설정합니다. */
  padding: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  z-index: 9999;
`;

export default function Popper({ children, open, content }: Props) {
  return (
    <ComponentWithTooltip>
      {children}
      {open && <StyledTooltip>{content}</StyledTooltip>}
    </ComponentWithTooltip>
  );
}
