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

export interface PythonSection {
  id: string;
  title: string;
  note: string;
  example: string;
  quizzes: Quiz[];
  challenge?: Challenge;
}

export const pythonContent: PythonSection[] = [
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    note: 'Python is a high-level, interpreted language known for its readability. It uses indentation for blocks instead of braces. Core data types include integers, floats, strings, and booleans. Control flow uses if/elif/else, and loops include for and while.',
    example: `# Variables and Data Types
name = "Alice"
age = 30
is_student = False

# Control Flow
if age >= 18:
    print(f"{name} is an adult.")
elif age > 12:
    print(f"{name} is a teenager.")
else:
    print(f"{name} is a child.")

# Loops
for i in range(3):
    print(f"Count: {i}")

count = 0
while count < 2:
    print("While loop running")
    count += 1`,
    quizzes: [
      { question: 'How do you indicate a block of code in Python?', options: ['Curly braces {}', 'Indentation', 'Parentheses ()', 'Square brackets []'], correctAnswer: 1 },
      { question: 'Which of the following is a valid variable name in Python?', options: ['1st_name', 'first-name', 'first_name', 'first name'], correctAnswer: 2 },
      { question: 'What is the output of type(5.0)?', options: ['<class \'int\'>', '<class \'float\'>', '<class \'double\'>', '<class \'number\'>'], correctAnswer: 1 },
      { question: 'Which operator is used for exponentiation (power)?', options: ['^', '**', '//', '%'], correctAnswer: 1 },
      { question: 'What does the // operator do?', options: ['Floor division', 'Regular division', 'Modulo', 'Comment'], correctAnswer: 0 },
      { question: 'How do you write an if statement in Python?', options: ['if x > 5 then:', 'if (x > 5)', 'if x > 5:', 'if x > 5 {'], correctAnswer: 2 },
      { question: 'Which keyword is used for the "else if" condition?', options: ['elseif', 'else if', 'elif', 'if else'], correctAnswer: 2 },
      { question: 'What function generates a sequence of numbers, often used in for loops?', options: ['sequence()', 'range()', 'list()', 'generate()'], correctAnswer: 1 },
      { question: 'How do you insert a variable into an f-string?', options: ['f"Hello {name}"', '"Hello " + name', '"Hello %s" % name', 'f"Hello $name"'], correctAnswer: 0 },
      { question: 'What is the boolean value for "False" in Python?', options: ['false', 'False', '0', 'None'], correctAnswer: 1 }
    ],
    challenge: {
      title: "Python Print",
      description: "Assign the value 'Hello Python' to a variable named 'msg' and print it.",
      initialCode: "# Write your Python code here\n",
      solution: "msg = 'Hello Python'\nprint(msg)"
    }
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    note: 'Python has four built-in data structures. Lists are ordered and mutable. Tuples are ordered and immutable. Dictionaries store key-value pairs. Sets are unordered collections of unique elements.',
    example: `# List (Mutable, Ordered)
fruits = ["apple", "banana", "cherry"]
fruits.append("date")

# Tuple (Immutable, Ordered)
coordinates = (10.0, 20.0)

# Dictionary (Key-Value pairs)
user = {
    "name": "John",
    "age": 25
}
user["email"] = "john@example.com"

# Set (Unique elements, Unordered)
unique_numbers = {1, 2, 2, 3, 4, 4}
# unique_numbers is {1, 2, 3, 4}`,
    quizzes: [
      { question: 'Which data structure is ordered and mutable?', options: ['Tuple', 'Set', 'List', 'Dictionary'], correctAnswer: 2 },
      { question: 'How do you create an empty dictionary?', options: ['{}', '[]', '()', 'set()'], correctAnswer: 0 },
      { question: 'Which data structure is immutable?', options: ['List', 'Dictionary', 'Set', 'Tuple'], correctAnswer: 3 },
      { question: 'How do you add an element to the end of a list?', options: ['list.add(item)', 'list.insert(item)', 'list.append(item)', 'list.push(item)'], correctAnswer: 2 },
      { question: 'What is a key characteristic of a Set?', options: ['It allows duplicate values', 'It is ordered', 'It only stores unique elements', 'It uses key-value pairs'], correctAnswer: 2 },
      { question: 'How do you access the value associated with the key "name" in a dictionary "user"?', options: ['user.name', 'user["name"]', 'user.get("name")', 'Both B and C'], correctAnswer: 3 },
      { question: 'Which method removes and returns the last item in a list?', options: ['remove()', 'pop()', 'delete()', 'shift()'], correctAnswer: 1 },
      { question: 'What is the output of len([1, 2, 3])?', options: ['2', '3', '4', 'Error'], correctAnswer: 1 },
      { question: 'How do you check if a key exists in a dictionary?', options: ['key in dict', 'dict.has(key)', 'dict.contains(key)', 'key exists dict'], correctAnswer: 0 },
      { question: 'Which bracket type is used to define a Tuple?', options: ['[]', '{}', '()', '<>'], correctAnswer: 2 }
    ]
  },
  {
    id: 'functions-modules',
    title: 'Functions & Modules',
    note: 'Functions are defined using "def". Lambda functions are small anonymous functions. *args and **kwargs allow passing variable numbers of arguments. Modules are Python files imported using "import", and the Standard Library provides many built-in modules.',
    example: `# Function with default parameter
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Lambda function
square = lambda x: x ** 2

# *args (positional) and **kwargs (keyword)
def print_info(*args, **kwargs):
    print("Positional:", args)
    print("Keyword:", kwargs)

print_info(1, 2, 3, name="Alice", age=30)

# Importing from Standard Library
import math
from datetime import datetime

print(math.pi)
print(datetime.now())`,
    quizzes: [
      { question: 'Which keyword is used to define a function in Python?', options: ['function', 'def', 'func', 'define'], correctAnswer: 1 },
      { question: 'What is a lambda function?', options: ['A function that runs infinitely', 'A small anonymous function defined with the lambda keyword', 'A built-in math function', 'A function that handles errors'], correctAnswer: 1 },
      { question: 'What does *args allow a function to do?', options: ['Accept a variable number of positional arguments', 'Accept a variable number of keyword arguments', 'Return multiple values', 'Unpack a dictionary'], correctAnswer: 0 },
      { question: 'What does **kwargs allow a function to do?', options: ['Accept a variable number of positional arguments', 'Accept a variable number of keyword arguments', 'Return multiple values', 'Unpack a list'], correctAnswer: 1 },
      { question: 'How do you import a specific function "sqrt" from the "math" module?', options: ['import sqrt from math', 'from math import sqrt', 'include math.sqrt', 'import math.sqrt'], correctAnswer: 1 },
      { question: 'What is the Python Standard Library?', options: ['A third-party package manager', 'A collection of modules included with Python by default', 'A database system', 'A web framework'], correctAnswer: 1 },
      { question: 'Which keyword is used to return a value from a function?', options: ['yield', 'output', 'return', 'send'], correctAnswer: 2 },
      { question: 'What happens if a function does not have a return statement?', options: ['It throws an error', 'It returns 0', 'It returns None', 'It returns False'], correctAnswer: 2 },
      { question: 'How do you call a function named "my_func"?', options: ['call my_func()', 'my_func()', 'execute my_func()', 'run my_func()'], correctAnswer: 1 },
      { question: 'What is the purpose of the "pass" statement in a function?', options: ['To return a value', 'To skip an iteration', 'To act as a placeholder for future code (does nothing)', 'To stop the function'], correctAnswer: 2 }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    note: 'Python supports OOP. Classes are blueprints for objects. The __init__ method initializes instances. Inheritance allows classes to inherit attributes and methods. Mixins provide multiple inheritance for specific features. Decorators modify function or method behavior.',
    example: `# Class and __init__
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

# Inheritance
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

# Decorator
def uppercase_decorator(func):
    def wrapper():
        result = func()
        return result.upper()
    return wrapper

@uppercase_decorator
def say_hi():
    return "hello there"

my_dog = Dog("Buddy")
print(my_dog.speak()) # Buddy says Woof!
print(say_hi()) # HELLO THERE`,
    quizzes: [
      { question: 'Which keyword is used to create a class?', options: ['object', 'class', 'def', 'struct'], correctAnswer: 1 },
      { question: 'What is the purpose of the __init__ method?', options: ['To destroy an object', 'To initialize a newly created object (constructor)', 'To print the object', 'To inherit from another class'], correctAnswer: 1 },
      { question: 'What does "self" represent in a class method?', options: ['The class itself', 'The global scope', 'The instance of the class calling the method', 'A built-in Python module'], correctAnswer: 2 },
      { question: 'How do you indicate that a class "Child" inherits from a class "Parent"?', options: ['class Child extends Parent:', 'class Child(Parent):', 'class Child inherits Parent:', 'class Child -> Parent:'], correctAnswer: 1 },
      { question: 'What is a Decorator in Python?', options: ['A function that takes another function and extends its behavior without explicitly modifying it', 'A class that styles the console output', 'A variable that stores metadata', 'A built-in data structure'], correctAnswer: 0 },
      { question: 'Which symbol is used to apply a decorator to a function?', options: ['#', '$', '@', '&'], correctAnswer: 2 },
      { question: 'What is a Mixin?', options: ['A tool for mixing audio', 'A class that provides methods to other classes but is not considered a base class itself (used via multiple inheritance)', 'A function that shuffles a list', 'A type of decorator'], correctAnswer: 1 },
      { question: 'How do you call a method from a parent class inside a child class?', options: ['parent.method()', 'super().method()', 'base().method()', 'self.parent.method()'], correctAnswer: 1 },
      { question: 'Can a Python class inherit from multiple classes?', options: ['Yes (Multiple Inheritance)', 'No, only single inheritance is supported', 'Only if they are abstract classes', 'Only in Python 2'], correctAnswer: 0 },
      { question: 'What are "dunder" methods (e.g., __str__)?', options: ['Methods that are deprecated', 'Special/Magic methods with double underscores used for operator overloading and built-in operations', 'Methods that run in the background', 'Methods that cannot be overridden'], correctAnswer: 1 }
    ]
  },
  {
    id: 'advanced-python',
    title: 'Advanced Python',
    note: 'Generators yield values one at a time, saving memory. Iterators implement __iter__ and __next__. Context Managers (using "with") handle resource setup and teardown. Metaclasses are classes for classes, controlling class creation.',
    example: `# Generator
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(3):
    print(num) # 3, 2, 1

# Context Manager
class MyFile:
    def __init__(self, filename):
        self.filename = filename
    def __enter__(self):
        print(f"Opening {self.filename}")
        return self
    def __exit__(self, exc_type, exc_val, traceback):
        print(f"Closing {self.filename}")

with MyFile("test.txt") as f:
    print("Doing work...")`,
    quizzes: [
      { question: 'What keyword is used in a function to make it a Generator?', options: ['return', 'yield', 'generate', 'next'], correctAnswer: 1 },
      { question: 'What is the main advantage of using a Generator over a List?', options: ['It is faster to sort', 'It uses less memory by generating items lazily (one at a time)', 'It can store multiple data types', 'It is easier to write'], correctAnswer: 1 },
      { question: 'Which two methods must an object implement to be an Iterator?', options: ['__start__ and __stop__', '__iter__ and __next__', '__init__ and __del__', '__get__ and __set__'], correctAnswer: 1 },
      { question: 'What exception is raised when an Iterator has no more items?', options: ['StopIteration', 'EndError', 'IndexError', 'EOFError'], correctAnswer: 0 },
      { question: 'Which keyword is used to invoke a Context Manager?', options: ['using', 'open', 'with', 'context'], correctAnswer: 2 },
      { question: 'What two methods are required to create a custom Context Manager?', options: ['__start__ and __stop__', '__open__ and __close__', '__enter__ and __exit__', '__init__ and __del__'], correctAnswer: 2 },
      { question: 'What is a Metaclass?', options: ['A class that inherits from all other classes', 'The class of a class; it defines how a class behaves', 'A class used for metadata storage', 'A built-in Python module'], correctAnswer: 1 },
      { question: 'What is the default metaclass in Python 3?', options: ['object', 'type', 'class', 'meta'], correctAnswer: 1 },
      { question: 'What does the next() function do?', options: ['Skips an iteration in a loop', 'Retrieves the next item from an iterator', 'Moves to the next line of code', 'Returns the next element in a list without an iterator'], correctAnswer: 1 },
      { question: 'Can a generator function contain multiple yield statements?', options: ['Yes', 'No', 'Only if they yield the same type', 'Only in a while loop'], correctAnswer: 0 }
    ]
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    note: 'Errors are handled using try/except blocks. The "finally" block always executes, useful for cleanup. You can catch specific exceptions or raise your own custom exceptions by inheriting from the Exception class.',
    example: `# Custom Exception
class NegativeNumberError(Exception):
    pass

def divide_positive(a, b):
    try:
        if a < 0 or b < 0:
            raise NegativeNumberError("Numbers must be positive")
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
    except NegativeNumberError as e:
        print(f"Custom Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    else:
        print(f"Success! Result is {result}")
    finally:
        print("Execution completed.")

divide_positive(10, 0)`,
    quizzes: [
      { question: 'Which block lets you test a block of code for errors?', options: ['catch', 'try', 'except', 'finally'], correctAnswer: 1 },
      { question: 'Which block lets you handle the error?', options: ['try', 'catch', 'except', 'finally'], correctAnswer: 2 },
      { question: 'Which block executes regardless of whether an error occurred or not?', options: ['try', 'except', 'else', 'finally'], correctAnswer: 3 },
      { question: 'Which keyword is used to explicitly trigger an exception?', options: ['throw', 'raise', 'trigger', 'error'], correctAnswer: 1 },
      { question: 'What does the "else" block do in a try/except statement?', options: ['Executes if an error occurs', 'Executes if NO error occurs in the try block', 'Always executes', 'Handles syntax errors'], correctAnswer: 1 },
      { question: 'How do you catch a specific exception, like a division by zero?', options: ['except MathError:', 'except ZeroDivisionError:', 'except DivisionError:', 'except Error:'], correctAnswer: 1 },
      { question: 'How do you create a custom exception in Python?', options: ['Create a class that inherits from Exception', 'Use the custom_error keyword', 'Define a function named error', 'You cannot create custom exceptions'], correctAnswer: 0 },
      { question: 'How do you capture the exception object to inspect its message?', options: ['except Exception as e:', 'catch Exception e:', 'except(e):', 'on Exception get e:'], correctAnswer: 0 },
      { question: 'What happens if an exception is raised but not caught by any except block?', options: ['The program ignores it', 'The program crashes and prints a traceback', 'The program returns None', 'The finally block prevents the crash'], correctAnswer: 1 },
      { question: 'Can you have multiple except blocks for a single try block?', options: ['Yes', 'No', 'Only if they catch the same error', 'Only inside a function'], correctAnswer: 0 }
    ]
  },
  {
    id: 'file-io',
    title: 'File I/O & Serialization',
    note: 'Python handles files easily. Use "open()" with modes like "r" (read) or "w" (write). Serialization converts objects to byte streams (Pickle) or strings (JSON) for storage. The "pathlib" module offers an object-oriented way to handle file paths.',
    example: `import json
from pathlib import Path

# Pathlib for paths
file_path = Path("data.json")

data = {
    "name": "Alice",
    "skills": ["Python", "Data Science"]
}

# Writing JSON to a file
with open(file_path, "w") as f:
    json.dump(data, f, indent=4)

# Reading JSON from a file
with open(file_path, "r") as f:
    loaded_data = json.load(f)
    print(loaded_data["name"]) # Alice`,
    quizzes: [
      { question: 'Which built-in function is used to open a file?', options: ['read()', 'file()', 'open()', 'load()'], correctAnswer: 2 },
      { question: 'What is the best practice for opening files to ensure they are properly closed?', options: ['Using a try/except block', 'Using the "with" statement (Context Manager)', 'Calling file.close() manually', 'Relying on the garbage collector'], correctAnswer: 1 },
      { question: 'Which mode is used to open a file for reading?', options: ['"w"', '"a"', '"r"', '"x"'], correctAnswer: 2 },
      { question: 'Which mode is used to append data to the end of an existing file?', options: ['"w"', '"a"', '"r"', '"+"'], correctAnswer: 1 },
      { question: 'What does the "json" module do?', options: ['Parses HTML', 'Encodes and decodes JSON data', 'Encrypts files', 'Compresses files'], correctAnswer: 1 },
      { question: 'Which json method writes a Python dictionary to a file as JSON?', options: ['json.write()', 'json.dumps()', 'json.dump()', 'json.load()'], correctAnswer: 2 },
      { question: 'What is the "pickle" module used for?', options: ['Preserving vegetables', 'Serializing and deserializing Python object structures to byte streams', 'Parsing CSV files', 'Making HTTP requests'], correctAnswer: 1 },
      { question: 'Why should you be careful when unpickling data?', options: ['It is very slow', 'It can execute arbitrary code if the data is malicious', 'It only works on Windows', 'It corrupts text files'], correctAnswer: 1 },
      { question: 'What is the modern, object-oriented module for handling filesystem paths?', options: ['os.path', 'filepath', 'pathlib', 'sys.path'], correctAnswer: 2 },
      { question: 'Which method reads the entire contents of a file into a single string?', options: ['read()', 'readline()', 'readlines()', 'get_text()'], correctAnswer: 0 }
    ]
  },
  {
    id: 'concurrency',
    title: 'Concurrency & Parallelism',
    note: 'Concurrency manages multiple tasks at once. Threading is good for I/O-bound tasks. Multiprocessing bypasses the GIL for CPU-bound tasks. Asyncio uses an event loop and async/await syntax for single-threaded concurrent code.',
    example: `import asyncio
import time

# Asyncio example
async def fetch_data(id, delay):
    print(f"Task {id}: Starting fetch...")
    await asyncio.sleep(delay) # Non-blocking sleep
    print(f"Task {id}: Done!")
    return f"Data {id}"

async def main():
    start = time.time()
    # Run tasks concurrently
    results = await asyncio.gather(
        fetch_data(1, 2),
        fetch_data(2, 1)
    )
    print(f"Results: {results}")
    print(f"Time taken: {time.time() - start:.2f}s")

# To run: asyncio.run(main())`,
    quizzes: [
      { question: 'What does the Global Interpreter Lock (GIL) in CPython do?', options: ['Prevents memory leaks', 'Allows multiple threads to execute Python bytecodes at once', 'Prevents multiple native threads from executing Python bytecodes at once', 'Encrypts the source code'], correctAnswer: 2 },
      { question: 'Which module is best suited for CPU-bound tasks to bypass the GIL?', options: ['threading', 'asyncio', 'multiprocessing', 'subprocess'], correctAnswer: 2 },
      { question: 'Which module is best suited for I/O-bound tasks (like network requests) using multiple threads?', options: ['threading', 'multiprocessing', 'math', 'os'], correctAnswer: 0 },
      { question: 'What keyword is used to define a coroutine in asyncio?', options: ['def async', 'async def', 'coroutine def', 'await def'], correctAnswer: 1 },
      { question: 'What keyword is used to pause a coroutine until a result is ready?', options: ['pause', 'yield', 'await', 'wait'], correctAnswer: 2 },
      { question: 'How do you run the top-level entry point function in an asyncio program?', options: ['asyncio.start(main())', 'asyncio.run(main())', 'main().run()', 'await main()'], correctAnswer: 1 },
      { question: 'What does asyncio.gather() do?', options: ['Collects garbage memory', 'Runs awaitable objects concurrently and returns a list of results', 'Gathers system metrics', 'Stops all running tasks'], correctAnswer: 1 },
      { question: 'What is a Thread?', options: ['A string of text', 'The smallest sequence of programmed instructions that can be managed independently by a scheduler', 'A separate Python process', 'A network connection'], correctAnswer: 1 },
      { question: 'Why might multi-threading not speed up a heavy mathematical computation in Python?', options: ['Math is too hard for threads', 'Because of the GIL, only one thread executes Python code at a time', 'Threads consume too much memory', 'The OS blocks it'], correctAnswer: 1 },
      { question: 'What is a Race Condition?', options: ['A fast algorithm', 'When the timing of events affects the correctness of a program (e.g., two threads modifying the same variable simultaneously)', 'A network timeout', 'A syntax error in concurrent code'], correctAnswer: 1 }
    ]
  },
  {
    id: 'testing-debugging',
    title: 'Testing & Debugging',
    note: 'Testing ensures code works as expected. "unittest" is built-in, while "pytest" is a popular third-party framework known for its simple assert statements. The "logging" module is preferred over "print" for tracking events and debugging.',
    example: `# Using pytest style assertions
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

# Logging
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def divide(a, b):
    if b == 0:
        logger.error("Attempted to divide by zero!")
        return None
    logger.info(f"Dividing {a} by {b}")
    return a / b

divide(10, 2)
divide(10, 0)`,
    quizzes: [
      { question: 'Which built-in Python module provides a framework for writing tests?', options: ['pytest', 'unittest', 'testmod', 'assert'], correctAnswer: 1 },
      { question: 'What is "pytest"?', options: ['A built-in Python module', 'A popular third-party testing framework', 'A debugging tool', 'A logging library'], correctAnswer: 1 },
      { question: 'Which keyword is heavily used in pytest to verify expectations?', options: ['verify', 'check', 'assert', 'expect'], correctAnswer: 2 },
      { question: 'What happens if an "assert" statement evaluates to False?', options: ['It prints a warning', 'It raises an AssertionError', 'It returns False', 'The program ignores it'], correctAnswer: 1 },
      { question: 'Why is the "logging" module preferred over "print()" for production code?', options: ['It is faster', 'It allows filtering by severity levels (INFO, ERROR, etc.) and directing output to files', 'It uses less memory', 'It automatically fixes bugs'], correctAnswer: 1 },
      { question: 'Which of the following is NOT a standard logging level?', options: ['DEBUG', 'INFO', 'WARNING', 'CRASH'], correctAnswer: 3 },
      { question: 'What is a Fixture in testing?', options: ['A bug in the code', 'A fixed value that cannot be changed', 'Setup code that provides a baseline state for tests (e.g., database connection)', 'A type of assertion'], correctAnswer: 2 },
      { question: 'What is Test-Driven Development (TDD)?', options: ['Writing tests after the code is complete', 'Writing tests before writing the actual code', 'Testing only the UI', 'A tool for debugging'], correctAnswer: 1 },
      { question: 'What does a debugger allow you to do?', options: ['Automatically write tests', 'Pause execution, step through code line-by-line, and inspect variables', 'Compile Python code to C', 'Format code'], correctAnswer: 1 },
      { question: 'Which built-in function can drop you into the Python debugger (PDB)?', options: ['debug()', 'breakpoint()', 'stop()', 'pause()'], correctAnswer: 1 }
    ]
  }
];
