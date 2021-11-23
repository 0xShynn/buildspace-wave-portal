import { sharedBaseStyle, light, dark } from './sharedStyleLinkButton'

const pinkGradientColor =
  'linear-gradient(60deg, rgba(172,63,251,1) 0%, rgba(252,70,107,1) 100%)'

const greenGradientColor =
  'linear-gradient(60deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'

const button = {
  baseStyle: {
    ...sharedBaseStyle,
    rounded: 'sm',
  },
  sizes: {
    sm: {},
    md: {
      px: { base: 8, md: 10 },
      py: { base: 7, md: 8 },
      fontSize: { base: '18px', md: '22px' },
    },
    lg: {},
  },
  variants: {
    ...light,
    ...dark,
    pinkGradient: {
      bg: pinkGradientColor,
      _hover: {
        bg: pinkGradientColor,
      },
      _active: {
        bg: pinkGradientColor,
      },
      _loading: {
        bg: pinkGradientColor,
      },
      _disabled: {
        bg: pinkGradientColor,
      },
    },
    greenGradient: {
      bg: greenGradientColor,
      _hover: {
        bg: greenGradientColor,
      },
      _active: {
        bg: greenGradientColor,
      },
      _loading: {
        bg: greenGradientColor,
      },
    },
    // Add here the shared variants from the sharedStyleLinkButton.js
  },
  defaultProps: {
    // size: 'md',
    // variant: 'light',
  },
}

export default button
