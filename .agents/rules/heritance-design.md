---
description: Heritance Design System — Always On
alwaysApply: true
---

# Heritance Design System

## Brand
- **Name**: Heritance
- **Tagline**: "Where businesses find their next chapter."
- **Aesthetic**: Premium European finance (Brex, Carta, Zurich private bank)

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary-navy` | `#0D1B2A` | Headers, dark elements |
| `--accent-navy` | `#1A3A5C` | Secondary headers |
| `--primary-gold` | `#B8960C` | CTA buttons, highlights |
| `--light-gold` | `#F0D060` | Hover states, badges |
| `--bg` | `#F7F9FC` | Page background |
| `--surface` | `#FFFFFF` | Cards, modals |
| `--border` | `#E2E8F0` | Borders |
| `--text` | `#1A202C` | Body text |
| `--muted` | `#64748B` | Secondary text |
| `--success` | `#166534` | Success states |
| `--warning` | `#92400E` | Warning states |

## Typography
| Role | Font | Usage |
|------|------|-------|
| Display | **Playfair Display** | Headings, hero titles |
| Body | **DM Sans** | Body text, UI labels |
| Mono | **JetBrains Mono** | Financial figures, %, EUR |

## Spacing
- Base unit: **4px**
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

## Border Radius
| Context | Value |
|---------|-------|
| Inputs, tables | `4px` |
| Cards | `8px` |
| Modals | `12px` |
| Badges, pills | `999px` |

## Shadows
```css
--shadow-sm: 0 1px 2px rgba(13, 27, 42, 0.05);
--shadow-md: 0 4px 12px rgba(13, 27, 42, 0.08);
--shadow-lg: 0 12px 40px rgba(13, 27, 42, 0.12);
```

## Rules
- All CTA buttons use `--primary-gold` background with `--primary-navy` text
- Financial figures (€, %) always use `font-mono` (JetBrains Mono)
- Headings use `font-display` (Playfair Display)
- All body text uses `font-sans` (DM Sans)
- Cards: white surface, `--border` border, `--shadow-md`
- Status badges: pill shape (999px radius)
