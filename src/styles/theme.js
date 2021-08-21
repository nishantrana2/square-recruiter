const breakpoints = ["768px", "1200px", "1500px"];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];

export const colors = {
  grey: "#303F60",
};

const space = [
  "0",
  "0.25rem",
  "0.5rem",
  "0.75rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "2rem",
  "2.5rem",
  "3rem",
  "4rem",
  "5rem",
];

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const fontSizes = [
  ".5rem",
  ".75rem",
  ".875rem",
  "1rem",
  "27px",
  "1.25rem",
  "1.5rem",
  "1.875rem",
  "2.25rem",
  "3rem",
  "4rem",
];
const lineHeights = [
  ".5rem",
  ".75rem",
  ".875rem",
  "1rem",
  "1.125rem",
  "1.25rem",
  "1.5rem",
  "1.875rem",
  "2.25rem",
  "3rem",
  "4rem",
];

const theme = {
  breakpoints,
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  space,
};

export default theme;
