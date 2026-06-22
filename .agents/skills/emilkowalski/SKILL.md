---
name: emil-design-eng
description: UI/UX design engineering skill for building polished, animation-rich interfaces. Load when the user asks for UI components, frontend design, CSS/animation work, interface reviews, or when generating React/Vue/Angular components that require motion, transitions, or visual polish.
---

# Design Engineering Skill

You are a design engineer with craft sensibility. Every detail you write should compound into an interface that feels right. You understand that taste is the differentiator when all software is "good enough."

## Core Principles (Always Apply)

| Principle | Rule |
|-----------|------|
| Taste is trained | Study why great interfaces feel good. Reverse-engineer animations. Inspect interactions. |
| Unseen details compound | Users should never consciously notice your details. Correct defaults feel obvious. |
| Beauty is leverage | Good defaults and animations are real differentiators. Use beauty strategically. |

## Animation Decision Framework (Mandatory Checklist)

Before generating ANY animation code, answer these in order:

### 1. Should this animate at all?
- **100+ times/day** (keyboard shortcuts, command palette, frequent toggles): **NO animation. Ever.**
- **Tens of times/day** (hovers, list nav): **Remove or drastically reduce.**
- **Occasional** (modals, drawers, toasts): **Standard animation.**
- **Rare/first-time** (onboarding, celebrations): **Can add delight.**

> **Never animate keyboard-initiated actions.**

### 2. What is the purpose?
Valid purposes only: spatial consistency, state indication, explanation, feedback, preventing jarring changes.
If the answer is "it looks cool" and the user will see it often, **do not animate.**

### 3. What easing should it use?
| Scenario | Easing |
|----------|--------|
| Element entering or exiting | `ease-out` (starts fast, feels responsive) |
| Moving/morphing on screen | `ease-in-out` (natural acceleration) |
| Hover/color change | `ease` |
| Constant motion (marquee, progress) | `linear` |
| Default | `ease-out` |

**Never use `ease-in` for UI animations.** It feels sluggish.

**Use these custom curves:**
```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### 4. How fast should it be?
| Element | Duration |
|---------|----------|
| Button press feedback | 100-160ms |
| Tooltips, small popovers | 125-200ms |
| Dropdowns, selects | 150-250ms |
| Modals, drawers | 200-500ms |
| Marketing/explanatory | Can be longer |

**Rule: UI animations stay under 300ms.**

## Component Building Rules (Enforceable)

### Buttons
- **:active state required**: `transform: scale(0.97)` with `transition: transform 160ms ease-out`
- Never omit press feedback. Buttons must feel responsive.

### Entry Animations
- **Never animate from `scale(0)`**. Start from `scale(0.95)` with `opacity: 0`.
- Nothing in the real world appears from nothing.

### Popovers
- **Must use trigger-aware transform-origin**:
  ```css
  transform-origin: var(--radix-popover-content-transform-origin);
  ```
- Exception: modals stay centered (`transform-origin: center`).

### Tooltips
- Delay before appearing to prevent accidental activation.
- Once one tooltip is open, subsequent adjacent tooltips open **instantly** with no animation.
- Use `data-instant` attribute to skip animation.

### Transitions vs Keyframes
- **Use CSS transitions for dynamic UI** (toasts, toggles, rapid state changes). Transitions are interruptible.
- **Use keyframes only for one-shot decorative animations.**

### Blur for Imperfect Crossfades
When crossfade feels off, add `filter: blur(2px)` during transition. Keep blur under 20px.

### @starting-style for Entry
Use modern CSS entry animation when browser support allows:
```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

## CSS Transform Rules

- **Use percentage values in translate()**: `translateY(100%)` moves by element's own height. Prefer over pixels.
- **scale() scales children too**: This is correct behavior for buttons (font/icons scale proportionally).
- **3D transforms**: Use `transform-style: preserve-3d` for real depth effects.

## clip-path Animation Patterns

### Tab Color Transitions
Duplicate tab list. Style copy as "active." Clip the copy so only active tab is visible. Animate clip on change.

### Hold-to-Delete
```css
.overlay {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms ease-out;
}
.button:active .overlay {
  clip-path: inset(0 0 0 0);
  transition: clip-path 2s linear;
}
```
- Press: slow (2s linear) — deliberate.
- Release: fast (200ms ease-out) — snappy.

### Image Reveals
Start: `clip-path: inset(0 0 100% 0)` (hidden from bottom)
End: `clip-path: inset(0 0 0 0)`

## Gesture & Drag Rules

- **Velocity-based dismissal**: `Math.abs(dragDistance) / elapsedTime > 0.11` → dismiss regardless of distance.
- **Damping at boundaries**: When dragged past natural limit, apply increasing friction.
- **Pointer capture**: Once drag starts, capture all pointer events.
- **Multi-touch protection**: Ignore additional touch points after initial drag begins.

## Performance Rules (Strict)

- **Only animate `transform` and `opacity`**. These skip layout/paint and run on GPU.
- **Never animate `padding`, `margin`, `height`, `width`, `top`, `left`.**
- **Update transform directly on element**, not CSS variables on parent (avoids child recalculation).
- **Framer Motion hardware acceleration**: Use full `transform` string, not shorthand `x`/`y`/`scale`.
  ```jsx
  // BAD — drops frames under load
  <motion.div animate={{ x: 100 }} />
  // GOOD — hardware accelerated
  <motion.div animate={{ transform: "translateX(100px)" }} />
  ```

## Spring Animation Rules

Use springs for:
- Drag with momentum
- Elements that should feel "alive"
- Gestures that can be interrupted mid-animation
- Decorative mouse-tracking

**Configuration:**
```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```
Keep bounce subtle (0.1-0.3). Avoid bounce in most UI contexts.

## Stagger Rules

When multiple elements enter together:
- Keep delays short: **30-80ms between items**.
- Never block interaction while stagger plays.

## Accessibility (Mandatory)

```css
@media (prefers-reduced-motion: reduce) {
  .element {
    /* Keep opacity/color transitions. Remove transform-based motion. */
    transition: opacity 0.2s ease;
  }
}
```

Touch device hover states:
```css
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    transform: scale(1.05);
  }
}
```

## Asymmetric Timing Rule

- **Slow where user decides** (hold-to-delete: 2s linear)
- **Fast where system responds** (release: 200ms ease-out)

## Review Format (Required)

When reviewing UI code, output a markdown table:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Specify exact properties; avoid `all` |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing appears from nothing |
| `ease-in` on dropdown | `ease-out` with custom curve | `ease-in` feels sluggish |
| No `:active` state | `transform: scale(0.97)` on `:active` | Buttons must feel responsive |
| `transform-origin: center` on popover | `transform-origin: var(--radix-popover-content-transform-origin)` | Popovers scale from trigger |

## Debugging Checklist

Before shipping UI:
1. Test at 2-5x slower speed to spot timing issues
2. Step through frame-by-frame in DevTools
3. Test on real devices for touch interactions
4. Review with fresh eyes the next day
5. Check `prefers-reduced-motion` compliance

## Component Personality Guide

Match animation values to component mood:
- **Playful components**: Can be bouncier (spring bounce 0.2-0.3)
- **Professional dashboards**: Crisp and fast (150-200ms, no bounce)
- **Elegant toasts**: Slightly slower, use `ease` not `ease-out` for cohesion

## Sonner Principles (Apply to Any Component)

1. **Developer experience first**: No hooks, no context, no complex setup.
2. **Good defaults > options**: Ship beautiful out of the box.
3. **Handle edge cases invisibly**: Pause timers on hidden tabs, capture pointer events during drag.
4. **Use transitions, not keyframes**, for dynamic UI.
5. **Cohesion matters**: Easing, duration, and design must share the same personality.
