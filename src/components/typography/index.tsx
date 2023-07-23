import styled from 'styled-components';

import { theme, typographyVariants } from 'src/theme';
import {
  Palette,
  PaletteWithIndexSignature,
  TypographyProps,
} from '../../../@types/theme';

const styler = (variant: TypographyProps['$variant']) => {
  const [fontSize, fontWeight, lineHeight] = typographyVariants[variant];
  return `
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
  `;
};

const StyledText = styled.div<TypographyProps>`
  ${props => styler(props.$variant)};
  color: ${props => {
    const splitedColor = (props.color?.split('.') as string[]) || [
      'common',
      'black',
    ];
    return (props.theme.palette as PaletteWithIndexSignature)[
      `${splitedColor[0]}`
    ][`${splitedColor[1]}`];
  }};
  margin: 0;
`;

const Div = styled(StyledText)``;
const Span = styled(StyledText).attrs({ as: 'span' })``;
const P = styled(StyledText).attrs({ as: 'p' })``;
const Pre = styled(StyledText).attrs({ as: 'pre' })``;
const H1 = styled(StyledText).attrs({ as: 'h1' })``;
const H2 = styled(StyledText).attrs({ as: 'h2' })``;
const H3 = styled(StyledText).attrs({ as: 'h3' })``;
const H4 = styled(StyledText).attrs({ as: 'h4' })``;
const H5 = styled(StyledText).attrs({ as: 'h5' })``;
const H6 = styled(StyledText).attrs({ as: 'h6' })``;

const Typography = ({
  component = 'div',
  variant = 'body1',
  color,
  style,
  onClick,
  children,
  className,
}: {
  component?: 'div' | 'span' | 'p' | 'pre';
  variant?: TypographyProps['$variant'];
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    div: Div,
    span: Span,
    p: P,
    pre: Pre,
  };

  const Component =
    components[variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'] ||
    components[component];

  return (
    <Component
      className={className}
      $variant={variant}
      color={color}
      style={style}
      onClick={onClick}
      theme={theme}
    >
      {children}
    </Component>
  );
};

export { Typography };
