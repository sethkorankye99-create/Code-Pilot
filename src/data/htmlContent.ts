export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Challenge {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
}

export interface HtmlSection {
  id: string;
  title: string;
  note: string;
  example: string;
  quizzes: Quiz[];
  challenge?: Challenge;
}

export const htmlContent: HtmlSection[] = [
  {
    id: 'basic-syntax',
    title: 'Basic Syntax & Document Structure',
    note: 'Every HTML document must start with a <!DOCTYPE html> declaration to inform the browser that it is an HTML5 document. The <html> element is the root, containing <head> (metadata) and <body> (visible content).',
    example: `<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`,
    quizzes: [
      { question: 'What does <!DOCTYPE html> do?', options: ['Defines the root element', 'Informs the browser it is an HTML5 document', 'Adds a title to the page', 'Links a CSS file'], correctAnswer: 1 },
      { question: 'Which tag is the root of an HTML page?', options: ['<body>', '<head>', '<html>', '<main>'], correctAnswer: 2 },
      { question: 'Where does metadata like the page title go?', options: ['<body>', '<head>', '<footer>', '<section>'], correctAnswer: 1 },
      { question: 'Which tag contains the visible content of a web page?', options: ['<head>', '<html>', '<body>', '<meta>'], correctAnswer: 2 },
      { question: 'Is HTML case-sensitive for tags?', options: ['Yes', 'No', 'Only for some tags', 'Only in strict mode'], correctAnswer: 1 },
      { question: 'What is the correct sequence of tags?', options: ['html > body > head', 'html > head > body', 'head > html > body', 'body > head > html'], correctAnswer: 1 },
      { question: 'Which tag is used to define the title of the document?', options: ['<meta>', '<header>', '<title>', '<h1>'], correctAnswer: 2 },
      { question: 'What character is used to indicate an end tag?', options: ['*', '/', '<', '^'], correctAnswer: 1 },
      { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Tabular Markup Language', 'None of the above'], correctAnswer: 0 },
      { question: 'Which element is used to specify the character encoding?', options: ['<title>', '<meta>', '<link>', '<script>'], correctAnswer: 1 }
    ],
    challenge: {
      title: "Create a Heading",
      description: "Create an <h1> tag with the text 'My First Website' and a <p> tag below it with the text 'Learning HTML is fun!'.",
      initialCode: "<!-- Write your HTML here -->\n",
      solution: "<h1>My First Website</h1>\n<p>Learning HTML is fun!</p>"
    }
  },
  {
    id: 'text-formatting',
    title: 'Text Formatting',
    note: 'HTML provides tags to structure and style text. Headings (h1-h6) define hierarchy, <p> defines paragraphs, <strong> makes text bold (important), and <em> adds emphasis (italics). <br> is for line breaks and <hr> for horizontal rules.',
    example: `<h1>Main Heading</h1>
<p>This is a <strong>bold</strong> word and an <em>italic</em> one.</p>
<br>
<hr>`,
    quizzes: [
      { question: 'Which tag defines the most important heading?', options: ['<h6>', '<h1>', '<head>', '<header>'], correctAnswer: 1 },
      { question: 'How do you create a line break?', options: ['<lb>', '<break>', '<br>', '<hr>'], correctAnswer: 2 },
      { question: 'Which tag is used for important text (usually bold)?', options: ['<bold>', '<i>', '<strong>', '<em>'], correctAnswer: 2 },
      { question: 'Which tag is used for emphasized text (usually italics)?', options: ['<em>', '<i>', '<italic>', '<strong>'], correctAnswer: 0 },
      { question: 'What does the <hr> tag do?', options: ['High Resolution', 'Horizontal Rule', 'Header Row', 'None'], correctAnswer: 1 },
      { question: 'Which heading tag is the smallest?', options: ['<h1>', '<h3>', '<h6>', '<h10>'], correctAnswer: 2 },
      { question: 'Which tag is used to define a paragraph?', options: ['<para>', '<p>', '<text>', '<div>'], correctAnswer: 1 },
      { question: 'How do you display text exactly as written (preserving spaces)?', options: ['<code>', '<pre>', '<text>', '<fixed>'], correctAnswer: 1 },
      { question: 'Which tag is used for a short quotation?', options: ['<blockquote>', '<q>', '<cite>', '<quote>'], correctAnswer: 1 },
      { question: 'Which tag is used for subscript text?', options: ['<sup>', '<sub>', '<small>', '<down>'], correctAnswer: 1 }
    ]
  },
  {
    id: 'lists',
    title: 'Lists',
    note: 'Ordered lists (<ol>) use numbers, unordered lists (<ul>) use bullets. Both use <li> for items. Description lists (<dl>) use <dt> for terms and <dd> for descriptions.',
    example: `<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<ol>
  <li>First</li>
  <li>Second</li>
</ol>`,
    quizzes: [
      { question: 'Which tag starts an unordered list?', options: ['<ol>', '<ul>', '<li>', '<list>'], correctAnswer: 1 },
      { question: 'Which tag starts an ordered list?', options: ['<ul>', '<ol>', '<dl>', '<li>'], correctAnswer: 1 },
      { question: 'What tag is used for each item in a list?', options: ['<item>', '<li>', '<ul>', '<ol>'], correctAnswer: 1 },
      { question: 'Which tag defines a description term?', options: ['<dd>', '<dt>', '<dl>', '<desc>'], correctAnswer: 1 },
      { question: 'Which tag defines a description list?', options: ['<ol>', '<ul>', '<dl>', '<list>'], correctAnswer: 2 },
      { question: 'Can you nest a list inside another list?', options: ['Yes', 'No', 'Only in HTML4', 'Only ordered lists'], correctAnswer: 0 },
      { question: 'Which attribute changes the bullet style in <ul> (deprecated)?', options: ['style', 'type', 'bullet', 'list-style'], correctAnswer: 1 },
      { question: 'Which attribute starts an ordered list from a specific number?', options: ['begin', 'start', 'value', 'index'], correctAnswer: 1 },
      { question: 'What is the default marker for <ul>?', options: ['Square', 'Circle', 'Disc', 'None'], correctAnswer: 2 },
      { question: 'What is the default marker for <ol>?', options: ['Letters', 'Roman Numerals', 'Numbers', 'Bullets'], correctAnswer: 2 }
    ]
  },
  {
    id: 'links-navigation',
    title: 'Links & Navigation',
    note: 'The <a> (anchor) tag creates links. The href attribute specifies the destination. Absolute paths point to full URLs, while relative paths point to files within the same site. The target="_blank" attribute opens links in a new tab.',
    example: `<a href="https://google.com" target="_blank">Google</a>
<a href="about.html">About Us</a>`,
    quizzes: [
      { question: 'Which attribute is required for a link to work?', options: ['src', 'href', 'link', 'to'], correctAnswer: 1 },
      { question: 'How do you open a link in a new tab?', options: ['target="_new"', 'target="_blank"', 'target="tab"', 'target="_parent"'], correctAnswer: 1 },
      { question: 'What is an absolute path?', options: ['A path relative to the current file', 'A full URL starting with http/https', 'A path starting from the root /', 'None'], correctAnswer: 1 },
      { question: 'Which tag is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correctAnswer: 1 },
      { question: 'How do you link to an email address?', options: ['href="email:..."', 'href="mailto:..."', 'href="send:..."', 'href="contact:..."'], correctAnswer: 1 },
      { question: 'What does href stand for?', options: ['Hyperlink Reference', 'Home Reference', 'Hypertext Resource', 'None'], correctAnswer: 0 },
      { question: 'How do you link to a specific ID on a page?', options: ['href="id"', 'href="#id"', 'href=".id"', 'href="@id"'], correctAnswer: 1 },
      { question: 'Which tag is used to link external CSS?', options: ['<a>', '<link>', '<style>', '<script>'], correctAnswer: 1 },
      { question: 'What is the default color of an unvisited link?', options: ['Purple', 'Blue', 'Red', 'Green'], correctAnswer: 1 },
      { question: 'What is the default color of a visited link?', options: ['Blue', 'Purple', 'Red', 'Black'], correctAnswer: 1 }
    ]
  },
  {
    id: 'images-multimedia',
    title: 'Images & Multimedia',
    note: 'Use <img> for images (requires src and alt). <figure> and <figcaption> are for captioned images. <audio> and <video> tags embed media, often using <source> for multiple formats.',
    example: `<img src="logo.png" alt="Company Logo">
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>`,
    quizzes: [
      { question: 'Which attribute provides alternative text for an image?', options: ['title', 'alt', 'desc', 'src'], correctAnswer: 1 },
      { question: 'Which tag is used to embed a video?', options: ['<media>', '<movie>', '<video>', '<embed>'], correctAnswer: 2 },
      { question: 'What attribute adds play/pause buttons to a video?', options: ['buttons', 'controls', 'play', 'interface'], correctAnswer: 1 },
      { question: 'Which tag is used for a captioned image?', options: ['<image>', '<picture>', '<figure>', '<div>'], correctAnswer: 2 },
      { question: 'Which tag defines multiple media resources?', options: ['<resource>', '<source>', '<link>', '<file>'], correctAnswer: 1 },
      { question: 'Is the <img> tag self-closing?', options: ['Yes', 'No', 'Only in XHTML', 'Only in HTML4'], correctAnswer: 0 },
      { question: 'Which attribute specifies the image path?', options: ['href', 'link', 'src', 'url'], correctAnswer: 2 },
      { question: 'Which tag is used for audio files?', options: ['<sound>', '<music>', '<audio>', '<voice>'], correctAnswer: 2 },
      { question: 'What does the poster attribute do in <video>?', options: ['Sets a background color', 'Shows an image before the video plays', 'Adds a watermark', 'None'], correctAnswer: 1 },
      { question: 'Which attribute makes a video play automatically?', options: ['start', 'autoplay', 'loop', 'muted'], correctAnswer: 1 }
    ]
  },
  {
    id: 'tables',
    title: 'Tables',
    note: 'Tables are built with <table>. <tr> defines a row, <th> a header cell, and <td> a data cell. Use <thead>, <tbody>, and <tfoot> for better structure.',
    example: `<table>
  <thead>
    <tr><th>Name</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td><td>25</td></tr>
  </tbody>
</table>`,
    quizzes: [
      { question: 'Which tag defines a table row?', options: ['<td>', '<th>', '<tr>', '<row>'], correctAnswer: 2 },
      { question: 'Which tag defines a table header cell?', options: ['<head>', '<th>', '<td>', '<header>'], correctAnswer: 1 },
      { question: 'Which tag defines a standard table data cell?', options: ['<td>', '<tr>', '<th>', '<cell>'], correctAnswer: 0 },
      { question: 'Which tag groups the header content in a table?', options: ['<header>', '<thead>', '<tmain>', '<tfoot>'], correctAnswer: 1 },
      { question: 'How do you make a cell span multiple columns?', options: ['rowspan', 'colspan', 'span', 'width'], correctAnswer: 1 },
      { question: 'How do you make a cell span multiple rows?', options: ['colspan', 'rowspan', 'span', 'height'], correctAnswer: 1 },
      { question: 'Which tag is used for the table footer?', options: ['<foot>', '<tfoot>', '<bottom>', '<tfooter>'], correctAnswer: 1 },
      { question: 'Which attribute adds a border to a table (deprecated)?', options: ['style', 'border', 'outline', 'frame'], correctAnswer: 1 },
      { question: 'Which tag defines a table caption?', options: ['<title>', '<label>', '<caption>', '<summary>'], correctAnswer: 2 },
      { question: 'What is the default alignment of <th> text?', options: ['Left', 'Right', 'Center', 'Justify'], correctAnswer: 2 }
    ]
  },
  {
    id: 'forms-input',
    title: 'Forms & Input',
    note: 'Forms (<form>) collect user data. <input> has many types (text, password, checkbox, radio). <label> improves accessibility. <select> creates dropdowns and <textarea> for multi-line text.',
    example: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" required>
  <button type="submit">Submit</button>
</form>`,
    quizzes: [
      { question: 'Which input type is used for passwords?', options: ['text', 'secret', 'password', 'hidden'], correctAnswer: 2 },
      { question: 'Which tag is used for a multi-line text input?', options: ['<input type="text">', '<textarea>', '<text>', '<box>'], correctAnswer: 1 },
      { question: 'Which attribute makes an input field mandatory?', options: ['mandatory', 'required', 'validate', 'check'], correctAnswer: 1 },
      { question: 'Which tag creates a dropdown list?', options: ['<dropdown>', '<list>', '<select>', '<input type="list">'], correctAnswer: 2 },
      { question: 'Which attribute links a <label> to an <input>?', options: ['id', 'name', 'for', 'link'], correctAnswer: 2 },
      { question: 'Which input type allows selecting only one option from a group?', options: ['checkbox', 'radio', 'select', 'button'], correctAnswer: 1 },
      { question: 'Which input type allows selecting multiple options?', options: ['radio', 'checkbox', 'toggle', 'multi'], correctAnswer: 1 },
      { question: 'What does the action attribute in <form> do?', options: ['Defines the HTTP method', 'Specifies where to send form data', 'Validates the form', 'None'], correctAnswer: 1 },
      { question: 'What does the method attribute in <form> specify?', options: ['GET or POST', 'Action URL', 'Input types', 'Validation rules'], correctAnswer: 0 },
      { question: 'Which tag defines a button inside a form?', options: ['<input type="btn">', '<button>', '<clickable>', '<submit>'], correctAnswer: 1 }
    ]
  },
  {
    id: 'semantic-html',
    title: 'Semantic HTML',
    note: 'Semantic tags describe their meaning to both the browser and the developer. Examples include <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>.',
    example: `<header>
  <nav>Links</nav>
</header>
<main>
  <article>Content</article>
</main>
<footer>Copyright</footer>`,
    quizzes: [
      { question: 'Which tag is best for the main navigation links?', options: ['<menu>', '<nav>', '<links>', '<header>'], correctAnswer: 1 },
      { question: 'Which tag represents independent, self-contained content?', options: ['<section>', '<article>', '<div>', '<aside>'], correctAnswer: 1 },
      { question: 'Which tag is used for content tangentially related to the main content?', options: ['<sidebar>', '<aside>', '<extra>', '<section>'], correctAnswer: 1 },
      { question: 'Which tag defines the footer of a document or section?', options: ['<bottom>', '<end>', '<footer>', '<base>'], correctAnswer: 2 },
      { question: 'Which tag represents the dominant content of the <body>?', options: ['<content>', '<main>', '<section>', '<article>'], correctAnswer: 1 },
      { question: 'Is <div> a semantic tag?', options: ['Yes', 'No', 'Only in HTML5', 'Only with classes'], correctAnswer: 1 },
      { question: 'Which tag is used for a thematic grouping of content?', options: ['<group>', '<section>', '<div>', '<article>'], correctAnswer: 1 },
      { question: 'Which tag is used for the introductory content of a page?', options: ['<intro>', '<header>', '<head>', '<top>'], correctAnswer: 1 },
      { question: 'What is the benefit of semantic HTML?', options: ['Better SEO', 'Improved accessibility', 'Easier to read code', 'All of the above'], correctAnswer: 3 },
      { question: 'Which tag is used to mark up a sidebar?', options: ['<sidebar>', '<aside>', '<nav>', '<section>'], correctAnswer: 1 }
    ]
  },
  {
    id: 'attributes',
    title: 'Attributes',
    note: 'Attributes provide additional information about elements. Global attributes like id (unique) and class (reusable) are common. Data attributes (data-*) store custom data.',
    example: `<div id="unique-id" class="reusable-class" data-value="10">
  Content
</div>`,
    quizzes: [
      { question: 'Which attribute must be unique on a page?', options: ['class', 'id', 'name', 'style'], correctAnswer: 1 },
      { question: 'Which attribute is used to group multiple elements for styling?', options: ['id', 'class', 'group', 'type'], correctAnswer: 1 },
      { question: 'How do you define a custom data attribute?', options: ['custom-*', 'attr-*', 'data-*', 'x-*'], correctAnswer: 2 },
      { question: 'Which attribute provides a tooltip when hovering?', options: ['alt', 'title', 'hover', 'info'], correctAnswer: 1 },
      { question: 'Which attribute is used to specify inline CSS?', options: ['css', 'style', 'design', 'format'], correctAnswer: 1 },
      { question: 'What does the lang attribute do?', options: ['Sets the font', 'Specifies the language of the content', 'Links a script', 'None'], correctAnswer: 1 },
      { question: 'Which attribute is used in <img> to describe the image?', options: ['src', 'alt', 'title', 'desc'], correctAnswer: 1 },
      { question: 'Which attribute makes an element editable by the user?', options: ['editable', 'contenteditable', 'user-edit', 'modify'], correctAnswer: 1 },
      { question: 'Which attribute specifies the tab order of elements?', options: ['index', 'tabindex', 'order', 'sequence'], correctAnswer: 1 },
      { question: 'Which attribute is used to disable an input?', options: ['off', 'hidden', 'disabled', 'readonly'], correctAnswer: 2 }
    ]
  },
  {
    id: 'metadata',
    title: 'Metadata',
    note: 'Metadata is data about the document, placed in the <head>. <meta> tags define character set, description, and viewport. <link> connects CSS, and <script> connects JavaScript.',
    example: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <script src="app.js"></script>
</head>`,
    quizzes: [
      { question: 'Which tag is used to link an external CSS file?', options: ['<script>', '<link>', '<style>', '<a>'], correctAnswer: 1 },
      { question: 'Which tag is used to include JavaScript?', options: ['<js>', '<script>', '<link>', '<code>'], correctAnswer: 1 },
      { question: 'Which meta tag is crucial for responsive design?', options: ['charset', 'viewport', 'description', 'author'], correctAnswer: 1 },
      { question: 'Where should <meta> tags be placed?', options: ['<body>', '<head>', '<footer>', '<html>'], correctAnswer: 1 },
      { question: 'Which attribute in <meta> defines the character encoding?', options: ['content', 'charset', 'name', 'type'], correctAnswer: 1 },
      { question: 'Which tag defines the page title in search results?', options: ['<h1>', '<meta name="title">', '<title>', '<header>'], correctAnswer: 2 },
      { question: 'How do you add a favicon?', options: ['<meta icon="...">', '<link rel="icon" ...>', '<img src="favicon.ico">', '<favicon>'], correctAnswer: 1 },
      { question: 'What does the description meta tag do?', options: ['Sets the page title', 'Provides a summary for search engines', 'Defines the author', 'None'], correctAnswer: 1 },
      { question: 'Can <script> tags be placed in the <body>?', options: ['Yes', 'No', 'Only at the top', 'Only with async'], correctAnswer: 0 },
      { question: 'Which attribute in <script> makes it load in the background?', options: ['wait', 'defer', 'async', 'Both defer and async'], correctAnswer: 3 }
    ]
  },
  {
    id: 'embeds-iframes',
    title: 'Embeds & Iframes',
    note: '<iframe> embeds another document within the current page. <object> and <embed> are older tags used for external resources like PDFs or plugins.',
    example: `<iframe src="https://example.com" width="600" height="400"></iframe>
<embed src="file.pdf" type="application/pdf">`,
    quizzes: [
      { question: 'Which tag embeds another web page?', options: ['<embed>', '<iframe>', '<object>', '<frame>'], correctAnswer: 1 },
      { question: 'Which attribute specifies the URL in an <iframe>?', options: ['href', 'src', 'url', 'link'], correctAnswer: 1 },
      { question: 'How do you remove the border of an <iframe> (CSS)?', options: ['border: none', 'frameborder="0"', 'outline: none', 'Both are possible'], correctAnswer: 3 },
      { question: 'Which tag is used to embed a PDF?', options: ['<pdf>', '<embed>', '<iframe-pdf>', '<media>'], correctAnswer: 1 },
      { question: 'What does the sandbox attribute in <iframe> do?', options: ['Adds a border', 'Applies security restrictions', 'Speeds up loading', 'None'], correctAnswer: 1 },
      { question: 'Can you embed YouTube videos using <iframe>?', options: ['Yes', 'No', 'Only with Flash', 'Only in Chrome'], correctAnswer: 0 },
      { question: 'Which tag is a general-purpose container for external resources?', options: ['<embed>', '<object>', '<iframe>', '<source>'], correctAnswer: 1 },
      { question: 'What happens if a browser doesn\'t support <iframe>?', options: ['It crashes', 'It shows content inside the tag', 'It ignores it', 'It shows an error'], correctAnswer: 1 },
      { question: 'Which attribute sets the width of an <iframe>?', options: ['size', 'width', 'cols', 'length'], correctAnswer: 1 },
      { question: 'Is <iframe> a semantic tag?', options: ['Yes', 'No', 'Only for videos', 'Only for maps'], correctAnswer: 1 }
    ]
  },
  {
    id: 'html5-apis',
    title: 'HTML5 APIs',
    note: 'HTML5 introduced powerful APIs. <canvas> is for 2D/3D graphics, <svg> for vector graphics. Drag and Drop, Geolocation (user location), and Web Storage (localStorage) are also key.',
    example: `<canvas id="myCanvas"></canvas>
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" fill="red" />
</svg>`,
    quizzes: [
      { question: 'Which tag is used for drawing graphics via JavaScript?', options: ['<svg>', '<canvas>', '<draw>', '<paint>'], correctAnswer: 1 },
      { question: 'Which tag is used for vector-based graphics?', options: ['<canvas>', '<svg>', '<vector>', '<img-v>'], correctAnswer: 1 },
      { question: 'Which API is used to get the user\'s location?', options: ['Location API', 'GPS API', 'Geolocation API', 'Map API'], correctAnswer: 2 },
      { question: 'Which storage API persists data even after the browser is closed?', options: ['sessionStorage', 'localStorage', 'cookieStorage', 'permanentStorage'], correctAnswer: 1 },
      { question: 'Which storage API clears data when the tab is closed?', options: ['localStorage', 'sessionStorage', 'tabStorage', 'tempStorage'], correctAnswer: 1 },
      { question: 'How do you make an element draggable?', options: ['draggable="true"', 'drag="on"', 'moveable="true"', 'allow-drag'], correctAnswer: 0 },
      { question: 'Which tag is used to define a container for SVG graphics?', options: ['<vector>', '<svg>', '<canvas>', '<graphics>'], correctAnswer: 1 },
      { question: 'What is the main difference between Canvas and SVG?', options: ['Canvas is vector, SVG is raster', 'Canvas is raster, SVG is vector', 'Canvas is faster for small areas', 'None'], correctAnswer: 1 },
      { question: 'Which method is used to store data in localStorage?', options: ['saveItem()', 'setItem()', 'putItem()', 'addItem()'], correctAnswer: 1 },
      { question: 'Which method is used to retrieve data from localStorage?', options: ['getItem()', 'fetchItem()', 'readItem()', 'loadItem()'], correctAnswer: 0 }
    ]
  }
];
