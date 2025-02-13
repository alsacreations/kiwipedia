# Cursor coding rules

You are an expert developer in HTML, JavaScript, Vue3, Nuxt and CSS, focusing on best practices, accessibility, ecodesign and responsive design.

- Treat me as an expert.
- Always write correct, up to date, bug free, fully functional and working, secure, performant and efficient code.
- Always provide modern and accessible HTML, CSS and JavaScript
- Prioritize accessibility by using semantic HTML and ARIA roles and attributes.
- If you think there might not be a correct answer, you say so. If you do not know the answer, say so instead of guessing.
- Be concise, minimize any other prose.

## HTML

- Write semantic HTML to improve accessibility and SEO.
- The language of the page is specified via `lang` attribute in the `html` element.
- Favicons images are provided in SVG format.
- Prefer `<header>`, `<article>`, `<main>`, `<footer>`, `<aside>`, `<section>`, and `<nav>` over `<div>` when appropriate.
- Use `<button>` for clickable elements, not `<div>` or `<span>`. Use `<a>` for links, ensuring `href` attribute is present.
- Choose English to name `class` or `id` on elements.

## CSS

- Use vanilla CSS with custom properties (no frameworks such as Tailwind, SCSS or Bootstrap).
- Always use CSS custom properties instead of raw values (e.g., `gap: var(--spacing-16)` instead of `gap: 1rem`).
- Use `class` selectors over `id` selectors for styling.
- Avoid `!important;` (use `:when()`, `@layer()` to manage specificity when necessary).
- Use `rem` for font sizes, spacings, gaps and media queries. Important: font sizes should never be defined in `px` units.
- Use `px` for elements dimensions (e.g. `width` and `height`).
- Use `dvh` for body's min-height (e.g. `min-height: 100dvh;`).

### CSS Nesting

- Use vanilla CSS nesting (with `&`) to reference the parent selector.
- Always use nesting for states (e.g. `&:hover, &:focus, &:active {/*rules*/}`)
- Always use nesting for media queries (e.g. `@media (width >= 48rem) {/*rules*/}`).
- States are nested the end of the rules concerning the element, separated by an empty line.
- Media queries are nested at the end of the rules concerning the element and its states, separated by an empty line.

### Modern CSS Rules

Always use modern CSS rules and selectors when possible:

- Always use modern media queries range syntax (e.g., `@media (width >= 48rem)` over `@media (min-width: 48rem)`).
- Always use modern CSS properties such as `min()`, `max()`, `clamp()` , `content-visibility`, `color-scheme`, `animation-timeline`, `@supports()`, `@container()`, `@layer()`, `scroll-behavior`, `scroll-margin`, `scroll-padding`, `shape-outside`, `will-change`, `contain`, `isolation`, `mask`, `clip-path`, `anchor-name`, `position-anchor`, etc. when possible.
- Use modern selectors when it is usefull, such as `:has()`, `:is()`, `:where()`,.

## Responsive Design

Always ensure responsive design using media queries and flexible layouts.

- Use Grid Layout and Flexbox for layout.
- Prefer Grid Layout over Flexbox when possible.
- Use mobile-first approach for media queries.

## Custom properties naming convention

Use these prefixes for CSS custom properties:

- Use `--color-` prefix for colors (e.g. `--color-gray-200: #AAAAAA`). Always define color value in uppercase hexadecimal.
- Use `--spacing-` prefix for spacings and gaps (e.g. `--spacing-16: 1rem`).
- Use `--font-` prefix for font families (e.g. `--font-sans`). Always define font family in lowercase.
- Use `--text-` prefix for font sizes (e.g. `--text-m`).
- Use `--font-weight-` prefix for font weights (e.g. `--font-weight-regular: 400`). Always define font weight in numeric value.
- Use `--leading-` prefix for line heights (e.g. `--leading-32: 2rem`).
- Use `--radius-` prefix for border-radius (e.g. `--radius-full: 9999px`)
- Use `--breakpoint-` prefix for breakpoints (e.g. `--breakpoint-sm`).

## Accessibility

- Use ARIA roles and attributes to enhance accessibility when necessary.
- Each page must include a first-level heading element `<h1>`, and the structure of other levels must follow a logical order (h1 to h6).
- Use landmarks (e.g., `<header>`, `<footer>`, `<nav>`, `<main>`, `<aside>`, `<section>`) for screen readers.
- Use `<img>` with `alt` attribute for images. Describe image only when necessary.
- Always provide keyboard navigation for interactive elements.
- Use focus styles to indicate focus state.
- Always provide focus trap on modal components.

## JavaScript

- Use modern JavaScript syntax and features.
- Validate the code with ESLint.
- Use `const` and `let` instead of `var`.
- Terminate instructions with a semicolon unless the project eslint configuration allows otherwise.
- Always comment (even briefly) the code, the functions, the variables (using `//` for short comments or `/* */` only when necessary for longer comments).
- Never leave a call to `console.log()` or `eval()` in the code in production.
- Encapsulate the sets of variables used by the same script in an object.
- Encapsulate the code in a function to avoid conflicts with other scripts (frameworks, plugins, etc.).
- Always write event handlers with `.on()` to make them easier to find in the code rather than using aliases.

## JavaScript accessibility

- Use ARIA properties/states for dynamic components:
  - Add/remove the `aria-hidden="true"` attribute for elements that should not be visible or rendered vocally. This can be styled with `.visually-hidden`.
  - Use the attributes `aria-selected`, `aria-checked`, `aria-expanded`, `aria-controls`, `aria-label` or `aria-labelledby` when appropriate.
  - Use `aria-live` for content areas that are updated in JavaScript and need to be announced.
  - Use roles for complex components (e.g. tabs with `tab`, `tabpanel`, `tablist`… accordions and various sliders).
- Check that the keyboard navigation by tabulations follows a logical path and is not captured by an element without the ability to exit it. Add in JavaScript `tabindex="-1"` on the elements that should no longer receive the focus (e.g. form items in a parent hidden by `.visually-hidden`).
- Use `tabindex` only if necessary to change the tabulation order.

## JavaScript naming convention

- Use `camelCase` for variables, functions, and object properties.
- Exploit the static HTML document as much as possible, using its `data-*` attributes, classes, or the order of elements to build a script around it, rather than relying solely on JavaScript or independent variables from the HTML structure.
- Place `data-*` attributes on elements for which they are useful, particularly on the plugin/component container.
- Differentiate classes that will allow styling the element (in CSS files) from classes that will allow activating specific JS behavior on the element (in JS files) by prefixing them with `js-`.
- Use the following classes to manage the element's state:
  - `.is-active` for an element that is always visible but can have an active/inactive state (e.g. menu item or submenu at focus/hover).
  - `.is-selected` for an element that is always visible but can have a selected/deselected state (e.g. button/radio block/checkbox).
  - `.is-opened` for an element that can have two states displayed or hidden (e.g. dropdown menu, accordion panel). Inverse possible : `.is-closed`.
- Use the project's CSS classes to hide/show elements, launch transitions, or change their state (e.g. `.visually-hidden` rather than `.hide` or `.sr-only`).

## Performance

- Minimize CSS and HTML file sizes.
- Specify the initial dimensions of the image (`width` and `height`) in the HTML so that the browser can calculate the aspect ratio and avoid layout shifts. If you don't know the dimensions, just say so.
- Use modern and lighter image formats (AVIF as a priority, WebP as an alternative).
- Always use SVG for vector images (optimised with SVGO: <https://jakearchibald.github.io/svgomg/>).
- Use lazy loading for images and other media (`loading="lazy"`).

## Transforms, transitions and animations

- Don't use `transform` property. Instead, prefer individual properties: use `rotate`, `translate` and `scale`.
- Trigger animations or transitions only if `@media (prefers-reduced-motion)` is set to `no-preference`.
- Avoid animating properties other than transforms (`translate`, `rotate`, `scale`) or `opacity` or `filter` (or add the `will-change` property on a case-by-case basis).
- Always specify which property or properties should be animated in a transition. For example, `transition: 0.5s scale`.

## Documentation

- Always comment in French.
- Always comment complex CSS rules, HTML structures, and JavaScript functions.
- Use consistent naming conventions for `classe`s and `id`s in CSS and HTML.
- Document responsive breakpoints and design decisions in the CSS file.
- Use JSDoc comments for all functions and components in JavaScript files.
- Keep README.md up-to-date with project setup and contribution guidelines.

## Commit messages

- Always use Conventional Commits (<https://www.conventionalcommits.org/>).
- Use French language in commit messages.
- Use the imperative mood in commit messages.
- Use the present tense ("Ajoute fonctionnalité" not "Ajout fonctionnalité").
- Always prefix commit titles with a type (in English): `feat`, `fix`, `perf`, `refactor`, `style`, `docs`, `chore` followed by the optional scope, and required terminal colon and space.
- Use the `feat` type for new features.
- Use the `fix` type for bug fixes.
- Use the `perf` type for performance improvements.
- Use the `refactor` type for code refactoring.
- Use the `style` type for code style changes.
- Use the `docs` type for documentation changes.
- Use the `chore` type for chores (e.g. updating dependencies, formatting files, etc.).
- A scope may be provided after a type. A scope must consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., `fix(parser):`.

## Testing

- Test HTML, CSS and JavaScript in multiple browsers and devices.
- Test pages in light and dark mode.
- Use tools like Lighthouse for performance and accessibility audits.
- Validate HTML and CSS using W3C validators.

## References

- Refer to MDN Web Docs for HTML, JavaScript and CSS best practices.
- Refer to the RGAA guidelines (french "Référentiel Général d'Amélioration de l'Accessibilité") for accessibility standards.
- Refer to the RGESN guidelines (french "Référentiel Général de l'Écoconception des Services Numériques") for ecodesign standards.
- Refer to Conventional Commits for commit messages.
