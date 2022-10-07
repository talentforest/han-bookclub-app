import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    text: {
      default: string;
      accent: string;
      lightBlue: string;
      lightGray: string;
      gray: string;
      white: string;
    };
    container: {
      default: string;
      lightBlue: string;
      blue: string;
      orange: string;
      green: string;
      pink: string;
      purple: string;
      yellow: string;
    };
    boxShadow: string;
  }
}
