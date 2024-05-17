export const deviceSizes = {
  mobile: '375',
  tablet: '700',
  desktop: '1024',
};

const device = {
  mobile: `only screen and (min-width: ${deviceSizes.mobile}px)`,
  tablet: `only screen and (min-width: ${deviceSizes.tablet}px)`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop}px)`,
};

export default device;
