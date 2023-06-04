interface Palette {
  primary: ColorVariant;
  secondary: ColorVariant;
  error: ColorVariant;
  warning: ColorVariant;
  info: ColorVariant;
  success: ColorVariant;
  gray: ColorVariant;
  common: {
    black: string;
    white: string;
  };
  text: {
    disabled: string;
    hint: string;
  };
}

type ColorVariant = {
  main: string;
  light?: string;
  dark?: string;
};

type TypographyVariantKeys =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'caption1'
  | 'caption2'
  | 'label1'
  | 'label2'
  | 'label3';

interface TypographyProps {
  variant: TypographyVariantKeys;
  color?: Partial<Palette>;
}

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
}
