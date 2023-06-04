import styled from 'styled-components';

import { typographyVariants } from 'src/theme';

const styler = (variant: TypographyProps['variant']) => {
  const [fontSize, fontWeight, lineHeight] = typographyVariants[variant];
  return `
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
  `;
};

const StyledText = styled.div<TypographyProps>`
  ${props => styler(props.variant)};
  color: ${props =>
    props.theme.palette[props.color?.split('.')[0] || 'common'][
      props.color?.split('.')[1] || 'black'
    ]};
  margin: 0;
`;

const Division = styled(StyledText)``;
const H1 = styled(StyledText).attrs({ as: 'h1' })``;
const H2 = styled(StyledText).attrs({ as: 'h2' })``;
const H3 = styled(StyledText).attrs({ as: 'h3' })``;
const H4 = styled(StyledText).attrs({ as: 'h4' })``;
const H5 = styled(StyledText).attrs({ as: 'h5' })``;
const H6 = styled(StyledText).attrs({ as: 'h6' })``;

const Typography = ({
  variant = 'body1',
  color,
  style,
  onClick,
  children,
}: {
  variant?: TypographyProps['variant'];
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
  };

  const Component =
    components[variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'] || Division;

  return (
    <Component variant={variant} color={color} style={style} onClick={onClick}>
      {children}
    </Component>
  );
};

export { Typography };
