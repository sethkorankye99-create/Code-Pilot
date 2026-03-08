export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TsSection {
  id: string;
  title: string;
  note: string;
  example: string;
  quizzes: Quiz[];
}

export const tsContent: TsSection[] = [
  {
    id: 'ts-fundamentals',
    title: 'TypeScript Fundamentals',
    note: 'TypeScript adds static typing to JavaScript. Basic types include string, number, boolean, array, and any. Interfaces and Type Aliases define custom shapes for objects. Union types (|) allow a value to be one of several types, while Intersection types (&) combine multiple types into one.',
    example: `// Basic Types
let isDone: boolean = false;
let age: number = 30;
let name: string = "Alice";
let list: number[] = [1, 2, 3];

// Type Alias
type ID = string | number; // Union Type

// Interface
interface User {
  id: ID;
  name: string;
  email?: string; // Optional property
}

// Intersection Type
type Employee = User & { company: string };

const emp: Employee = {
  id: 1,
  name: "Bob",
  company: "Tech Corp"
};`,
    quizzes: [
      { question: 'What is TypeScript primarily known for adding to JavaScript?', options: ['New array methods', 'Static typing', 'A new DOM API', 'CSS styling'], correctAnswer: 1 },
      { question: 'Which keyword is used to define a custom shape for an object that can be extended?', options: ['type', 'interface', 'shape', 'struct'], correctAnswer: 1 },
      { question: 'How do you define an array of strings in TypeScript?', options: ['Array[string]', 'string[]', 'strings', '[string]'], correctAnswer: 1 },
      { question: 'What does the "?" symbol mean when defining a property in an interface?', options: ['The property is required', 'The property is a boolean', 'The property is optional', 'The property can be any type'], correctAnswer: 2 },
      { question: 'Which symbol is used for a Union Type?', options: ['&', '|', '||', '&&'], correctAnswer: 1 },
      { question: 'Which symbol is used for an Intersection Type?', options: ['&', '|', '+', '*'], correctAnswer: 0 },
      { question: 'What is the "any" type in TypeScript?', options: ['A type that represents all numbers', 'A type that opts out of type checking', 'A type that represents strings only', 'A type for boolean values'], correctAnswer: 1 },
      { question: 'Can an interface extend another interface?', options: ['Yes, using the "extends" keyword', 'No, interfaces cannot be extended', 'Yes, using the "implements" keyword', 'Only if they have the same properties'], correctAnswer: 0 },
      { question: 'What is a Type Alias?', options: ['A way to rename a variable', 'A name for any type, including primitives, unions, and intersections', 'A built-in TypeScript function', 'A way to hide types'], correctAnswer: 1 },
      { question: 'Which of the following is a valid Union Type?', options: ['type Result = string & number;', 'type Result = string | number;', 'type Result = string + number;', 'type Result = string || number;'], correctAnswer: 1 }
    ]
  },
  {
    id: 'advanced-types',
    title: 'Advanced Types',
    note: 'Enums allow defining a set of named constants. Tuples are arrays with fixed lengths and known types at specific positions. Literal types restrict a variable to exact values. Discriminated Unions use a common property (discriminant) to differentiate between types in a union.',
    example: `// Enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// Tuple
let tuple: [string, number] = ["hello", 10];

// Literal Type
type Status = "success" | "error" | "loading";
let currentStatus: Status = "success";

// Discriminated Union
interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  sideLength: number;
}
type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.sideLength ** 2;
  }
}`,
    quizzes: [
      { question: 'What is an Enum in TypeScript?', options: ['A way to define a set of named constants', 'A loop construct', 'A type of array', 'A built-in class'], correctAnswer: 0 },
      { question: 'By default, what is the starting value of the first member in a numeric enum?', options: ['1', '0', '-1', 'undefined'], correctAnswer: 1 },
      { question: 'What is a Tuple?', options: ['An array with an unknown number of elements', 'An array where the type of a fixed number of elements is known', 'An object with fixed keys', 'A string with fixed length'], correctAnswer: 1 },
      { question: 'How do you define a Tuple containing a string and a boolean?', options: ['[string, boolean]', '(string, boolean)', '{string, boolean}', 'Array<string, boolean>'], correctAnswer: 0 },
      { question: 'What is a Literal Type?', options: ['A type that can be any string', 'A type that represents an exact value (e.g., "success")', 'A type for numbers only', 'A type that is literally true'], correctAnswer: 1 },
      { question: 'What is the key feature of a Discriminated Union?', options: ['It uses a common literal property to distinguish between types', 'It combines all properties of the union types', 'It only allows strings', 'It prevents type checking'], correctAnswer: 0 },
      { question: 'In the example `type Direction = "North" | "South";`, what kind of type is Direction?', options: ['Enum', 'Tuple', 'String Literal Union', 'Interface'], correctAnswer: 2 },
      { question: 'Can Enums have string values?', options: ['No, only numbers', 'Yes, they are called String Enums', 'Only in strict mode', 'Yes, but only one member can be a string'], correctAnswer: 1 },
      { question: 'What happens if you try to assign a value to a tuple at an index outside its defined length?', options: ['It works fine', 'TypeScript throws an error', 'It automatically resizes the tuple', 'It converts the tuple to an array'], correctAnswer: 1 },
      { question: 'Which keyword is used to define an Enum?', options: ['type', 'interface', 'enum', 'const'], correctAnswer: 2 }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    note: 'TypeScript supports OOP with Classes. Access modifiers (public, private, protected) control visibility. Abstract classes cannot be instantiated and are meant to be subclassed. The "implements" keyword ensures a class adheres to an interface.',
    example: `interface Drivable {
  drive(): void;
}

// Abstract Class
abstract class Vehicle {
  constructor(protected brand: string) {}
  abstract honk(): void; // Must be implemented by subclasses
}

// Class implementing interface and extending abstract class
class Car extends Vehicle implements Drivable {
  private speed: number = 0;

  constructor(brand: string) {
    super(brand);
  }

  public drive() {
    this.speed += 10;
    console.log(\`\${this.brand} is driving at \${this.speed} mph.\`);
  }

  honk() {
    console.log("Beep beep!");
  }
}

const myCar = new Car("Toyota");
myCar.drive();`,
    quizzes: [
      { question: 'Which access modifier is the default in TypeScript classes?', options: ['private', 'protected', 'public', 'internal'], correctAnswer: 2 },
      { question: 'What does the "private" modifier do?', options: ['Makes the member accessible everywhere', 'Makes the member accessible only within its declaring class', 'Makes the member accessible in subclasses', 'Hides the class from other files'], correctAnswer: 1 },
      { question: 'What does the "protected" modifier do?', options: ['Same as private', 'Accessible within the class and its subclasses', 'Accessible anywhere', 'Read-only'], correctAnswer: 1 },
      { question: 'Can you instantiate an abstract class directly (e.g., new AbstractClass())?', options: ['Yes', 'No', 'Only if it has no abstract methods', 'Only in non-strict mode'], correctAnswer: 1 },
      { question: 'What is the purpose of an abstract method?', options: ['To provide a default implementation', 'To force subclasses to provide their own implementation', 'To hide the method', 'To make the method run faster'], correctAnswer: 1 },
      { question: 'Which keyword is used to make a class adhere to an interface?', options: ['extends', 'inherits', 'implements', 'uses'], correctAnswer: 2 },
      { question: 'Which keyword is used to inherit from another class?', options: ['implements', 'extends', 'super', 'inherits'], correctAnswer: 1 },
      { question: 'What must you call inside a subclass constructor before accessing "this"?', options: ['parent()', 'init()', 'super()', 'base()'], correctAnswer: 2 },
      { question: 'What does the "readonly" modifier do to a class property?', options: ['Makes it private', 'Prevents it from being reassigned after initialization', 'Makes it a getter', 'Requires it to be a string'], correctAnswer: 1 },
      { question: 'Can a class implement multiple interfaces?', options: ['No, only one', 'Yes, separated by commas', 'Yes, using the & operator', 'Only abstract classes can'], correctAnswer: 1 }
    ]
  },
  {
    id: 'generics',
    title: 'Generics',
    note: 'Generics allow creating reusable components that work over a variety of types rather than a single one. Constraints (extends) limit the types that can be passed. Utility types like Partial, Readonly, and Pick manipulate existing types.',
    example: `// Generic Function
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("myString");

// Generic Class with Constraint
interface HasLength {
  length: number;
}
class Logger<T extends HasLength> {
  logLength(item: T) {
    console.log(item.length);
  }
}

// Utility Types
interface Todo {
  title: string;
  description: string;
}

type PartialTodo = Partial<Todo>; // All properties optional
type ReadonlyTodo = Readonly<Todo>; // Cannot reassign properties
type TodoPreview = Pick<Todo, "title">; // Only includes "title"`,
    quizzes: [
      { question: 'What is the primary purpose of Generics?', options: ['To make code run faster', 'To create reusable components that work with multiple types', 'To enforce strict any types', 'To generate HTML'], correctAnswer: 1 },
      { question: 'Which syntax is commonly used to denote a generic type parameter?', options: ['{T}', '(T)', '<T>', '[T]'], correctAnswer: 2 },
      { question: 'How do you constrain a generic type T to ensure it has a "length" property?', options: ['<T has length>', '<T implements Length>', '<T extends { length: number }>', '<T : length>'], correctAnswer: 2 },
      { question: 'What does the Partial<T> utility type do?', options: ['Makes all properties of T required', 'Makes all properties of T optional', 'Removes all properties from T', 'Makes T read-only'], correctAnswer: 1 },
      { question: 'What does the Readonly<T> utility type do?', options: ['Makes all properties of T optional', 'Prevents reassignment of T\'s properties', 'Converts T to a string', 'Removes readonly modifiers'], correctAnswer: 1 },
      { question: 'What does the Pick<T, K> utility type do?', options: ['Constructs a type by picking the set of properties K from T', 'Removes properties K from T', 'Picks a random type', 'Combines T and K'], correctAnswer: 0 },
      { question: 'What does the Omit<T, K> utility type do?', options: ['Constructs a type by picking properties K from T', 'Constructs a type by removing properties K from T', 'Omits type checking', 'Makes properties optional'], correctAnswer: 1 },
      { question: 'Can you have multiple generic type parameters (e.g., <T, U>)?', options: ['Yes', 'No', 'Only in classes', 'Only in interfaces'], correctAnswer: 0 },
      { question: 'What is the default type if a generic type parameter is not provided and cannot be inferred?', options: ['any', 'unknown', 'It causes an error (unless a default is specified)', 'void'], correctAnswer: 2 },
      { question: 'How do you provide a default type for a generic parameter?', options: ['<T = string>', '<T : string>', '<T default string>', '<T -> string>'], correctAnswer: 0 }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    note: 'TypeScript adds types to function parameters and return values. Optional parameters use "?". Rest parameters (...) gather multiple arguments into an array. Function Overloads allow defining multiple signatures for a single function implementation.',
    example: `// Typed Function
function add(x: number, y: number): number {
  return x + y;
}

// Optional & Default Parameters
function buildName(first: string, last?: string, title: string = "Mr.") {
  return last ? \`\${title} \${first} \${last}\` : \`\${title} \${first}\`;
}

// Rest Parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Function Overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp - 1, d);
  } else {
    return new Date(mOrTimestamp);
  }
}`,
    quizzes: [
      { question: 'How do you specify the return type of a function?', options: ['function foo() -> string', 'function foo(): string', 'function foo() return string', 'string function foo()'], correctAnswer: 1 },
      { question: 'What does a void return type mean?', options: ['The function returns any value', 'The function returns undefined or does not return a value', 'The function returns null', 'The function throws an error'], correctAnswer: 1 },
      { question: 'How do you mark a function parameter as optional?', options: ['param!', 'param?', 'param*', 'param='], correctAnswer: 1 },
      { question: 'Where must optional parameters be placed in the parameter list?', options: ['At the beginning', 'Anywhere', 'At the end (after all required parameters)', 'They must be the only parameters'], correctAnswer: 2 },
      { question: 'How do you define a default value for a parameter?', options: ['param: type = value', 'param = value: type', 'param?: type = value', 'default param = value'], correctAnswer: 0 },
      { question: 'What is a Rest parameter?', options: ['A parameter that pauses the function', 'A parameter that collects multiple arguments into an array', 'A parameter that is ignored', 'A parameter that resets the function'], correctAnswer: 1 },
      { question: 'What is the syntax for a Rest parameter?', options: ['...param: type[]', 'param...: type[]', 'rest param: type[]', '***param: type[]'], correctAnswer: 0 },
      { question: 'What are Function Overloads?', options: ['Functions that are too large', 'Providing multiple function signatures for a single implementation', 'Calling a function too many times', 'Overriding a parent class method'], correctAnswer: 1 },
      { question: 'In function overloads, which signature is actually executed?', options: ['The first one', 'The last one', 'The implementation signature (which must be compatible with all overloads)', 'All of them'], correctAnswer: 2 },
      { question: 'How do you type a function as a variable (Function Type)?', options: ['let fn: (a: number) => string;', 'let fn: function(number): string;', 'let fn: (number) -> string;', 'let fn: Function<number, string>;'], correctAnswer: 0 }
    ]
  },
  {
    id: 'type-manipulation',
    title: 'Type Manipulation',
    note: 'TypeScript can create types from other types. "keyof" extracts keys from an object type. "typeof" extracts the type of a variable. Indexed Access (T[K]) gets the type of a property. Mapped Types iterate over keys to create new types. Conditional Types act like if-statements for types.',
    example: `// keyof
interface Person { name: string; age: number; }
type PersonKeys = keyof Person; // "name" | "age"

// typeof
let s = "hello";
type SType = typeof s; // string

// Indexed Access
type AgeType = Person["age"]; // number

// Mapped Type (makes all properties boolean)
type Booleanify<T> = {
  [K in keyof T]: boolean;
};
type BooleanPerson = Booleanify<Person>; // { name: boolean; age: boolean; }

// Conditional Type
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<42>; // false`,
    quizzes: [
      { question: 'What does the "keyof" operator do?', options: ['Returns the values of an object', 'Takes an object type and produces a string or numeric literal union of its keys', 'Checks if a key exists', 'Deletes a key'], correctAnswer: 1 },
      { question: 'What does the "typeof" operator do in a type context?', options: ['Returns the JavaScript typeof string', 'Refers to the type of a variable or property', 'Checks if a variable is defined', 'Converts a type to a string'], correctAnswer: 1 },
      { question: 'How do you access the type of a specific property "age" on an interface "User"?', options: ['User.age', 'User["age"]', 'typeof User.age', 'keyof User.age'], correctAnswer: 1 },
      { question: 'What is a Mapped Type?', options: ['A type that maps to a database', 'A generic type which uses a union of PropertyKeys to iterate through keys to create a type', 'A type for Map objects', 'A type that maps strings to numbers'], correctAnswer: 1 },
      { question: 'Which syntax is used in Mapped Types to iterate over keys?', options: ['[K in Keys]', '[K of Keys]', '{K in Keys}', '(K in Keys)'], correctAnswer: 0 },
      { question: 'What is a Conditional Type?', options: ['An if-statement in JavaScript', 'A type that selects one of two possible types based on a condition expressed as a type relationship test', 'A type that throws an error', 'A type that requires a boolean'], correctAnswer: 1 },
      { question: 'What is the syntax for a Conditional Type?', options: ['T == U ? X : Y', 'T extends U ? X : Y', 'if (T extends U) X else Y', 'T ? X : Y'], correctAnswer: 1 },
      { question: 'What does the "infer" keyword do in a conditional type?', options: ['Infers the type of a variable automatically', 'Allows you to declare a type variable within the extends clause of a conditional type to be inferred', 'Infers the return type of a function', 'It is not a TypeScript keyword'], correctAnswer: 1 },
      { question: 'If `type T = keyof { a: 1, b: 2 }`, what is T?', options: ['"a" | "b"', '1 | 2', 'string', 'object'], correctAnswer: 0 },
      { question: 'Can you use "typeof" on a type alias?', options: ['Yes', 'No, typeof only operates on values/variables', 'Only in strict mode', 'Only if it is an interface'], correctAnswer: 1 }
    ]
  },
  {
    id: 'namespaces-modules',
    title: 'Namespaces & Modules',
    note: 'Modules (using import/export) are the modern way to organize code. Namespaces are an older TypeScript-specific way to group related code globally. Declaration files (.d.ts) describe the shape of existing JavaScript code to TypeScript. Ambient modules declare types for external libraries.',
    example: `// Module (math.ts)
export function add(x: number, y: number) {
  return x + y;
}

// Importing
import { add } from './math';

// Namespace (Older approach)
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

// Declaration File (example.d.ts)
// Describing a global JS variable
declare var myGlobal: string;

// Ambient Module
declare module "some-js-lib" {
  export function doSomething(): void;
}`,
    quizzes: [
      { question: 'What is the modern, standard way to organize and share code between files in TypeScript/JavaScript?', options: ['Namespaces', 'Modules (import/export)', 'Global variables', 'Classes'], correctAnswer: 1 },
      { question: 'What keyword is used to make a function or variable available outside its module?', options: ['public', 'share', 'export', 'expose'], correctAnswer: 2 },
      { question: 'How do you import a specific exported function named "helper" from "./utils"?', options: ['import helper from "./utils";', 'import * as helper from "./utils";', 'import { helper } from "./utils";', 'require("./utils").helper;'], correctAnswer: 2 },
      { question: 'What is a Namespace in TypeScript?', options: ['A way to group related code in the global scope (internal modules)', 'A package manager', 'A type of interface', 'A way to import CSS'], correctAnswer: 0 },
      { question: 'What is the file extension for a TypeScript Declaration File?', options: ['.ts', '.js', '.d.ts', '.types'], correctAnswer: 2 },
      { question: 'What is the purpose of a Declaration File (.d.ts)?', options: ['To write executable TypeScript code', 'To provide type information for existing JavaScript code without implementation', 'To configure the compiler', 'To declare CSS styles'], correctAnswer: 1 },
      { question: 'Which keyword is used to tell TypeScript that a variable exists globally (e.g., defined in a script tag)?', options: ['global', 'window', 'declare', 'ambient'], correctAnswer: 2 },
      { question: 'What is an Ambient Module?', options: ['A module that plays background music', 'A declaration that provides types for an external module (like an npm package without types)', 'A module that is always loaded', 'A built-in Node.js module'], correctAnswer: 1 },
      { question: 'How do you export something as the default export of a module?', options: ['export default function() {}', 'export main function() {}', 'default export function() {}', 'export { function as default }'], correctAnswer: 0 },
      { question: 'If you import a default export, do you need to use curly braces {}?', options: ['Yes', 'No', 'Only if it is a class', 'Only in strict mode'], correctAnswer: 1 }
    ]
  },
  {
    id: 'decorators',
    title: 'Decorators',
    note: 'Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. They are functions prefixed with an @ symbol. They can be applied to Classes, Methods, Properties, and Parameters. (Requires experimentalDecorators in tsconfig).',
    example: `// Class Decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Method Decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyKey} with args: \${args}\`);
    return originalMethod.apply(this, args);
  };
}

@sealed
class Greeter {
  constructor(public greeting: string) {}

  @log
  greet() {
    return "Hello, " + this.greeting;
  }
}`,
    quizzes: [
      { question: 'What symbol is used to apply a decorator?', options: ['#', '$', '@', '&'], correctAnswer: 2 },
      { question: 'What is a Decorator fundamentally?', options: ['A class', 'A function', 'An interface', 'A variable'], correctAnswer: 1 },
      { question: 'Which tsconfig.json flag must be enabled to use decorators (historically)?', options: ['enableDecorators', 'experimentalDecorators', 'useDecorators', 'allowDecorators'], correctAnswer: 1 },
      { question: 'What are the four things decorators can be attached to?', options: ['Classes, Methods, Properties, Parameters', 'Functions, Variables, Interfaces, Types', 'Modules, Namespaces, Enums, Tuples', 'Objects, Arrays, Strings, Numbers'], correctAnswer: 0 },
      { question: 'What does a Class Decorator receive as its argument?', options: ['The class instance', 'The class constructor', 'The class name', 'The class prototype'], correctAnswer: 1 },
      { question: 'What does a Method Decorator receive as its arguments?', options: ['target, propertyKey, descriptor', 'class, method, args', 'constructor, name, value', 'instance, function, returnType'], correctAnswer: 0 },
      { question: 'What is a Decorator Factory?', options: ['A design pattern', 'A function that returns the expression that will be called by the decorator at runtime', 'A tool to generate decorators', 'A built-in TypeScript class'], correctAnswer: 1 },
      { question: 'Can decorators modify the behavior of a method?', options: ['No, they are only for metadata', 'Yes, by modifying the PropertyDescriptor', 'Only in Angular', 'Only if the method is static'], correctAnswer: 1 },
      { question: 'In what order are multiple decorators evaluated on a single declaration?', options: ['Top to bottom', 'Bottom to top (inside-out)', 'Randomly', 'Alphabetically'], correctAnswer: 1 },
      { question: 'Are decorators available in standard JavaScript?', options: ['Yes, since ES5', 'Yes, since ES6', 'No, they are a Stage 3 proposal for JavaScript and currently a TypeScript feature', 'No, they are only for Java'], correctAnswer: 2 }
    ]
  },
  {
    id: 'compiler-config',
    title: 'Compiler Configuration',
    note: 'The tsconfig.json file configures how TypeScript compiles to JavaScript. "strict" enables rigorous type checking. "target" sets the JS version output (e.g., ES2015). "lib" specifies built-in APIs to include (e.g., DOM). "outDir" sets where compiled files go.',
    example: `// tsconfig.json example
{
  "compilerOptions": {
    "target": "ES2020",        /* Specify ECMAScript target version */
    "module": "CommonJS",      /* Specify module code generation */
    "lib": ["DOM", "ES2020"],  /* Specify library files to be included */
    "outDir": "./dist",        /* Redirect output structure to the directory */
    "rootDir": "./src",        /* Specify the root directory of input files */
    "strict": true,            /* Enable all strict type-checking options */
    "noImplicitAny": true,     /* Raise error on expressions with an implied 'any' type */
    "esModuleInterop": true    /* Enables emit interoperability between CommonJS and ES Modules */
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}`,
    quizzes: [
      { question: 'Which file is used to configure the TypeScript compiler?', options: ['ts.config', 'typescript.json', 'tsconfig.json', 'compiler.json'], correctAnswer: 2 },
      { question: 'What does the "target" compiler option do?', options: ['Specifies the output directory', 'Specifies the ECMAScript target version for the compiled JavaScript (e.g., ES5, ES6)', 'Specifies the target operating system', 'Specifies the module system'], correctAnswer: 1 },
      { question: 'What does setting "strict": true do?', options: ['Enables all strict type-checking options', 'Makes the compiler run slower', 'Forces you to use classes', 'Disables the "any" type completely'], correctAnswer: 0 },
      { question: 'Which option raises an error if a variable implicitly has an "any" type?', options: ['noAny', 'strictAny', 'noImplicitAny', 'banAny'], correctAnswer: 2 },
      { question: 'What does the "lib" option specify?', options: ['External npm libraries', 'A list of library files to be included in the compilation (e.g., DOM APIs, ES6 features)', 'The location of the TypeScript compiler', 'The output library name'], correctAnswer: 1 },
      { question: 'Which option specifies the directory where compiled JavaScript files should be placed?', options: ['output', 'dist', 'outDir', 'buildDir'], correctAnswer: 2 },
      { question: 'What does the "include" array in tsconfig.json do?', options: ['Specifies npm packages to include', 'Specifies an array of filenames or patterns to include in the program', 'Includes other tsconfig files', 'Includes CSS files'], correctAnswer: 1 },
      { question: 'What does the "exclude" array do?', options: ['Excludes specific types', 'Specifies files or patterns to skip when resolving the "include" array', 'Excludes comments from the output', 'Excludes node_modules from npm install'], correctAnswer: 1 },
      { question: 'Which option enables interoperability between CommonJS and ES Modules?', options: ['allowModules', 'esModuleInterop', 'commonjsToEs', 'moduleResolution'], correctAnswer: 1 },
      { question: 'How do you generate a default tsconfig.json file using the command line?', options: ['tsc --init', 'tsc create', 'npm init ts', 'ts-node --init'], correctAnswer: 0 }
    ]
  },
  {
    id: 'async-programming',
    title: 'Asynchronous Programming',
    note: 'TypeScript adds type safety to Promises and Async/Await. A Promise returning a string is typed as Promise<string>. Async functions always return a Promise. Awaiting a Promise<T> yields a value of type T.',
    example: `// Typed Promise
function fetchUser(id: number): Promise<{ name: string; age: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Alice", age: 30 });
    }, 1000);
  });
}

// Async/Await with Types
async function getUserData() {
  try {
    // user is inferred as { name: string; age: number }
    const user = await fetchUser(1);
    console.log(user.name);
  } catch (error) {
    // In TS, caught errors are of type 'unknown' or 'any'
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}`,
    quizzes: [
      { question: 'How do you type a Promise that resolves to a number?', options: ['Promise(number)', 'Promise<number>', 'number Promise', 'Promise: number'], correctAnswer: 1 },
      { question: 'What is the return type of an async function that returns a string?', options: ['string', 'Promise<string>', 'async string', 'void'], correctAnswer: 1 },
      { question: 'If you await a function that returns Promise<boolean>, what is the type of the result?', options: ['Promise<boolean>', 'boolean', 'any', 'unknown'], correctAnswer: 1 },
      { question: 'In a try/catch block in modern TypeScript, what is the default type of the caught error?', options: ['Error', 'any', 'unknown', 'string'], correctAnswer: 2 },
      { question: 'How do you safely access properties on an error of type "unknown"?', options: ['Just access them directly', 'Cast it to "any"', 'Use a type guard (e.g., if (error instanceof Error))', 'You cannot access properties on unknown'], correctAnswer: 2 },
      { question: 'What does Promise.all() return if passed an array of Promise<string> and Promise<number>?', options: ['Promise<any[]>', 'Promise<[string, number]>', 'Promise<string | number>', 'An error'], correctAnswer: 1 },
      { question: 'Can you use "await" outside of an async function?', options: ['Yes, anywhere', 'No, never', 'Only at the top level of a module (Top-level await)', 'Only in classes'], correctAnswer: 2 },
      { question: 'What is the type of a Promise that resolves with no value?', options: ['Promise<null>', 'Promise<undefined>', 'Promise<void>', 'Promise<empty>'], correctAnswer: 2 },
      { question: 'How do you type the reject reason of a Promise?', options: ['Promise<ResolveType, RejectType>', 'You cannot strictly type the reject reason in the Promise signature', 'Promise<ResolveType>.catch<RejectType>', 'Promise<ResolveType | RejectType>'], correctAnswer: 1 },
      { question: 'Which utility type extracts the resolved type from a Promise type (e.g., getting string from Promise<string>)?', options: ['Awaited<T>', 'Resolved<T>', 'Unwrap<T>', 'Extract<T>'], correctAnswer: 0 }
    ]
  }
];
