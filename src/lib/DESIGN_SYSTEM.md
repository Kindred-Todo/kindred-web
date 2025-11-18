# Kindred Design System

## Overview
This design system is based on a **7-column grid layout** designed at **1728px viewport width** (MacBook Pro 16"). All measurements scale proportionally across different screen sizes.

## Grid System

### Specifications
- **Base Width**: 1728px
- **Columns**: 7
- **Margins**: 48px (left and right)
- **Column Width**: 233.14px
- **Gap**: 24px between columns

### Usage

```typescript
import { scale, columns, columnStart } from '@/lib/design-system'

// Scale any pixel value from Figma
style={{ width: scale(500) }} // Converts to vw

// Position element starting at column N (1-indexed)
style={{ marginLeft: columnStart(3) }} // Start at column 3

// Span N columns (includes gaps by default)
style={{ width: columns(4) }} // Span 4 columns

// Span N columns without gaps
style={{ width: columns(4, false) }}
```

### Grid Column Reference
```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  6  │  7  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
 48px                                    48px
 ↑ margin                          margin ↑
```

## Typography System

All typography is defined with responsive scaling:

### Display (Hero Headlines)
```typescript
import { typography } from '@/lib/design-system'

<h1 style={typography.display.desktop}>
  Hero Text
</h1>
```

- **Desktop**: ~5vw (86px at 1728px)
- **Mobile**: 48px

### Available Text Styles
- `typography.display` - Hero headlines
- `typography.h1` - Large section headers (128px → 7.4vw)
- `typography.h2` - Section headers (64px → 3.7vw)
- `typography.h3` - Subsection headers (48px → 2.78vw)
- `typography.bodyLarge` - Large body text (36px → 2.08vw)
- `typography.body` - Standard body text (20px → 1.16vw)
- `typography.small` - Labels and metadata (16px)
- `typography.feature` - Numbered features (48px → 2.78vw)

Each style includes:
- `fontSize`
- `lineHeight`
- `letterSpacing`
- `fontVariationSettings` (where applicable for Fraunces font)

### Font Variation Settings
Fraunces font uses custom axes:
- `SOFT`: Softness (0-100)
- `WONK`: Wonkiness (0-1)
- `opsz`: Optical size (9-144)

## Spacing System

```typescript
import { spacing } from '@/lib/design-system'

style={{ 
  padding: spacing.md,    // 24px scaled
  marginTop: spacing.xl   // 48px scaled
}}
```

Available sizes:
- `xs`: 8px
- `sm`: 16px
- `md`: 24px
- `lg`: 32px
- `xl`: 48px
- `xxl`: 64px
- `xxxl`: 96px

## Color System

```typescript
import { colors } from '@/lib/design-system'

style={{ 
  color: colors.primary,           // #854dff
  backgroundColor: colors.text.primary  // #13121f
}}
```

### Available Colors
- **Primary**: `#854dff` (purple)
- **Text**:
  - `primary`: `#13121f` (near black)
  - `secondary`: `#adacac` (gray)
  - `white`: `#ffffff`
- **Background**:
  - `white`: `#ffffff`
  - `lightGray`: `#eeeeee`
  - `lightGrayTransparent`: `rgba(238, 238, 238, 0.25)`

## Component Architecture

### Section Components
Each major section is its own component in `src/pages/landing/sections/`:
- `HeroSection.tsx`
- `WhatsDealSection.tsx`
- `VideoSection.tsx`
- `ProductivityRewardingSection.tsx`
- `ScienceSection.tsx`
- `EmpowerSection.tsx`
- `PlatformFeaturesSection.tsx`
- `BackgroundShapes.tsx`

### Grid Alignment Principles
1. **Content starts at column 1** (after left margin)
2. **Main content typically spans 4-5 columns**
3. **Side content starts at column 5-6**
4. **Full-width elements still respect margins**

### Example Section Structure
```typescript
export function MySection() {
  return (
    <section className="relative px-4 md:px-0" style={{ marginTop: scale(500) }}>
      <div style={{ marginLeft: columnStart(1), maxWidth: columns(5) }}>
        <h2 style={typography.h2.desktop}>Section Title</h2>
        <p style={typography.body.desktop}>Body text</p>
      </div>
    </section>
  )
}
```

## Mobile Responsiveness

- Grid system is hidden on mobile (`md:` breakpoint at 768px)
- Mobile uses padding-based layout with `px-4`
- Typography scales down to mobile sizes automatically
- Background shapes have separate mobile variants

## Best Practices

1. **Always use the scale() function** for Figma pixel values
2. **Align content with grid columns** using `columnStart()`
3. **Use typography system** instead of inline font sizes
4. **Keep sections in separate components** for maintainability
5. **Test at multiple viewport sizes** to ensure proper scaling
6. **Use spacing constants** for consistency

## Development Workflow

1. Get measurements from Figma (at 1728px width)
2. Use `scale()` to convert px values
3. Align elements using `columnStart()` and `columns()`
4. Apply typography styles from the system
5. Test responsive behavior

## Debugging Tips

- Add background colors temporarily to visualize grid columns
- Check that `columnStart()` values match Figma layer positions
- Verify `columns()` spans match Figma width
- Use browser dev tools to inspect vw calculations

