import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: Palette;
  }
}

interface Palette {
  primary: ColorVariant;
  secondary: ColorVariant;
  tertiary: ColorVariant;
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

interface PaletteWithIndexSignature extends Palette {
  [key: string]: {
    [key: string]: string;
  };
}

type PaletteKeys = keyof Palette;

type PaletteValues<T extends PaletteKeys> = Palette[T] extends object
  ? `${T}.${keyof Palette[T]}`
  : never;

type PaletteTypes = {
  [K in PaletteKeys]: PaletteValues<K>;
};

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

export type TypographyProps = {
  $variant: TypographyVariantKeys;
  color?: PaletteTypes[PaletteKeys];
};

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary.light'
    | 'error.light'
    | 'white'
    | 'gray';
}
