import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)

interface TypographyStyles {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  body: string;
  label: string;
  textSm: string;
  textLg: string;
  textXl: string;
  text2Xl: string;
  text3Xl: string;
  text4Xl: string;
  text5Xl: string;
  text6Xl: string;
  text7Xl: string;
  text8Xl: string;
  text9Xl: string;
  fontRegular: string;
  fontMedium: string;
  fontBold: string;
  fontBlack: string;
  textCenter: string;
  textLeft: string;
  textRight: string;
}

export const typographyStyles: TypographyStyles = {
  h1: tw`text-4xl font-bold`,
  h2: tw`text-3xl font-bold`,
  h3: tw`text-2xl font-bold`,
  h4: tw`text-xl font-bold`,
  h5: tw`text-lg font-bold`,
  h6: tw`text-base font-bold`,
  body: tw`text-base font-normal`,
  label: tw`text-sm font-medium`,
  textSm: tw`text-sm`,
  textLg: tw`text-lg`,
  textXl: tw`text-xl`,
  text2Xl: tw`text-2xl`,
  text3Xl: tw`text-3xl`,
  text4Xl: tw`text-4xl`,
  text5Xl: tw`text-5xl`,
  text6Xl: tw`text-6xl`,
  text7Xl: tw`text-7xl`,
  text8Xl: tw`text-8xl`,
  text9Xl: tw`text-9xl`,
  fontRegular: tw`font-normal`,
  fontMedium: tw`font-medium`,
  fontBold: tw`font-bold`,
  fontBlack: tw`font-black`,
  textCenter: tw`text-center`,
  textLeft: tw`text-left`,
  textRight: tw`text-right`,
};