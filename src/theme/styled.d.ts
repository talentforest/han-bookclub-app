import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    text: {
      default: string;

      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;

      blue1: string;
      blue2: string;
      blue3: string;

      yellow: string;
      purple: string;
      green: string;
      red: string;
    };

    container: {
      default: string;

      blue1: string;
      blue2: string;
      blue3: string;

      purple1: string;
      purple2: string;

      green1: string;
      green2: string;

      yellow1: string;
      yellow2: string;

      orange: string;
      pink: string;
    };
    boxShadow: string;
  }
}
