export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  content: string;
  example: string;
  quizzes: Quiz[];
}

export const cppContent: Section[] = [
  {
    id: 'cpp-fundamentals',
    title: 'C++ Fundamentals',
    description: 'Variables, Data Types, Operators, Control Flow, Arrays, Pointers, References',
    content: 'C++ is a statically typed, compiled, general-purpose programming language that supports procedural, object-oriented, and generic programming. It provides low-level memory manipulation features while also offering high-level abstractions.\n\nKey Concepts:\n- Variables & Data Types: int, double, char, bool, etc.\n- Operators: Arithmetic, Relational, Logical, Bitwise.\n- Control Flow: if-else, switch, for, while, do-while.\n- Arrays: Fixed-size sequential collections of elements.\n- Pointers: Variables that store memory addresses.\n- References: Aliases for existing variables.',
    example: `#include <iostream>

int main() {
    int a = 10;
    int& ref = a; // Reference to a
    int* ptr = &a; // Pointer to a

    std::cout << "Value: " << a << std::endl;
    std::cout << "Reference: " << ref << std::endl;
    std::cout << "Pointer value: " << *ptr << std::endl;

    return 0;
}`,
    quizzes: [
      {
        question: 'Which of the following is a valid way to declare a reference in C++?',
        options: ['int ref = &a;', 'int& ref = a;', 'int* ref = a;', 'int ref = *a;'],
        correctAnswer: 1,
        explanation: 'A reference is declared using the & symbol after the type, e.g., int& ref = a;'
      },
      {
        question: 'What is the size of an int in C++?',
        options: ['2 bytes', '4 bytes', '8 bytes', 'Compiler dependent'],
        correctAnswer: 3,
        explanation: 'The size of an int in C++ is compiler and architecture dependent, though it is typically 4 bytes on modern systems.'
      },
      {
        question: 'Which operator is used to get the memory address of a variable?',
        options: ['*', '&', '->', '.'],
        correctAnswer: 1,
        explanation: 'The address-of operator (&) is used to get the memory address of a variable.'
      },
      {
        question: 'What does the * operator do when applied to a pointer?',
        options: ['Multiplies the pointer value', 'Gets the address of the pointer', 'Dereferences the pointer to access the value', 'Deletes the pointer'],
        correctAnswer: 2,
        explanation: 'The * operator dereferences a pointer, allowing access to the value stored at the memory address.'
      },
      {
        question: 'Which of the following loops guarantees execution at least once?',
        options: ['for', 'while', 'do-while', 'foreach'],
        correctAnswer: 2,
        explanation: 'A do-while loop evaluates its condition after executing the block, guaranteeing at least one execution.'
      },
      {
        question: 'How do you declare a constant variable in C++?',
        options: ['constant int x = 5;', 'const int x = 5;', 'int const x = 5;', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Both `const int x = 5;` and `int const x = 5;` are valid ways to declare a constant integer in C++.'
      },
      {
        question: 'What is the default return type of the main() function in C++?',
        options: ['void', 'int', 'float', 'char'],
        correctAnswer: 1,
        explanation: 'The main() function must return an int in standard C++.'
      },
      {
        question: 'Which of the following is not a fundamental data type in C++?',
        options: ['int', 'float', 'string', 'bool'],
        correctAnswer: 2,
        explanation: 'std::string is a class in the C++ Standard Library, not a fundamental (built-in) data type.'
      },
      {
        question: 'What is the correct syntax for a single-line comment in C++?',
        options: ['/* comment */', '// comment', '# comment', '-- comment'],
        correctAnswer: 1,
        explanation: 'Single-line comments in C++ start with //.'
      },
      {
        question: 'What happens if you access an array out of bounds in C++?',
        options: ['Compilation error', 'Runtime exception', 'Undefined behavior', 'Returns 0'],
        correctAnswer: 2,
        explanation: 'Accessing an array out of bounds results in undefined behavior in C++, which can cause crashes or silent data corruption.'
      }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction',
    content: 'Object-Oriented Programming (OOP) is a paradigm based on the concept of "objects", which contain data and code.\n\nCore Principles:\n- Classes & Objects: Blueprints and their instances.\n- Encapsulation: Bundling data and methods, restricting direct access.\n- Abstraction: Hiding complex implementation details.\n- Inheritance: Creating new classes from existing ones.\n- Polymorphism: Treating objects of different classes through a common interface (virtual functions).',
    example: `#include <iostream>

class Animal {
public:
    virtual void makeSound() const {
        std::cout << "Some generic sound" << std::endl;
    }
    virtual ~Animal() {} // Virtual destructor
};

class Dog : public Animal {
public:
    void makeSound() const override {
        std::cout << "Woof!" << std::endl;
    }
};

int main() {
    Animal* myPet = new Dog();
    myPet->makeSound(); // Outputs: Woof!
    delete myPet;
    return 0;
}`,
    quizzes: [
      {
        question: 'Which keyword is used to inherit a class in C++?',
        options: ['extends', 'inherits', ':', '->'],
        correctAnswer: 2,
        explanation: 'In C++, inheritance is denoted using a colon (:), e.g., class Dog : public Animal.'
      },
      {
        question: 'What is the purpose of a virtual destructor?',
        options: ['To delete virtual functions', 'To ensure derived class destructors are called when deleting through a base pointer', 'To prevent inheritance', 'To make the class abstract'],
        correctAnswer: 1,
        explanation: 'A virtual destructor ensures that the destructors of derived classes are called correctly when an object is deleted through a pointer to its base class.'
      },
      {
        question: 'Which concept describes hiding the internal state of an object and requiring all interaction to be performed through an object\'s methods?',
        options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
        correctAnswer: 2,
        explanation: 'Encapsulation is the bundling of data with the methods that operate on that data, restricting direct access to some of the object\'s components.'
      },
      {
        question: 'What makes a class abstract in C++?',
        options: ['Using the abstract keyword', 'Having at least one pure virtual function', 'Having no member variables', 'Inheriting from an abstract class'],
        correctAnswer: 1,
        explanation: 'A class becomes abstract if it contains at least one pure virtual function (e.g., virtual void func() = 0;).'
      },
      {
        question: 'What is the default access specifier for members of a class in C++?',
        options: ['public', 'private', 'protected', 'internal'],
        correctAnswer: 1,
        explanation: 'By default, all members of a class are private in C++.'
      },
      {
        question: 'Which keyword is used to explicitly call a base class constructor from a derived class?',
        options: ['super', 'base', 'It is called in the member initializer list', 'parent'],
        correctAnswer: 2,
        explanation: 'In C++, base class constructors are explicitly called in the member initializer list of the derived class constructor.'
      },
      {
        question: 'What is function overloading?',
        options: ['Functions with the same name but different parameters', 'Functions with the same name and same parameters', 'Functions overriding base class functions', 'Functions that call themselves'],
        correctAnswer: 0,
        explanation: 'Function overloading allows multiple functions to have the same name as long as their parameter lists (signatures) are different.'
      },
      {
        question: 'What does the "override" keyword do in C++11?',
        options: ['Forces a function to be virtual', 'Ensures that the function overrides a virtual function in a base class', 'Prevents a function from being overridden', 'Hides the base class function'],
        correctAnswer: 1,
        explanation: 'The override keyword explicitly states that a function is meant to override a virtual function in a base class, causing a compiler error if it doesn\'t.'
      },
      {
        question: 'Which of the following is true about friend functions?',
        options: ['They are members of the class', 'They can access private and protected members of the class', 'They are inherited by derived classes', 'They must be defined inside the class'],
        correctAnswer: 1,
        explanation: 'A friend function is not a member of the class but has access to its private and protected members.'
      },
      {
        question: 'What is a constructor?',
        options: ['A special method used to destroy objects', 'A special method called automatically when an object is created', 'A method that returns a new object', 'A method used to copy objects'],
        correctAnswer: 1,
        explanation: 'A constructor is a special member function that is automatically called when an object of a class is created, used to initialize the object.'
      }
    ]
  },
  {
    id: 'stl',
    title: 'Standard Template Library (STL)',
    description: 'Containers, Iterators, Algorithms, Function Objects',
    content: 'The Standard Template Library (STL) is a powerful library of generic classes and functions.\n\nComponents:\n- Containers: Data structures like vector, list, map, set.\n- Iterators: Objects that allow traversing containers safely.\n- Algorithms: Functions that perform operations on containers (sort, find, transform).\n- Function Objects (Functors): Objects that can be treated as though they are a function or function pointer.',
    example: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};

    // Using STL algorithm to sort
    std::sort(numbers.begin(), numbers.end());

    // Using iterator to print
    for (auto it = numbers.begin(); it != numbers.end(); ++it) {
        std::cout << *it << " ";
    }
    // Outputs: 1 2 5 8 9

    return 0;
}`,
    quizzes: [
      {
        question: 'Which STL container provides dynamic array functionality?',
        options: ['std::list', 'std::vector', 'std::deque', 'std::array'],
        correctAnswer: 1,
        explanation: 'std::vector is a sequence container that encapsulates dynamic size arrays.'
      },
      {
        question: 'Which header file is required to use std::sort?',
        options: ['<vector>', '<algorithm>', '<sort>', '<iterator>'],
        correctAnswer: 1,
        explanation: 'The std::sort algorithm is defined in the <algorithm> header.'
      },
      {
        question: 'What is an iterator in C++?',
        options: ['A type of loop', 'An object that points to an element inside a container', 'A function that modifies a container', 'A container that holds other containers'],
        correctAnswer: 1,
        explanation: 'An iterator is an object (like a pointer) that points to an element inside a container and can be used to iterate through it.'
      },
      {
        question: 'Which container stores elements as key-value pairs with unique keys?',
        options: ['std::vector', 'std::set', 'std::map', 'std::list'],
        correctAnswer: 2,
        explanation: 'std::map is an associative container that stores elements formed by a combination of a key value and a mapped value.'
      },
      {
        question: 'What is the time complexity of searching in a std::set?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'std::set is typically implemented as a balanced binary search tree (like a Red-Black tree), so search operations take O(log n) time.'
      },
      {
        question: 'Which algorithm is used to apply a function to a range of elements?',
        options: ['std::apply', 'std::transform', 'std::modify', 'std::execute'],
        correctAnswer: 1,
        explanation: 'std::transform applies a given function to a range and stores the result in another range.'
      },
      {
        question: 'What does std::vector::push_back() do?',
        options: ['Adds an element to the front', 'Adds an element to the back', 'Removes the last element', 'Reverses the vector'],
        correctAnswer: 1,
        explanation: 'push_back() adds a new element at the end of the vector, after its current last element.'
      },
      {
        question: 'What is a functor in C++?',
        options: ['A function that returns a pointer', 'A class or struct that overloads the operator()', 'A template function', 'A function with no arguments'],
        correctAnswer: 1,
        explanation: 'A functor (or function object) is any object that can be used with () in the manner of a function, typically by overloading operator().'
      },
      {
        question: 'Which container provides O(1) insertion and deletion at both ends?',
        options: ['std::vector', 'std::list', 'std::deque', 'std::set'],
        correctAnswer: 2,
        explanation: 'std::deque (double-ended queue) allows fast insertion and deletion at both its beginning and its end.'
      },
      {
        question: 'What is the difference between std::map and std::unordered_map?',
        options: ['std::map allows duplicate keys', 'std::unordered_map is sorted', 'std::map is implemented as a tree, std::unordered_map as a hash table', 'There is no difference'],
        correctAnswer: 2,
        explanation: 'std::map is typically a Red-Black tree (ordered), while std::unordered_map is a hash table (unordered, O(1) average access).'
      }
    ]
  },
  {
    id: 'memory-management',
    title: 'Memory Management',
    description: 'Stack vs Heap, Dynamic Allocation, Smart Pointers, RAII',
    content: 'Memory management is crucial in C++ as it does not have a built-in garbage collector.\n\nConcepts:\n- Stack: Automatic memory, fast, limited size. Variables are destroyed when they go out of scope.\n- Heap: Dynamic memory, manually managed via new/delete.\n- RAII (Resource Acquisition Is Initialization): Tying resource lifecycle to object lifetime.\n- Smart Pointers: std::unique_ptr, std::shared_ptr, std::weak_ptr automate memory management and prevent leaks.',
    example: `#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Acquired\\n"; }
    ~Resource() { std::cout << "Released\\n"; }
    void use() { std::cout << "Using resource\\n"; }
};

int main() {
    {
        // unique_ptr automatically deletes the resource when it goes out of scope
        std::unique_ptr<Resource> res = std::make_unique<Resource>();
        res->use();
    } // "Released" is printed here

    return 0;
}`,
    quizzes: [
      {
        question: 'Which operator is used to allocate memory on the heap in C++?',
        options: ['malloc', 'alloc', 'new', 'create'],
        correctAnswer: 2,
        explanation: 'The `new` operator is used to dynamically allocate memory on the heap in C++.'
      },
      {
        question: 'What happens if you forget to use `delete` on memory allocated with `new`?',
        options: ['Compilation error', 'Memory leak', 'Automatic garbage collection', 'Segmentation fault'],
        correctAnswer: 1,
        explanation: 'Failing to deallocate memory allocated with `new` results in a memory leak, where the memory remains unavailable until the program terminates.'
      },
      {
        question: 'Which smart pointer represents exclusive ownership of an object?',
        options: ['std::shared_ptr', 'std::weak_ptr', 'std::unique_ptr', 'std::auto_ptr'],
        correctAnswer: 2,
        explanation: 'std::unique_ptr is a smart pointer that owns and manages another object through a pointer and disposes of that object when the unique_ptr goes out of scope.'
      },
      {
        question: 'What does RAII stand for?',
        options: ['Resource Allocation Is Initialization', 'Resource Acquisition Is Initialization', 'Runtime Allocation In Initialization', 'Resource And Instance Initialization'],
        correctAnswer: 1,
        explanation: 'RAII stands for Resource Acquisition Is Initialization, a programming idiom where resource management is tied to object lifetime.'
      },
      {
        question: 'How do you deallocate an array allocated with `new int[10]`?',
        options: ['delete array;', 'delete[] array;', 'free(array);', 'remove array;'],
        correctAnswer: 1,
        explanation: 'When memory is allocated for an array using `new[]`, it must be deallocated using `delete[]`.'
      },
      {
        question: 'Which smart pointer is used to break circular references in std::shared_ptr?',
        options: ['std::unique_ptr', 'std::weak_ptr', 'std::circular_ptr', 'std::break_ptr'],
        correctAnswer: 1,
        explanation: 'std::weak_ptr is a smart pointer that holds a non-owning ("weak") reference to an object that is managed by std::shared_ptr, breaking circular references.'
      },
      {
        question: 'What is the preferred way to create a std::shared_ptr?',
        options: ['std::shared_ptr<T> p(new T());', 'std::make_shared<T>();', 'new std::shared_ptr<T>();', 'std::shared_ptr<T>::create();'],
        correctAnswer: 1,
        explanation: 'std::make_shared is preferred because it performs a single heap allocation for both the control block and the object, improving performance and exception safety.'
      },
      {
        question: 'Where are local variables typically stored in memory?',
        options: ['Heap', 'Stack', 'Data segment', 'BSS segment'],
        correctAnswer: 1,
        explanation: 'Local variables are typically stored on the stack, which provides fast, automatic memory management.'
      },
      {
        question: 'What is a dangling pointer?',
        options: ['A pointer initialized to nullptr', 'A pointer that points to freed memory', 'A pointer that has not been initialized', 'A pointer to a function'],
        correctAnswer: 1,
        explanation: 'A dangling pointer is a pointer that continues to point to a memory location after the memory has been deallocated or freed.'
      },
      {
        question: 'Why was std::auto_ptr deprecated and removed in C++17?',
        options: ['It was too slow', 'Its copy semantics were unsafe and transferred ownership unexpectedly', 'It caused memory leaks', 'It didn\'t support arrays'],
        correctAnswer: 1,
        explanation: 'std::auto_ptr had unsafe copy semantics where copying it transferred ownership, leaving the original pointer null. It was replaced by std::unique_ptr.'
      }
    ]
  },
  {
    id: 'advanced-features',
    title: 'Advanced Language Features',
    description: 'Templates, Exception Handling, Namespaces, Type Casting',
    content: 'C++ provides advanced features for generic programming, error handling, and type safety.\n\nKey Features:\n- Templates: Write generic code that works with any data type.\n- Exception Handling: try, catch, throw for robust error management.\n- Namespaces: Prevent name conflicts in large projects.\n- Type Casting: static_cast, dynamic_cast, const_cast, reinterpret_cast for safe type conversions.',
    example: `#include <iostream>
#include <stdexcept>

// Template function
template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    std::cout << "Int addition: " << add(5, 3) << std::endl;
    std::cout << "Double addition: " << add(2.5, 3.1) << std::endl;

    // Exception handling
    try {
        throw std::runtime_error("Something went wrong!");
    } catch (const std::exception& e) {
        std::cout << "Caught exception: " << e.what() << std::endl;
    }

    return 0;
}`,
    quizzes: [
      {
        question: 'What is the primary purpose of templates in C++?',
        options: ['To speed up compilation', 'To write generic code that works with different data types', 'To handle exceptions', 'To manage memory'],
        correctAnswer: 1,
        explanation: 'Templates allow functions and classes to operate with generic types, enabling code reuse for different data types.'
      },
      {
        question: 'Which keyword is used to throw an exception in C++?',
        options: ['raise', 'catch', 'throw', 'exception'],
        correctAnswer: 2,
        explanation: 'The `throw` keyword is used to signal the occurrence of an anomaly (exception) during program execution.'
      },
      {
        question: 'Which cast should be used to safely downcast polymorphic pointers?',
        options: ['static_cast', 'dynamic_cast', 'reinterpret_cast', 'const_cast'],
        correctAnswer: 1,
        explanation: 'dynamic_cast safely converts pointers and references to classes up, down, and sideways along the inheritance hierarchy, checking validity at runtime.'
      },
      {
        question: 'What is the purpose of a namespace?',
        options: ['To allocate memory', 'To group related classes and functions and prevent name collisions', 'To define a new data type', 'To handle file I/O'],
        correctAnswer: 1,
        explanation: 'Namespaces provide a declarative region that provides a scope to the identifiers inside it, preventing name conflicts in large projects.'
      },
      {
        question: 'Which cast is used to remove the const qualifier from a variable?',
        options: ['static_cast', 'dynamic_cast', 'reinterpret_cast', 'const_cast'],
        correctAnswer: 3,
        explanation: 'const_cast is used to add or remove the const (or volatile) qualifier from a variable.'
      },
      {
        question: 'What happens if an exception is thrown but not caught?',
        options: ['The program ignores it', 'The program calls std::terminate() and aborts', 'The compiler throws a warning', 'The program restarts'],
        correctAnswer: 1,
        explanation: 'If an exception is thrown and not caught by any catch block, the program calls std::terminate(), which typically aborts the program.'
      },
      {
        question: 'How do you define a template class?',
        options: ['class Template<T> {}', 'template <typename T> class MyClass {}', 'template class MyClass<T> {}', 'class MyClass template<T> {}'],
        correctAnswer: 1,
        explanation: 'A template class is defined using `template <typename T>` (or `class T`) before the class definition.'
      },
      {
        question: 'What is the catch-all handler in C++ exception handling?',
        options: ['catch(all)', 'catch(Exception e)', 'catch(...)', 'catch(*)'],
        correctAnswer: 2,
        explanation: 'The `catch(...)` block catches all exceptions, regardless of their type.'
      },
      {
        question: 'Which cast is considered the most dangerous as it performs low-level bit reinterpretation?',
        options: ['static_cast', 'dynamic_cast', 'reinterpret_cast', 'const_cast'],
        correctAnswer: 2,
        explanation: 'reinterpret_cast converts any pointer type to any other pointer type, even of unrelated classes, making it highly unsafe if used incorrectly.'
      },
      {
        question: 'How do you access a variable `x` defined inside `namespace MySpace`?',
        options: ['MySpace.x', 'MySpace::x', 'MySpace->x', 'x::MySpace'],
        correctAnswer: 1,
        explanation: 'The scope resolution operator (::) is used to access members of a namespace, e.g., MySpace::x.'
      }
    ]
  },
  {
    id: 'modern-cpp',
    title: 'Modern C++ (C++11 to C++20)',
    description: 'Lambdas, Move Semantics, Auto, Constexpr, Concepts, Ranges',
    content: 'Modern C++ introduced features that make the language safer, faster, and more expressive.\n\nKey Additions:\n- auto: Type inference.\n- Lambdas: Anonymous inline functions.\n- Move Semantics: Transferring resources instead of copying (rvalue references).\n- constexpr: Compile-time evaluation.\n- Concepts (C++20): Constraints on template parameters.\n- Ranges (C++20): Composable algorithms and views.',
    example: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    // Lambda expression and auto
    auto is_even = [](int n) { return n % 2 == 0; };

    // Using std::count_if with lambda
    int even_count = std::count_if(nums.begin(), nums.end(), is_even);

    std::cout << "Even numbers: " << even_count << std::endl;

    // Move semantics example
    std::string str1 = "Hello";
    std::string str2 = std::move(str1); // str1 is now empty, str2 owns the data

    return 0;
}`,
    quizzes: [
      {
        question: 'What does the `auto` keyword do in Modern C++?',
        options: ['Automatically allocates memory', 'Deduces the type of a variable from its initializer', 'Creates an automatic variable', 'Automatically deletes pointers'],
        correctAnswer: 1,
        explanation: 'The `auto` keyword tells the compiler to deduce the type of a variable from its initialization expression.'
      },
      {
        question: 'What is a lambda expression in C++?',
        options: ['A mathematical function', 'An anonymous, inline function object', 'A type of smart pointer', 'A new loop construct'],
        correctAnswer: 1,
        explanation: 'A lambda expression provides a concise way to create anonymous function objects (closures) inline.'
      },
      {
        question: 'What is the primary benefit of move semantics?',
        options: ['It moves code to different files', 'It avoids expensive deep copies by transferring ownership of resources', 'It moves variables to the heap', 'It allows moving pointers safely'],
        correctAnswer: 1,
        explanation: 'Move semantics (using rvalue references and std::move) optimize performance by transferring resources from temporary objects instead of copying them.'
      },
      {
        question: 'What does `constexpr` indicate?',
        options: ['A variable that cannot be changed', 'An expression that can be evaluated at compile time', 'A constant pointer', 'An external constant'],
        correctAnswer: 1,
        explanation: '`constexpr` specifies that the value of a variable or function can be evaluated at compile time, improving runtime performance.'
      },
      {
        question: 'What is the purpose of `std::move`?',
        options: ['It moves an object in memory', 'It casts an lvalue to an rvalue reference, enabling move semantics', 'It copies an object faster', 'It deletes the original object'],
        correctAnswer: 1,
        explanation: '`std::move` doesn\'t actually move anything; it casts its argument to an rvalue reference, allowing the compiler to invoke a move constructor or move assignment operator.'
      },
      {
        question: 'What do C++20 Concepts provide?',
        options: ['A new way to write classes', 'Compile-time constraints on template parameters', 'A replacement for inheritance', 'A conceptual framework for OOP'],
        correctAnswer: 1,
        explanation: 'Concepts allow you to specify constraints on template parameters, making template errors much easier to read and ensuring type requirements are met.'
      },
      {
        question: 'How do you capture all variables by reference in a lambda expression?',
        options: ['[=]', '[&]', '[all]', '[ref]'],
        correctAnswer: 1,
        explanation: 'The capture clause `[&]` captures all variables used in the lambda from the enclosing scope by reference.'
      },
      {
        question: 'What is a range in C++20?',
        options: ['An object that refers to a sequence of elements, providing begin() and end()', 'A new type of array', 'A mathematical interval', 'A loop constraint'],
        correctAnswer: 0,
        explanation: 'A range is an abstraction that represents a sequence of elements, typically providing `begin()` and `end()` iterators, allowing for composable operations.'
      },
      {
        question: 'Which feature allows unpacking a tuple into separate variables?',
        options: ['Structured bindings', 'Tuple unpacking', 'Auto destructuring', 'Multiple assignment'],
        correctAnswer: 0,
        explanation: 'Structured bindings (introduced in C++17) allow unpacking tuples, pairs, and structs into separate variables, e.g., `auto [x, y] = my_pair;`.'
      },
      {
        question: 'What does the `nullptr` keyword represent?',
        options: ['An integer zero', 'A null pointer literal of type std::nullptr_t', 'A void pointer', 'An uninitialized variable'],
        correctAnswer: 1,
        explanation: '`nullptr` is a type-safe null pointer literal introduced in C++11, replacing the macro `NULL`.'
      }
    ]
  },
  {
    id: 'concurrency',
    title: 'Concurrency & Multithreading',
    description: 'Threads, Mutex, Atomic, Futures',
    content: 'C++11 introduced a standard threading library, making concurrent programming portable.\n\nKey Components:\n- std::thread: Represents a single thread of execution.\n- std::mutex: Mutual exclusion to protect shared data from race conditions.\n- std::atomic: Lock-free, thread-safe operations on variables.\n- std::future & std::async: High-level abstractions for asynchronous tasks and retrieving their results.',
    example: `#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;
int counter = 0;

void incrementCounter() {
    for (int i = 0; i < 1000; ++i) {
        // Lock mutex to prevent race condition
        std::lock_guard<std::mutex> lock(mtx);
        counter++;
    }
}

int main() {
    std::thread t1(incrementCounter);
    std::thread t2(incrementCounter);

    // Wait for threads to finish
    t1.join();
    t2.join();

    std::cout << "Final counter value: " << counter << std::endl;
    return 0;
}`,
    quizzes: [
      {
        question: 'Which header is required to use std::thread?',
        options: ['<concurrency>', '<thread>', '<pthread>', '<multithread>'],
        correctAnswer: 1,
        explanation: 'The `<thread>` header provides the std::thread class for creating and managing threads.'
      },
      {
        question: 'What does `std::thread::join()` do?',
        options: ['Joins two threads together', 'Blocks the calling thread until the thread represented by the object finishes execution', 'Starts the thread', 'Detaches the thread'],
        correctAnswer: 1,
        explanation: '`join()` blocks the current thread until the thread identified by `*this` finishes its execution.'
      },
      {
        question: 'What is a race condition?',
        options: ['When threads compete for CPU time', 'When the program\'s behavior depends on the sequence or timing of uncontrollable events like thread scheduling', 'A fast execution mode', 'When a thread runs infinitely'],
        correctAnswer: 1,
        explanation: 'A race condition occurs when multiple threads access shared data concurrently, and at least one thread modifies it, leading to unpredictable results.'
      },
      {
        question: 'What is the purpose of `std::mutex`?',
        options: ['To multiply thread performance', 'To provide mutual exclusion, preventing multiple threads from accessing shared data simultaneously', 'To mutate variables', 'To synchronize thread creation'],
        correctAnswer: 1,
        explanation: 'A mutex (mutual exclusion) is used to protect shared data from being simultaneously accessed by multiple threads.'
      },
      {
        question: 'Why is `std::lock_guard` preferred over manually calling `lock()` and `unlock()`?',
        options: ['It is faster', 'It implements RAII, ensuring the mutex is automatically unlocked when it goes out of scope, even if an exception occurs', 'It uses less memory', 'It can lock multiple mutexes'],
        correctAnswer: 1,
        explanation: '`std::lock_guard` is an RAII wrapper that automatically unlocks the mutex in its destructor, preventing deadlocks if exceptions are thrown.'
      },
      {
        question: 'What does `std::atomic` provide?',
        options: ['Atomic bombs', 'Thread-safe, lock-free operations on variables', 'Automatic thread creation', 'Automatic memory management'],
        correctAnswer: 1,
        explanation: '`std::atomic` provides operations on variables that are guaranteed to be atomic (indivisible), preventing race conditions without needing explicit locks.'
      },
      {
        question: 'What is the purpose of `std::async`?',
        options: ['To run a function asynchronously and return a std::future that will hold the result', 'To synchronize threads', 'To pause a thread', 'To create a detached thread'],
        correctAnswer: 0,
        explanation: '`std::async` runs a function asynchronously (potentially in a new thread) and returns a `std::future` object to retrieve the result later.'
      },
      {
        question: 'How do you retrieve the value from a `std::future`?',
        options: ['future.value()', 'future.get()', 'future.retrieve()', 'future.result()'],
        correctAnswer: 1,
        explanation: 'The `get()` method is used to retrieve the value from a `std::future`. It blocks until the value is available.'
      },
      {
        question: 'What happens if a `std::thread` object is destroyed without being joined or detached?',
        options: ['The thread continues running', 'The program calls std::terminate()', 'The thread is automatically joined', 'The thread is automatically detached'],
        correctAnswer: 1,
        explanation: 'If a `std::thread` object is joinable when it is destroyed, the destructor calls `std::terminate()`, aborting the program.'
      },
      {
        question: 'What is a deadlock?',
        options: ['When a thread terminates unexpectedly', 'When two or more threads are blocked forever, each waiting for the other to release a resource', 'When a thread locks a mutex', 'When the CPU halts'],
        correctAnswer: 1,
        explanation: 'A deadlock occurs when two or more threads are stuck waiting for each other to release resources, causing the program to freeze.'
      }
    ]
  },
  {
    id: 'io-file-handling',
    title: 'Input/Output & File Handling',
    description: 'Iostream, Fstream, Stringstream',
    content: 'C++ uses streams for input and output operations, providing a unified interface for console, files, and strings.\n\nStream Types:\n- <iostream>: cin, cout, cerr for standard input, output, and error.\n- <fstream>: ifstream, ofstream, fstream for reading from and writing to files.\n- <sstream>: istringstream, ostringstream, stringstream for formatting strings in memory.',
    example: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Writing to a file
    std::ofstream outFile("example.txt");
    if (outFile.is_open()) {
        outFile << "Hello, File I/O in C++!" << std::endl;
        outFile.close();
    }

    // Reading from a file
    std::ifstream inFile("example.txt");
    std::string line;
    if (inFile.is_open()) {
        while (std::getline(inFile, line)) {
            std::cout << "Read: " << line << std::endl;
        }
        inFile.close();
    }

    return 0;
}`,
    quizzes: [
      {
        question: 'Which object is used for standard output in C++?',
        options: ['std::in', 'std::out', 'std::cout', 'std::print'],
        correctAnswer: 2,
        explanation: '`std::cout` is the standard character output stream object in C++.'
      },
      {
        question: 'Which class is used specifically to write data to a file?',
        options: ['std::ifstream', 'std::ofstream', 'std::fstream', 'std::file'],
        correctAnswer: 1,
        explanation: '`std::ofstream` (output file stream) is used to create files and write data to them.'
      },
      {
        question: 'What does `std::endl` do?',
        options: ['Ends the program', 'Inserts a newline character and flushes the stream', 'Closes a file', 'Ends a loop'],
        correctAnswer: 1,
        explanation: '`std::endl` inserts a newline character (\\n) into the output stream and flushes the buffer.'
      },
      {
        question: 'Which function is used to read an entire line of text, including spaces, from an input stream?',
        options: ['std::cin >>', 'std::read', 'std::getline', 'std::get'],
        correctAnswer: 2,
        explanation: '`std::getline(stream, string)` reads characters from an input stream into a string until a newline character is found.'
      },
      {
        question: 'What is the purpose of `std::stringstream`?',
        options: ['To stream video', 'To perform I/O operations on strings in memory', 'To read from files', 'To format console output'],
        correctAnswer: 1,
        explanation: '`std::stringstream` allows you to treat a string as a stream, enabling formatted reading and writing to strings in memory.'
      },
      {
        question: 'How do you check if a file stream successfully opened a file?',
        options: ['if (file.open())', 'if (file.is_open())', 'if (file.exists())', 'if (file.valid())'],
        correctAnswer: 1,
        explanation: 'The `is_open()` member function returns true if the stream is currently associated with a file.'
      },
      {
        question: 'Which stream is used for unbuffered standard error output?',
        options: ['std::cout', 'std::cerr', 'std::clog', 'std::error'],
        correctAnswer: 1,
        explanation: '`std::cerr` is the standard error stream, which is unbuffered, meaning output appears immediately.'
      },
      {
        question: 'What happens if you try to open a non-existent file with `std::ifstream`?',
        options: ['The file is created', 'An exception is thrown', 'The stream enters a fail state', 'The program crashes'],
        correctAnswer: 2,
        explanation: 'If `std::ifstream` fails to open a file, it sets the failbit, and operations on the stream will fail. You can check this using `!file` or `file.fail()`. '
      },
      {
        question: 'Which operator is used to extract data from an input stream?',
        options: ['<<', '>>', '<-', '->'],
        correctAnswer: 1,
        explanation: 'The extraction operator `>>` is used to extract formatted data from an input stream.'
      },
      {
        question: 'What mode flag is used to append data to the end of an existing file?',
        options: ['std::ios::out', 'std::ios::trunc', 'std::ios::app', 'std::ios::ate'],
        correctAnswer: 2,
        explanation: '`std::ios::app` (append) opens the file and seeks to the end before every write operation.'
      }
    ]
  }
];
