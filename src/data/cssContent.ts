export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CssSection {
  id: string;
  title: string;
  note: string;
  example: string;
  quizzes: Quiz[];
}

export const cssContent: CssSection[] = [
  {
    id: 'css-basics',
    title: 'CSS Basics',
    note: 'CSS (Cascading Style Sheets) styles HTML. Key concepts include Selectors (how to target elements), Specificity (which rule wins), Inheritance (properties passed to children), the Box Model (content, padding, border, margin), and Units (px, em, rem, %, vh, vw).',
    example: `/* Selector & Box Model */
.box {
  width: 100px; /* Content */
  padding: 20px; /* Inside space */
  border: 2px solid black; /* Outline */
  margin: 10px; /* Outside space */
}

/* Specificity: ID > Class > Element */
#unique { color: red; }
.text { color: blue; }
p { color: green; }`,
    quizzes: [
      { question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Colorful Style Sheets'], correctAnswer: 2 },
      { question: 'Which part of the box model is the outermost layer?', options: ['Padding', 'Margin', 'Border', 'Content'], correctAnswer: 1 },
      { question: 'Which selector has the highest specificity?', options: ['Class selector (.class)', 'Element selector (div)', 'ID selector (#id)', 'Universal selector (*)'], correctAnswer: 2 },
      { question: 'What does the "padding" property do?', options: ['Adds space outside the border', 'Adds space inside the border', 'Changes the element width', 'Adds a border'], correctAnswer: 1 },
      { question: 'Which unit is relative to the root element\'s font size?', options: ['em', 'px', 'rem', 'vh'], correctAnswer: 2 },
      { question: 'Which property prevents elements from inheriting styles?', options: ['all: unset', 'inherit: none', 'style: reset', 'cascade: stop'], correctAnswer: 0 },
      { question: 'If an element has width: 100px, padding: 10px, and border: 1px, what is its total width (box-sizing: content-box)?', options: ['100px', '120px', '122px', '111px'], correctAnswer: 2 },
      { question: 'Which property changes the box model so width includes padding and border?', options: ['box-sizing: border-box', 'box-model: border', 'sizing: include', 'width: total'], correctAnswer: 0 },
      { question: 'What does the "em" unit depend on?', options: ['Viewport width', 'Root font size', 'Parent element\'s font size', 'Screen resolution'], correctAnswer: 2 },
      { question: 'Which symbol targets all elements?', options: ['#', '.', '*', '&'], correctAnswer: 2 }
    ]
  },
  {
    id: 'typography',
    title: 'Typography',
    note: 'Typography controls text appearance. Key properties include font-family, font-size, font-weight, line-height (spacing between lines), letter-spacing, and text-align. Web fonts (like Google Fonts) can be imported via @import or <link>.',
    example: `@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

h1 {
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
}`,
    quizzes: [
      { question: 'Which property changes the font of an element?', options: ['font-style', 'font-family', 'font-weight', 'text-font'], correctAnswer: 1 },
      { question: 'How do you make text bold?', options: ['font-weight: bold', 'text-style: bold', 'font: bold', 'text-weight: bold'], correctAnswer: 0 },
      { question: 'Which property controls the space between lines of text?', options: ['spacing', 'line-height', 'text-spacing', 'line-spacing'], correctAnswer: 1 },
      { question: 'How do you center text horizontally?', options: ['align: center', 'text-align: center', 'vertical-align: middle', 'margin: auto'], correctAnswer: 1 },
      { question: 'Which property changes text to all uppercase?', options: ['text-transform: uppercase', 'font-case: upper', 'text-style: uppercase', 'transform: capitalize'], correctAnswer: 0 },
      { question: 'What does text-decoration: none do?', options: ['Removes italics', 'Removes bold', 'Removes underlines (e.g., from links)', 'Removes shadows'], correctAnswer: 2 },
      { question: 'Which property controls the space between characters?', options: ['word-spacing', 'letter-spacing', 'char-spacing', 'text-indent'], correctAnswer: 1 },
      { question: 'What is a fallback font?', options: ['A font used if the primary font fails to load', 'A default browser font', 'A font for older browsers', 'A font used for icons'], correctAnswer: 0 },
      { question: 'How do you italicize text?', options: ['font-style: italic', 'text-style: italic', 'font-weight: italic', 'transform: italic'], correctAnswer: 0 },
      { question: 'Which property indents the first line of a paragraph?', options: ['padding-left', 'margin-left', 'text-indent', 'line-indent'], correctAnswer: 2 }
    ]
  },
  {
    id: 'colors-backgrounds',
    title: 'Colors & Backgrounds',
    note: 'Colors can be defined using keywords, HEX (#ff0000), RGB/RGBA, or HSL/HSLA. Backgrounds can be solid colors, images, or gradients (linear/radial). Opacity controls the transparency of the entire element.',
    example: `.solid {
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.8); /* 80% opaque black */
}

.gradient {
  background: linear-gradient(to right, red, blue);
}

.image {
  background-image: url('bg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.5; /* 50% transparent */
}`,
    quizzes: [
      { question: 'Which format supports an alpha (transparency) channel?', options: ['HEX', 'RGB', 'RGBA', 'HSL'], correctAnswer: 2 },
      { question: 'How do you set a background image?', options: ['background: url(image.jpg)', 'bg-image: "image.jpg"', 'image: url(image.jpg)', 'background-src: image.jpg'], correctAnswer: 0 },
      { question: 'What does background-size: cover do?', options: ['Stretches the image to fit', 'Scales the image to cover the container, cropping if needed', 'Tiles the image', 'Fits the image inside without cropping'], correctAnswer: 1 },
      { question: 'Which property changes the text color?', options: ['text-color', 'font-color', 'color', 'fgcolor'], correctAnswer: 2 },
      { question: 'How do you create a linear gradient from top to bottom?', options: ['linear-gradient(red, blue)', 'gradient(top, red, blue)', 'linear-gradient(to bottom, red, blue)', 'background: gradient(red, blue)'], correctAnswer: 2 },
      { question: 'What is the HEX code for pure white?', options: ['#000000', '#ffffff', '#ff0000', '#111111'], correctAnswer: 1 },
      { question: 'What does opacity: 0 do?', options: ['Makes the element fully transparent', 'Makes the element fully opaque', 'Hides the element from screen readers', 'Removes the element from the DOM'], correctAnswer: 0 },
      { question: 'Which property repeats a background image?', options: ['background-repeat', 'repeat-bg', 'image-repeat', 'bg-tile'], correctAnswer: 0 },
      { question: 'How do you fix a background image so it doesn\'t scroll?', options: ['background-scroll: fixed', 'background-attachment: fixed', 'background-position: fixed', 'bg-fixed: true'], correctAnswer: 1 },
      { question: 'What does the "A" in HSLA stand for?', options: ['Amplitude', 'Alpha', 'Angle', 'Area'], correctAnswer: 1 }
    ]
  },
  {
    id: 'layout-techniques',
    title: 'Layout Techniques',
    note: 'Traditional layouts use the display property (block, inline, inline-block, none), floats (left/right), and positioning (static, relative, absolute, fixed, sticky). Z-index controls the stacking order of positioned elements.',
    example: `.relative-container {
  position: relative;
  z-index: 1;
}

.absolute-child {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10; /* Appears above container */
}

.sticky-nav {
  position: sticky;
  top: 0; /* Sticks to top when scrolling */
}`,
    quizzes: [
      { question: 'What is the default position value for HTML elements?', options: ['relative', 'absolute', 'static', 'fixed'], correctAnswer: 2 },
      { question: 'Which position value takes an element out of normal document flow and positions it relative to its closest positioned ancestor?', options: ['relative', 'absolute', 'fixed', 'sticky'], correctAnswer: 1 },
      { question: 'Which position value fixes an element relative to the viewport?', options: ['absolute', 'relative', 'sticky', 'fixed'], correctAnswer: 3 },
      { question: 'What does display: none do?', options: ['Hides the element but keeps its space', 'Removes the element from the document flow completely', 'Makes it transparent', 'Pushes it off-screen'], correctAnswer: 1 },
      { question: 'How is visibility: hidden different from display: none?', options: ['It takes up space in the layout', 'It removes the element from the DOM', 'It can be animated', 'There is no difference'], correctAnswer: 0 },
      { question: 'Which property clears floats?', options: ['clear', 'float-clear', 'display', 'position'], correctAnswer: 0 },
      { question: 'What does z-index control?', options: ['Zoom level', 'Stacking order (front to back)', 'Transparency', 'Font size'], correctAnswer: 1 },
      { question: 'Does z-index work on position: static elements?', options: ['Yes', 'No', 'Only on block elements', 'Only on inline elements'], correctAnswer: 1 },
      { question: 'Which display value allows setting width/height but stays inline?', options: ['inline', 'block', 'inline-block', 'flex'], correctAnswer: 2 },
      { question: 'Which position value toggles between relative and fixed depending on scroll position?', options: ['absolute', 'sticky', 'fixed', 'static'], correctAnswer: 1 }
    ]
  },
  {
    id: 'flexbox',
    title: 'Flexbox',
    note: 'Flexbox is a 1D layout model. The container uses display: flex. Key container properties: flex-direction, justify-content (main axis), align-items (cross axis). Item properties: flex-grow, flex-shrink, align-self, order.',
    example: `.container {
  display: flex;
  flex-direction: row; /* Default */
  justify-content: space-between; /* Main axis */
  align-items: center; /* Cross axis */
  flex-wrap: wrap;
}

.item {
  flex: 1; /* grow: 1, shrink: 1, basis: 0% */
  order: 2; /* Changes visual order */
}`,
    quizzes: [
      { question: 'How do you initialize a flexbox container?', options: ['display: flexbox', 'display: flex', 'flex: container', 'layout: flex'], correctAnswer: 1 },
      { question: 'Which property aligns items along the main axis?', options: ['align-items', 'justify-content', 'align-content', 'flex-align'], correctAnswer: 1 },
      { question: 'Which property aligns items along the cross axis?', options: ['justify-content', 'align-items', 'vertical-align', 'cross-align'], correctAnswer: 1 },
      { question: 'What is the default flex-direction?', options: ['column', 'row', 'row-reverse', 'column-reverse'], correctAnswer: 1 },
      { question: 'How do you allow flex items to wrap onto multiple lines?', options: ['flex-wrap: wrap', 'wrap: true', 'display: wrap', 'flex-flow: multi'], correctAnswer: 0 },
      { question: 'Which property allows a flex item to grow to fill available space?', options: ['flex-size', 'flex-grow', 'flex-fill', 'flex-expand'], correctAnswer: 1 },
      { question: 'What does justify-content: space-between do?', options: ['Centers items', 'Puts equal space around all items', 'Puts max space between items, pushing first/last to edges', 'Removes space between items'], correctAnswer: 2 },
      { question: 'Which property changes the visual order of a flex item?', options: ['index', 'z-index', 'order', 'sort'], correctAnswer: 2 },
      { question: 'What is the shorthand for flex-grow, flex-shrink, and flex-basis?', options: ['flex', 'flex-flow', 'flex-item', 'flex-size'], correctAnswer: 0 },
      { question: 'Which property overrides align-items for a single flex item?', options: ['justify-self', 'align-self', 'item-align', 'self-align'], correctAnswer: 1 }
    ]
  },
  {
    id: 'css-grid',
    title: 'CSS Grid',
    note: 'CSS Grid is a 2D layout model. Define columns/rows with grid-template-columns/rows. Place items using grid-column/row or grid-template-areas. The gap property adds space between tracks.',
    example: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: auto 100px;
  gap: 20px; /* Space between rows/cols */
}

.header {
  grid-column: 1 / -1; /* Spans all columns */
}

.sidebar {
  grid-column: 1 / 2;
}`,
    quizzes: [
      { question: 'How do you initialize a CSS Grid container?', options: ['display: grid', 'display: flex-grid', 'grid: true', 'layout: grid'], correctAnswer: 0 },
      { question: 'Which unit is specific to CSS Grid and represents a fraction of available space?', options: ['%', 'vw', 'fr', 'gr'], correctAnswer: 2 },
      { question: 'How do you create 3 columns of equal width?', options: ['grid-columns: 33% 33% 33%', 'grid-template-columns: 1fr 1fr 1fr', 'columns: 3', 'grid-cols: 3'], correctAnswer: 1 },
      { question: 'Which function repeats a grid track pattern?', options: ['loop()', 'repeat()', 'calc()', 'auto-fill()'], correctAnswer: 1 },
      { question: 'Which property adds space between grid items?', options: ['margin', 'padding', 'gap', 'spacing'], correctAnswer: 2 },
      { question: 'How do you make an item span from the first to the last column line?', options: ['grid-column: 1 / all', 'grid-column: 1 / -1', 'grid-column: span all', 'grid-column: 100%'], correctAnswer: 1 },
      { question: 'What does grid-template-areas do?', options: ['Defines named grid areas for layout', 'Calculates area size', 'Fills empty areas with color', 'None'], correctAnswer: 0 },
      { question: 'Which property places an item in a specific named area?', options: ['grid-area', 'grid-name', 'grid-place', 'area'], correctAnswer: 0 },
      { question: 'What is the difference between Grid and Flexbox?', options: ['Grid is 1D, Flexbox is 2D', 'Grid is 2D, Flexbox is 1D', 'Grid is only for text', 'Flexbox is older and deprecated'], correctAnswer: 1 },
      { question: 'What does auto-fit do in grid-template-columns?', options: ['Fits columns to text size', 'Creates as many columns as fit the container', 'Makes columns 100% width', 'None'], correctAnswer: 1 }
    ]
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    note: 'Responsive design ensures sites look good on all devices. Use the <meta name="viewport"> tag. Media queries (@media) apply CSS based on screen size. Mobile-first approach styles for small screens first, then uses min-width queries for larger screens.',
    example: `/* Mobile-first base styles */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}`,
    quizzes: [
      { question: 'Which rule applies styles based on device characteristics like width?', options: ['@responsive', '@media', '@screen', '@query'], correctAnswer: 1 },
      { question: 'What is the "Mobile-First" approach?', options: ['Writing CSS for desktop, then scaling down', 'Writing CSS for mobile, then scaling up using min-width', 'Only supporting mobile devices', 'Using inline styles'], correctAnswer: 1 },
      { question: 'Which meta tag is essential for responsive design?', options: ['<meta name="responsive">', '<meta name="viewport">', '<meta name="mobile">', '<meta name="screen">'], correctAnswer: 1 },
      { question: 'What does @media (max-width: 600px) mean?', options: ['Apply styles if screen is exactly 600px', 'Apply styles if screen is 600px or wider', 'Apply styles if screen is 600px or narrower', 'Apply styles to images max 600px wide'], correctAnswer: 2 },
      { question: 'Which unit is relative to the viewport width?', options: ['%', 'vw', 'vh', 'rem'], correctAnswer: 1 },
      { question: 'What makes an image fluid/responsive?', options: ['width: 100px', 'max-width: 100%; height: auto;', 'position: absolute', 'display: flex'], correctAnswer: 1 },
      { question: 'What is a breakpoint?', options: ['A bug in CSS', 'A point where the layout breaks', 'A specific screen width where media queries apply new styles', 'A tag to stop rendering'], correctAnswer: 2 },
      { question: 'Which unit is relative to the viewport height?', options: ['vw', 'vh', 'em', 'px'], correctAnswer: 1 },
      { question: 'How do you target screens in landscape orientation?', options: ['@media (orientation: landscape)', '@media (landscape: true)', '@media (width > height)', '@media (screen: landscape)'], correctAnswer: 0 },
      { question: 'What does the "fr" unit in Grid help with in responsive design?', options: ['Fixed sizing', 'Fluidly distributing available space', 'Font resizing', 'Frame rates'], correctAnswer: 1 }
    ]
  },
  {
    id: 'animations-transitions',
    title: 'Animations & Transitions',
    note: 'Transitions animate property changes smoothly (e.g., on hover). Animations use @keyframes for complex, multi-step sequences. Transforms (translate, scale, rotate) move/alter elements in 2D/3D space without affecting layout.',
    example: `/* Transition */
.btn {
  background: blue;
  transition: background 0.3s ease-in-out, transform 0.2s;
}
.btn:hover {
  background: red;
  transform: scale(1.1);
}

/* Animation */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.ball {
  animation: bounce 1s infinite;
}`,
    quizzes: [
      { question: 'Which property smoothly changes values over a specified duration?', options: ['animation', 'transform', 'transition', 'morph'], correctAnswer: 2 },
      { question: 'Which rule defines the steps of a CSS animation?', options: ['@steps', '@keyframes', '@animate', '@sequence'], correctAnswer: 1 },
      { question: 'Which transform function moves an element?', options: ['scale()', 'rotate()', 'translate()', 'move()'], correctAnswer: 2 },
      { question: 'What does transform: scale(2) do?', options: ['Doubles the element\'s size', 'Halves the element\'s size', 'Moves it 2px', 'Rotates it 2 degrees'], correctAnswer: 0 },
      { question: 'Which property specifies the speed curve of a transition?', options: ['transition-speed', 'transition-timing-function', 'transition-curve', 'transition-ease'], correctAnswer: 1 },
      { question: 'How do you make an animation run forever?', options: ['animation-iteration-count: infinite', 'animation-run: forever', 'animation-loop: true', 'animation-time: endless'], correctAnswer: 0 },
      { question: 'Which transform function rotates an element?', options: ['spin()', 'turn()', 'rotate()', 'circle()'], correctAnswer: 2 },
      { question: 'What does transform-origin do?', options: ['Sets the starting point of an animation', 'Sets the point around which a transform is applied', 'Resets transforms', 'None'], correctAnswer: 1 },
      { question: 'Which property is required for a transition to work?', options: ['transition-duration', 'transition-delay', 'transition-property', 'Both duration and property'], correctAnswer: 3 },
      { question: 'Can you animate display: none?', options: ['Yes', 'No', 'Only with keyframes', 'Only in WebKit'], correctAnswer: 1 }
    ]
  },
  {
    id: 'advanced-selectors',
    title: 'Advanced Selectors',
    note: 'Pseudo-classes state-based targeting (:hover, :focus, :nth-child). Pseudo-elements style specific parts (::before, ::after, ::first-line). Attribute selectors target elements based on attributes ([type="text"]).',
    example: `/* Pseudo-class */
li:nth-child(odd) { background: #eee; }
input:focus { border-color: blue; }

/* Pseudo-element */
h1::after {
  content: "★";
  color: gold;
}

/* Attribute Selector */
a[href^="https"] {
  color: green; /* Targets secure links */
}`,
    quizzes: [
      { question: 'Which pseudo-class targets an element when the mouse is over it?', options: [':active', ':focus', ':hover', ':visited'], correctAnswer: 2 },
      { question: 'Which pseudo-class targets an input field when clicked/selected?', options: [':active', ':focus', ':hover', ':target'], correctAnswer: 1 },
      { question: 'How do you select every other row in a table?', options: ['tr:even', 'tr:nth-child(even)', 'tr:alternate', 'tr:every(2)'], correctAnswer: 1 },
      { question: 'Which pseudo-element inserts content before an element?', options: ['::first', '::prepend', '::before', '::start'], correctAnswer: 2 },
      { question: 'What property is REQUIRED for ::before and ::after to work?', options: ['display', 'content', 'position', 'width'], correctAnswer: 1 },
      { question: 'How do you select an <a> tag with a specific target attribute?', options: ['a(target="_blank")', 'a[target="_blank"]', 'a:target="_blank"', 'a.target="_blank"'], correctAnswer: 1 },
      { question: 'Which selector targets the first letter of a paragraph?', options: ['p::first-letter', 'p:first', 'p::letter', 'p:start'], correctAnswer: 0 },
      { question: 'What does [class^="btn-"] select?', options: ['Classes ending with "btn-"', 'Classes containing "btn-"', 'Classes starting with "btn-"', 'Classes exactly "btn-"'], correctAnswer: 2 },
      { question: 'Which pseudo-class targets a visited link?', options: [':seen', ':clicked', ':past', ':visited'], correctAnswer: 3 },
      { question: 'What does the > combinator do (e.g., div > p)?', options: ['Selects all descendants', 'Selects direct children only', 'Selects siblings', 'Selects adjacent elements'], correctAnswer: 1 }
    ]
  },
  {
    id: 'css-variables',
    title: 'CSS Variables & Functions',
    note: 'Custom Properties (Variables) start with -- and are accessed via var(). They cascade and can be updated via JS. Functions like calc() perform math, while min(), max(), and clamp() provide fluid sizing.',
    example: `:root {
  --primary-color: #3498db;
  --spacing: 16px;
}

.box {
  background-color: var(--primary-color);
  /* Math in CSS */
  width: calc(100% - var(--spacing) * 2);
  /* Fluid typography: min, preferred, max */
  font-size: clamp(1rem, 2.5vw, 2rem);
}`,
    quizzes: [
      { question: 'How do you define a CSS variable?', options: ['$color: red;', '@color: red;', '--color: red;', 'var color = red;'], correctAnswer: 2 },
      { question: 'How do you use a CSS variable?', options: ['use(--color)', 'var(--color)', 'get(--color)', '$color'], correctAnswer: 1 },
      { question: 'Where are global CSS variables usually defined?', options: ['body', 'html', ':root', '*'], correctAnswer: 2 },
      { question: 'Which function allows mathematical calculations in CSS?', options: ['math()', 'calc()', 'compute()', 'eval()'], correctAnswer: 1 },
      { question: 'What does clamp(10px, 5vw, 50px) do?', options: ['Sets width to 5vw', 'Sets width to 10px or 50px', 'Allows value to scale with viewport, but restricts it between 10px and 50px', 'Adds 10px, 5vw, and 50px together'], correctAnswer: 2 },
      { question: 'Can CSS variables be changed using JavaScript?', options: ['Yes', 'No', 'Only in Chrome', 'Only if defined in inline styles'], correctAnswer: 0 },
      { question: 'What happens if a var() references an undefined variable?', options: ['It throws an error', 'It uses the fallback value (if provided) or inherits/initializes', 'It crashes the page', 'It defaults to black'], correctAnswer: 1 },
      { question: 'How do you provide a fallback value for a variable?', options: ['var(--color || blue)', 'var(--color, blue)', 'var(--color) fallback blue', 'fallback(--color, blue)'], correctAnswer: 1 },
      { question: 'What does max(50%, 300px) do?', options: ['Returns the smaller value', 'Returns the larger value', 'Adds them together', 'Averages them'], correctAnswer: 1 },
      { question: 'Are CSS variables case-sensitive?', options: ['Yes', 'No', 'Only the prefix', 'Only in strict mode'], correctAnswer: 0 }
    ]
  },
  {
    id: 'preprocessors-tooling',
    title: 'Preprocessors & Tooling',
    note: 'Preprocessors like SASS/SCSS add logic (variables, nesting, mixins) to CSS, compiling down to standard CSS. PostCSS uses JS plugins (like Autoprefixer) to transform CSS. CSS Modules scope CSS locally to components.',
    example: `/* SCSS Example */
$primary: #e74c3c;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  
  .header { // Nesting
    color: $primary;
    @include flex-center;
  }
}`,
    quizzes: [
      { question: 'What is SASS/SCSS?', options: ['A JavaScript framework', 'A CSS Preprocessor', 'A database', 'A browser'], correctAnswer: 1 },
      { question: 'How do you define a variable in SCSS?', options: ['--color: red;', '@color: red;', '$color: red;', 'var color = red;'], correctAnswer: 2 },
      { question: 'What feature allows you to write CSS rules inside other CSS rules in SCSS?', options: ['Nesting', 'Mixins', 'Variables', 'Functions'], correctAnswer: 0 },
      { question: 'What is a Mixin in SCSS?', options: ['A color palette', 'A reusable block of CSS declarations', 'A way to import fonts', 'A JavaScript function'], correctAnswer: 1 },
      { question: 'How do you apply a mixin in SCSS?', options: ['@apply', '@use', '@include', '@mixin'], correctAnswer: 2 },
      { question: 'What does Autoprefixer (a PostCSS plugin) do?', options: ['Minifies CSS', 'Adds vendor prefixes (like -webkit-) automatically', 'Converts SCSS to CSS', 'Removes unused CSS'], correctAnswer: 1 },
      { question: 'What problem do CSS Modules solve?', options: ['Slow loading times', 'Global scope conflicts (class name collisions)', 'Missing vendor prefixes', 'Lack of variables'], correctAnswer: 1 },
      { question: 'Can browsers read SCSS files directly?', options: ['Yes', 'No, they must be compiled to CSS', 'Only Chrome', 'Only if linked as type="text/scss"'], correctAnswer: 1 },
      { question: 'Which symbol is used to reference the parent selector in SCSS nesting?', options: ['&', '$', '@', '#'], correctAnswer: 0 },
      { question: 'What does PostCSS use to transform CSS?', options: ['Ruby', 'Python', 'JavaScript plugins', 'PHP'], correctAnswer: 2 }
    ]
  },
  {
    id: 'architecture',
    title: 'Architecture & Methodology',
    note: 'Methodologies organize CSS for scalability. BEM (Block Element Modifier) uses strict naming conventions (.block__element--modifier). Utility-first (like Tailwind CSS) uses small, single-purpose classes directly in HTML.',
    example: `/* BEM Example */
.button { /* Block */
  padding: 10px 20px;
}
.button__icon { /* Element */
  margin-right: 5px;
}
.button--primary { /* Modifier */
  background: blue;
  color: white;
}

<!-- Tailwind/Utility Example -->
<button class="px-4 py-2 bg-blue-500 text-white rounded">
  Click Me
</button>`,
    quizzes: [
      { question: 'What does BEM stand for?', options: ['Basic Element Modifier', 'Block Element Modifier', 'Box Element Margin', 'Base Element Module'], correctAnswer: 1 },
      { question: 'In BEM, how is an Element separated from a Block?', options: ['Single dash (-)', 'Double dash (--)', 'Single underscore (_)', 'Double underscore (__)'], correctAnswer: 3 },
      { question: 'In BEM, how is a Modifier separated from a Block or Element?', options: ['Single dash (-)', 'Double dash (--)', 'Single underscore (_)', 'Double underscore (__)'], correctAnswer: 1 },
      { question: 'What is the main goal of BEM?', options: ['To make CSS file sizes smaller', 'To create modular, reusable, and predictable CSS', 'To avoid using classes', 'To replace JavaScript'], correctAnswer: 1 },
      { question: 'Which framework is famous for the Utility-first approach?', options: ['Bootstrap', 'Foundation', 'Tailwind CSS', 'Bulma'], correctAnswer: 2 },
      { question: 'What is a characteristic of Utility-first CSS?', options: ['Writing complex custom classes', 'Using many small, single-purpose classes in HTML', 'Heavy use of ID selectors', 'Deep nesting in CSS files'], correctAnswer: 1 },
      { question: 'What does OOCSS stand for?', options: ['Object Oriented CSS', 'Out Of Context CSS', 'Only One CSS', 'Overly Organized CSS'], correctAnswer: 0 },
      { question: 'Which BEM class represents a "Modifier"?', options: ['.card', '.card__title', '.card--dark', '.card-container'], correctAnswer: 2 },
      { question: 'Why might someone prefer Utility-first CSS?', options: ['It requires no HTML changes', 'It stops you from having to invent class names and context-switching', 'It uses less HTML', 'It is the only way to do responsive design'], correctAnswer: 1 },
      { question: 'In BEM, what is a "Block"?', options: ['A standalone entity that is meaningful on its own', 'A part of a block that has no standalone meaning', 'A flag on a block or element', 'A CSS comment'], correctAnswer: 0 }
    ]
  }
];
