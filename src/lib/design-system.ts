// Design System for Kindred Landing Page
// Based on 1728px (MacBook Pro 16") with 7-column grid for desktop
// Based on 402px for mobile

const FIGMA_WIDTH = 1728
const MOBILE_WIDTH = 402
const GRID_COLUMNS = 7
const GRID_MARGIN = 64 // Left and right margins in Figma (NOT 48!)
const MOBILE_MARGIN = 16 // Mobile margins

// Calculate column width: (1728 - 64*2) / 7 = 1600 / 7 = 228.57px per column
export const COLUMN_WIDTH = (FIGMA_WIDTH - GRID_MARGIN * 2) / GRID_COLUMNS
export const GRID_GAP = 24 // Gap between columns

/**
 * Scale a pixel value from Figma to viewport width (Desktop)
 * Use useResponsiveScale() hook in components for responsive scaling
 * This function is for desktop only (1728px base)
 */
export const scale = (px: number): string => {
  return scaleDesktop(px)
}

/**
 * Get responsive scale values for both mobile and desktop
 * Returns an object with mobile and desktop values
 */
export const scaleResponsive = (px: number) => {
  return {
    mobile: `${(px / MOBILE_WIDTH) * 100}vw`,
    desktop: `${(px / FIGMA_WIDTH) * 100}vw`,
  }
}

/**
 * Scale a pixel value for mobile (based on 402px width)
 */
export const scaleMobile = (px: number): string => {
  return `${(px / MOBILE_WIDTH) * 100}vw`
}

/**
 * Scale a pixel value for desktop only (based on 1728px width)
 */
export const scaleDesktop = (px: number): string => {
  return `${(px / FIGMA_WIDTH) * 100}vw`
}

/**
 * Get the width of N columns including gaps
 */
export const columns = (n: number, includeGaps = true): string => {
  if (!includeGaps) {
    return scale(COLUMN_WIDTH * n)
  }
  return scale(COLUMN_WIDTH * n + GRID_GAP * (n - 1))
}

/**
 * Get the left position starting from column N (1-indexed)
 */
export const columnStart = (n: number): string => {
  return scale(GRID_MARGIN + COLUMN_WIDTH * (n - 1) + GRID_GAP * (n - 1))
}

/**
 * Typography system based on Figma design
 */
export const typography = {
  // Display - Hero headlines
  display: {
    desktop: {
      fontSize: scale(86), // ~5vw
      lineHeight: '1',
      letterSpacing: scale(-1.72),
      fontVariationSettings: "'SOFT' 0, 'WONK' 0.78",
    },
    mobile: {
      fontSize: scaleMobile(48),
      lineHeight: '1.1',
      letterSpacing: scaleMobile(-0.96),
    },
  },
  
  // H1 - Large section headers
  h1: {
    desktop: {
      fontSize: scale(128), // ~7.4vw
      lineHeight: '1',
      letterSpacing: scale(-6.4),
    },
    mobile: {
      fontSize: scaleMobile(48),
      lineHeight: '1',
      letterSpacing: scaleMobile(-2.4),
    },
  },
  
  // H2 - Section headers
  h2: {
    desktop: {
      fontSize: scale(64), // ~3.7vw
      lineHeight: '1.05',
      letterSpacing: scale(-1.28),
      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
    },
    mobile: {
      fontSize: scaleMobile(32),
      lineHeight: '1.05',
      letterSpacing: scaleMobile(-0.64),
    },
  },
  
  // H3 - Subsection headers
  h3: {
    desktop: {
      fontSize: scale(48), // ~2.78vw
      lineHeight: '1.05',
      letterSpacing: scale(-1.92),
      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
    },
    mobile: {
      fontSize: scaleMobile(32),
      lineHeight: '1.05',
      letterSpacing: scaleMobile(-0.96),
    },
  },
  
  // Body Large
  bodyLarge: {
    desktop: {
      fontSize: scale(36), // ~2.08vw
      lineHeight: '1.05',
      letterSpacing: scale(-0.36),
      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
    },
    mobile: {
      fontSize: scaleMobile(24),
      lineHeight: '1.25',
      letterSpacing: scaleMobile(-0.24),
    },
  },
  
  // Body
  body: {
    desktop: {
      fontSize: scale(20), // ~1.16vw
      lineHeight: '1.25',
      letterSpacing: scale(-0.2),
    },
    mobile: {
      fontSize: scaleMobile(18),
      lineHeight: '1.25',
      letterSpacing: scaleMobile(-0.18),
    },
  },
  
  // Small - Labels and metadata
  small: {
    desktop: {
      fontSize: scale(16),
      lineHeight: '1.25',
      letterSpacing: scale(-0.32),
    },
    mobile: {
      fontSize: scaleMobile(14),
      lineHeight: '1.25',
      letterSpacing: scaleMobile(-0.28),
    },
  },
  
  // Feature text - for numbered features
  feature: {
    desktop: {
      fontSize: scale(48), // ~2.78vw
      lineHeight: '1',
      letterSpacing: scale(-0.96),
    },
    mobile: {
      fontSize: scaleMobile(28),
      lineHeight: '1',
      letterSpacing: scaleMobile(-0.56),
    },
  },
}

/**
 * Spacing system
 */
export const spacing = {
  xs: scale(8),
  sm: scale(16),
  md: scale(24),
  lg: scale(32),
  xl: scale(48),
  xxl: scale(64),
  xxxl: scale(96),
}

/**
 * Color system
 */
export const colors = {
  primary: '#854dff',
  text: {
    primary: '#13121f',
    secondary: '#adacac',
    white: '#ffffff',
  },
  background: {
    white: '#ffffff',
    lightGray: '#eeeeee',
    lightGrayTransparent: 'rgba(238, 238, 238, 0.25)',
  },
}

