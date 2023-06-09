import { palette } from './palette';

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const typographyVariants = {
  h1: [32, fontWeights.bold, 1.2],
  h2: [28, fontWeights.bold, 1.2],
  h3: [24, fontWeights.bold, 1.2],
  h4: [20, fontWeights.bold, 1.2],
  h5: [16, fontWeights.bold, 1.2],
  h6: [12, fontWeights.bold, 1.2],
  subtitle1: [16, fontWeights.bold, 1.2],
  subtitle2: [14, fontWeights.bold, 1.2],
  subtitle3: [12, fontWeights.bold, 1.2],
  body1: [20, fontWeights.regular, 1.2],
  body2: [18, fontWeights.regular, 1.2],
  body3: [16, fontWeights.regular, 1.2],
  body4: [14, fontWeights.regular, 1.2],
  caption1: [12, fontWeights.regular, 1.2],
  caption2: [10, fontWeights.regular, 1.2],
  label1: [16, fontWeights.bold, 1.2],
  label2: [14, fontWeights.bold, 1.2],
  label3: [12, fontWeights.bold, 1.2],
};

const theme = {
  palette: palette,
};

export { theme };
