---
fitb: false
---
# Definitions

**Binary** - Binary comes from the Latin *bini-*, meaning --*having two parts*--. In programming, binary often refers to the base-2 number system which consists of only --zeroes-- and --ones--.

**Octal** - Octal comes from the Latin *oct-*, meaning *--eight--*. Octal refers to the base-8 number system which consists of the digits --zero-- through --seven--.

**Decimal** - Decimal comes from the Latin *deci-*, meaning *--tenth--*. Decimal refers to the base-10 number system which consists of the digits --zero-- through --nine--.

**Hexadecimal** - Hexadecimal comes from the Latin *hex*- meaning *six* and *deci-* meaning *tenth*. Hexadecimal refers to the base-16 number system which consists of the numeric digits zero through 9 and an additional six --alphabetic-- digits; A, B, C, D, E, F.

**Bit** - A bit is a --**binary**-- digit, which is the smallest unit of --information--. A bit may only occupy one of two states at a time. A bit can either be zero or one, low or high, off or on, false or true respectively.

**Memory** - Memory is a term describing how computers store --information--, usually in the form of **bits** and **bytes**.

**Volatile Memory** - Volatile memory is a kind of memory that requires active power to store information, meaning that volatile memory --*cannot*-- survive a power cycle. Volatile memory is typically faster than --**persistent storage**--.

**Persistent Storage** - Persistent storage is a kind of memory that *does not* require active power to store information, meaning that persistent memory *--can--* survive a power cycle. Persistent memory is usually slower than --**volatile memory**--.

**Byte** - A byte consists of eight **--bits--** and is the smallest --**addressable**-- unit of **memory** in a modern computer.

**Memory Address** - A memory address is a --**binary**-- number (usually 32 **bits** wide or 64 **bits** wide), which describes the physical location of a chunk in **memory**. It is less efficient to address individual **bits** so a computer's **memory** is broken into chunks called **bytes** where each **byte** has its own address.

**Program** - A program is a sequence of --instructions-- written to be executed by a computer.

**Hardware** - Hardware are the --physical components-- that comprise a computer.

**Software** - Software are the **--programs--** that a computer executes.

**Series / Serial** - In programming, serial refers to the processing of data --*sequentially*--, meaning one at a time.

**Parallel / Concurrent** - In programming, parallel refers to the processing of data --*simultaneously*--, meaning at the same time.

**CPU** - A CPU or --*central processing unit*-- is **hardware** optimized to execute instructions in **series**.

**GPU** - A GPU or --*graphics processing unit*-- is **hardware** optimized to execute instructions in **parallel**.

**Read** - In programming, reading refers to the process of copying a value from --**memory**-- to the --**CPU**--.

**Write** - In programming, writing refers to the process of copying a value from the --**CPU**-- to --**memory**--.

**Random Access** - Random access means that **read** operations take the same time regardless of their --location in memory--.

**RAM** - RAM or ***--random access memory--*** is a kind of **volatile memory** that stores information via electric switches. Because there are no moving parts or magnetic switches, RAM is incredibly fast.

**HDD** - An HDD or *--hard disk drive--* is a kind of **persistent storage** that stores information on a spinning disk using a magnetic head. Because the disk has to be physically moved to **read** or **write** to certain locations, an HDD *is not* a form of **random access storage**.

**SSD** - An SSD or *--solid state drive--* is a kind of **persistent storage** that stores information via magnetic switches. Because there are no moving parts, an SSD *is* a form of **random access storage**.

**ODD** - An ODD or *--optical disk drive--* is a kind of **persistent storage** that stores information on a spinning disk using a laser. Because the disk has to be physically moved to **read** or **write** to certain locations, an ODD **is not** a form of **random access storage**.

**Programming Language** - A programming language is a set of --**grammar**-- and --**syntax**-- used to write **programs**.

**Syntax** - In programming, syntax refers to the --symbols-- that comprise a **programming language**. A syntax error occurs when a symbol is unrecognized or used incorrectly.

**Grammar** - In programming, grammar refers to how --symbols-- of a **programming language** are --arranged--.

**Reserved Words** - In a programming language, reserved words are --symbols-- that cannot be used to name functions, variables or other elements. In Python, some examples of reserved words include `import`, `def`, `not`, `and`, `or`,`if`, `elif`, `else`, `for`, `while`,  `pass`, `break`, `continue`.

**Machine Language** - Machine language is a **programming language** that consists of --**binary**-- instructions intended for a specific --**hardware** platform--.

**Assembly Language** - Assembly language is a **programming language** that consists of human-readable shorthand in the place of **binary** instructions. Assembly language is translated into **--machine language--** ahead of time by an **assembler**

**Assembler** - An assembler is a **program** that consumes **--assembly language--** and translates it to **--machine language--** ahead of time.

**Compiled Language** - A compiled language is a **programming language** that is translated into **--machine language--** ahead of time by a **--compiler--**. Examples of compiled languages include C, C++, and Rust.

**Compiler** - A compiler is a **program** that consumes a **--compiled language--** and translates it into **--machine language--** ahead of time.

**Interpreted Language** - An interpreted language is a **programming language** that is translated into **--machine language--** in realtime by an --**interpreter**--. Examples of interpreted languages include JavaScript, Ruby, and Python.

**Interpreter** - An interpreter is a **program** that consumes an **--interpreted language--** and translates it into **--machine language--** in realtime.

**Virtual Machine Language** - A virtual machine language is a **programming language** that is translated ahead of time into an intermediate language by a --**compiler**--, which is then translated into **machine language** by a **--virtual machine--** at runtime. Examples of virtual machine languages include Java, C#, and Kotlin.

**Virtual Machine** - A virtual machine is a special type of **interpreter** that consumes an intermediate language and translates it into **machine language**.

**IDE** - An IDE or *--integrated development environment--* is a special editor for writing programs.

**Iterable** - Something iterable can be --consumed-- one element at a time. Think of an iterable like a deck of cards where each card is a single element.

**Iterator** - An iterator --consumes or produces-- one element at a time.

**Comment** - In programming, comments are a way to include --arbitrary text-- in your **program** that isn't interpreted as code. Comments are often used to leave notes in your code for your future self or other programmers.

**Variable** - A variable is how to store and access --data-- in a **program**. Think of a variable as a named box that holds a value.

**Data Type** - A data type describes how certain --**binary**-- data should be interpreted by a **program**. In our variable-as-box analogy, think of a data type as a --label-- that describes what is in the box. In Python, some important data types include **integers**, **floats**, **strings**, **booleans**, **lists**, and **sets**.

**Integer** - An integer is a --whole number--, meaning without a fractional part. In Python an *integer literal* is denoted using numeric characters `0 - 9`and signs `+, -`.

**Float** - A float or *floating-point number* is a --fractional number--. In Python a *float literal* is denoted using numeric characters `0 - 9`, signs `-, +`, and a decimal point `.`

**String** - A string is a sequence of --**characters**-- or text symbols. In Python a *string literal* is denoted using single `'` or double `"` quotes.

**Boolean** - A boolean is a special data type that can be either `True` or `False`. 

**List** - A list is a --sequence-- of elements. In some languages a list is referred to as an array. In Python, a *list literal* is denoted using square brackets `[ ]` and commas `,`.

```py
# a list of strings
myList = [ "Apple", "Banana", "Coconut", "Apple" ]
print(myList) # [ "Apple", "Banana", "Coconut", "Apple" ]

# a list of integers
myList = [ 1, 2, 2, 3, 3, 3 ]
print(myList) # [ 1, 2, 2, 3, 3, 3 ]
```

**Set** - A set is a **list** that contains no --duplicates--. In Python, a *set literal* is denoted using curly braces `{ }` and commas `,`.

```py
# a set of strings
mySet = { "Apple", "Banana", "Coconut", "Apple" }
print(mySet) # { "Apple", "Banana", "Coconut" }

# a set of integers
mySet = { 1, 2, 2, 3, 3, 3 }
print(mySet) # { 1, 2, 3 }
```

**Character** - A character is a **--binary--** number that represents a text symbol.

**ASCII** - ASCII or the *American Standard Code for Information Interchange* maps the first 256 **binary** numbers (`0 - 255`) to 256 different symbols.

**Unicode** - The unicode standard maps over one million **binary** numbers to different symbols, and the standard continues to grow and change. The first 256 characters in the unicode standard are taken directly from ASCII for the purposes of backwards compatibility.

**UTF** - UTF or ***Unicode** Transformation Format* is a common way of formatting unicode text.

**Whitespace** - Whitespace refers to text symbols that represent empty space, such as -

| Name            | Decimal | Hex    | Escape Sequence |
| --------------- | ------- | ------ | --------------- |
| Space           | `32`    | `0x20` | `\u0020`        |
| Tab             | `9`     | `0x09` | `\u0009`, `\t`  |
| New Line        | `10`    | `0x0A` | `\u000A`, `\n`  |
| Carriage Return | `13`    | `0x0D` | `\u000D`, `\r`  |

**Function** - A function is a --reusable block of code-- with inputs called **parameters** and an output called a **return**. In Python a function is --*defined*-- using the keyword `def`, followed by its name and **parameters** in parentheses. A function is *called* by referencing its name followed by **arguments** in parentheses.
```py
# define the function named "hello" with the parameters "name" and "age"
def hello(name, age):
	# this function returns a string
	return "Hello, my name is " + name + ", and I am " + str(age) + "years old!"

# call the function named "hello" with the arguments "Gandalf" and "24000"
# call the function named "print" using the output from "hello" as an argument
print( hello("Gandalf", 24000) )
```

**Parameter** - A parameter defines an --input-- to a **function**. In Python, parameters go between parentheses when defining a **function**.
```py
# defines a function named "myFunction" with a parameter named "myParameter"
def myFunction(myParameter):
```

**Argument** - An argument is an input to a **function**. In Python, arguments go between parentheses when calling a **function**.
```py
# calls a function named "myFunction" with the argument "12".
myFunction(12)
```

**Return** - A return is the --output-- of a function. In Python, a return is always inside of a function and preceded by the keyword `return`
```py
def myFunction(myParameter):
	# the output of this function is two times the input
	return myParameter * 2
```

**CLI** - A CLI or *--command-line interface--* is a way to interact with a program via text in a terminal.

**GUI** - A GUI or *--graphical user interface--* is a way to interact with a program via graphics on a display.

**Standard Input** - Standard input refers to the *--command-line--* input of a program. In Python, a program can read from the standard input using the built-in `input()` function.

**Standard Output** - Standard output refers to the *--command-line--* output of a program. In Python, a program can write to the standard output using the built-in `print()` function.

**Expression** - An expression is a block of code that can be --evaluated--, meaning reduced to a single value. For example, the expression `2 + 2` evaluates to the **integer** value `4`. The expression `1 / 2` evaluates to the **float** value `0.5`.

**Condition** - A condition is an --**expression**-- that evaluates to `True` or `False`.

**Operator** - In programming, an operator is a special symbol that operates on values in an **--expression--**. An operator behaves similarly to a --**function**-- in that it receives one or more **arguments** as input and returns a single output.

**Unary Operator** - A unary operator is an **operator** that accepts a single --**argument**--. Some examples of unary operators in Python include `-`, `~`, `not`.

**Binary Operator** - A binary operator is an **operator** that accepts two --**arguments**--. Some examples of binary operators in Python include `+`, `-`, `*`, `/`, `**`, `//`, `%`, `&`, `|`, `^`, `and`, `or`

**Control Flow** - In programming, control-flow describes how your program --makes decisions--, also known as --*branching*--.

%% PAGE BREAK %%<div style="page-break-after: always;"></div>
# Python

## Comments

Many programming languages support the use of comments which are a way to include arbitrary text in your code. Comments are often used to leave notes in your code for your future self or other programmers. In Python, adding a comment looks like this -

```py
# Everything on this line after the "#" is a comment!
```

Everything on a line after a `#` is considered a comment by the Python interpreter and will be ignored when running your code.
## Variables

Variables are how you store and access data in a **program**. In Python, a variable always has a name, a **type**, and a value. It is useful to think of a variable as a box that stores a thing. A value is what is stored in the box, a type describes what is stored in the box, and a name is a unique way of identifying the box.

In Python a variable can be assigned via the assignment operator `=`, which looks like -

```py
a = 0      # The variable named "a" is assigned to the integer value "0"
b = 0.0    # The variable named "b" is assigned to the floating point value "0.0"
c = False  # The variable named "c" is assigned to the boolean value "False"
d = "Zero" # The variable named "d" is assigned to the string value "Zero"
```
## Data Types

In a modern computer all data exists as a simple **binary** sequence which is meaningless without context. This is why data types are useful.

Data types describe how certain data should be handled by your program. Different values can have the same binary representation yet mean different things depending on their data type. A good example of this is the 32-bit hexadecimal value `0x3f800000` which represents the integer `1065353216`, meanwhile that same value represents the floating-point decimal `1.0`.

In Python some important data types include -

| Name       | Symbol  |
| ---------- | ------- |
| None       | `None`  |
| Integer    | `int`   |
| Float      | `float` |
| String     | `str`   |
| Boolean    | `bool`  |
| List       | `list`  |
| Dictionary | `dict`  |
| Set        | `set`   |

**None** - In Python, `None` is used to describe something that has no value. It is denoted via the symbol `None`.

**Integer** - An integer is a whole number, meaning without a fractional part. In Python an *integer literal* is denoted using numeric characters `0 - 9`and signs `+, -`.

**Float** - A float or *floating-point number* is a fractional number. In Python a *float literal* is denoted using numeric characters `0 - 9`, signs `-, +`, and a decimal point `.`

**String** - A string is a sequence of **characters** or text symbols. In Python a *string literal* is denoted using single `'` or double `"` quotes.

**Boolean** - A boolean is a special data type that can be either `True` or `False`. 

**List** - A list is a sequence of elements. In some languages a list is referred to as an array. In Python, a *list literal* is denoted using square brackets `[ ]` and commas `,`.

```py
# a list of strings
myList = [ "Apple", "Banana", "Coconut", "Apple" ]
print(myList) # [ "Apple", "Banana", "Coconut", "Apple" ]

# a list of integers
myList = [ 1, 2, 2, 3, 3, 3 ]
print(myList) # [ 1, 2, 2, 3, 3, 3 ]
```

**Set** - A set is a **list** that contains no duplicates. In Python, a *set literal* is denoted using curly braces `{ }` and commas `,`.

```py
# a set of strings
mySet = { "Apple", "Banana", "Coconut", "Apple" }
print(mySet) # { "Apple", "Banana", "Coconut" }

# a set of integers
mySet = { 1, 2, 2, 3, 3, 3 }
print(mySet) # { 1, 2, 3 }
```
## Standard Input / Output

### `print()`

Standard output refers to the *command-line* output of a program. In Python, a program can write to the standard output using the built-in `print()` function.

```py
print("Hello World") # write the string "Hello World" to the standard output
```

### `input()`

Standard input refers to the *command-line* input of a program. In Python, a program can read from the standard input using the built-in `input()` function.

```py
name = input("What is your name? ") # read a string from the standard input and assign it to the variable "name"
```

>[!warning] A Note on Standard Input in Python
>In Python, the `input()` function will always return a **string**. Be cognizant of this when trying to perform operations like arithmetic where the strings must be first parsed into a numeric type.
## Operators

### Assignment Operator

| Name       | Symbol | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| Assignment | `=`    | Assigns a value or the result of an expression to a variable. |
### Arithmetic Operators

Unary Arithmetic Operators

| Name     | Symbol | Signature | Description                                                                 |
| -------- | ------ | ----- | --------------------------------------------------------------------------- |
| Positive | `+`    | `+ a` | Returns a numeric type with the sign unchanged. |
| Negative | `-`    | `- a` | Returns a numeric type with the sign inverted.  |

Binary Arithmetic Operators

| Name           | Symbol | Signature | Description                                         |
| -------------- | ------ | --------- | --------------------------------------------------- |
| Addition       | `+`    | `a + b`   | Returns the sum of two numeric types.               |
| Subtraction    | `-`    | `a - b`   | Returns the difference of two numeric types.        |
| Multiplication | `*`    | `a * b`   | Returns the product of two numeric types.           |
| Exponentiation | `**`   | `a ** b`  | Returns the power of two numeric types.             |
| Division       | `/`    | `a / b`   | Returns the quotient of two numeric types.          |
| Floor Division | `//`   | `a // b`  | Returns the integer quotient of two numeric types.  |
| Remainder      | `%`    | `a % b`   | Returns the integer remainder of two numeric types. |
### Comparison Operators

| Name                     | Symbol | Description                                                                                              |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| Equal To                 | `==`   | Returns `True` if two values are equal. Returns `False` otherwise.                                       |
| Not Equal To             | `!=`   | Returns `True` if two values are NOT equal. Returns `False` otherwise.                                   |
| Less Than                | `<`    | Returns `True` if the left value is less than the right value. Returns `False` otherwise.                |
| Less Than OR Equal To    | `<=`   | Returns `True` if the left value is less than or equal to the right value. Returns `False` otherwise.    |
| Greater Than             | `>`    | Returns `True` if the left value is greater than the right value. Returns `False` otherwise.             |
| Greater Than OR Equal To | `>=`   | Returns `True` if the left value is greater than or equal to the right value. Returns `False` otherwise. | 

> [!warning] A Note on Assignment and Equality
> A common pitfall when checking for equality `==` is to accidentally use assignment `=`. In most cases this will be interpreted without an error, but will result in undefined or unexpected behavior.
### Boolean Operators

Boolean operators are used to join **boolean** expressions and values.

| Name        | Symbol | Signature | Description                                                                                |
| ----------- | ------ | --------- | ------------------------------------------------------------------------------------------ |
| Boolean NOT | `not`  | `not a`   | Unary boolean operator. Returns `True` if the right value is `False`, returns `False` otherwise. |
| Boolean AND | `and`  | `a and b` | Returns `True` if both the left and right values are `True`, returns `False` otherwise.    |
| Boolean OR  | `or`   | `a or b`  | Returns `True` if either left or right value is `True`, returns `False` otherwise.       |

# Truth Tables

**NOT** - Returns `True` if the input is `False` otherwise returns `False`.

| NOT | True  | False |
| --- | ----- | ----- |
|     | False | True  |

 **AND** - Returns `True` iff both inputs are `True`, otherwise returns `False`.

| AND   | True  | False |
| ----- | ----- | ----- |
| True  | True  | False |
| False | False | False |

**OR** - Returns `True` if either input is `True`, otherwise returns `False`.

| OR    | True | False |
| ----- | ---- | ----- |
| True  | True | True  |
| False | True | False |

**XOR** - Stands for *exclusive or*. Returns `True` iff both inputs are different, otherwise returns `False`.

| XOR   | True  | False |
| ----- | ----- | ----- |
| True  | False | True  |
| False | True  | False |

**NAND** - Stands for *not and*. Returns `True` if either input is `False`, otherwise returns `False`.

| NAND  | True  | False |
| ----- | ----- | ----- |
| True  | False | True  |
| False | True  | True  |

**NOR** - Stands for `not or`. Returns `True` iff both inputs are `False`, otherwise returns `False`

| NOR   | True  | False |
| ----- | ----- | ----- |
| True  | False | False |
| False | False | True  |

**XNOR** - Stands for `exclusive nor`. Returns `True` iff both input are the same, otherwise returns `False`.

| XNOR  | True  | False |
| ----- | ----- | ----- |
| True  | True  | False |
| False | False | True  |
## Control Flow

In programming, control-flow describes how your program makes decisions, also known as *branching*. In Python, some control-flow keywords include `if`, `else`, `elif`, `while`, `for ... in`
### Branching
### `if`
The `if` keyword indicates a block of code should run when its **condition** is met.

An example `if` statement might look like - 
```py
if number <  0:
	print("Number is less than zero!")
```

### `else`
The `else` keyword indicates a block of code should run when the **condition** above it fails. The `else` keyword must always follow an `if` statement or an `elif` statement.

An example `if`, `else` chain might look like -
```py
if number == 7:
	print("Number is Seven!")
else:
	print("Number is NOT Seven!")
```

### `elif`
The `elif` keyword indicates a block of code should run when the **condition** above it fails AND its **condition** is met. The `elif` keyword must follow an `if` statement or an `elif` statement.

An example `if`, `elif`, `else` chain might look like -
```py
if   number < 0:
	print("Number is negative!")
elif number > 0:
	print("Number is positive!")
else:
	print("Number is zero!")
```
### Looping
A loop is a block of code that is run repeatedly (none or more times).
### `while`
The `while` keyword indicates a block of code should run repeatedly until a **condition** is met.

An example `while` loop might look like -
```py
number = 0
while number < 10:
	print("I love Robotics!")
	number = number + 1
```

### `for ... in`
The `for ... in` keywords are used to **iterate** over an **iterable**. An **iterable** is something that can be consumed one element at a time. Think of an **iterable** like a deck of cards, where each element is a card. When you **iterate** over a deck of cards, you **consume** one card at a time by drawing it.

A `for ... in` statement requires a **variable** and an **iterable**. Each iteration will consume one element from the iterable set and assign it to the variable. An example of a `for ... in` loop might look like -

```py
# the range() function generates an iterable range we can iterate over
# each element in our range is assigned to the variable 'n'
# this program will count from 0 to 9

for n in range(10):
	print(n)
```

%% PAGE BREAK %%<div style="page-break-after: always;"></div>
## Functions

**Function** - A function is a reusable block of code with inputs called **parameters** and an output called a **return**. In Python a function is *defined* using the keyword `def`, followed by its name and **parameters** in parentheses. A function is *called* by referencing its name followed by **arguments** in parentheses.

```py
# define the function named "hello" with the parameters "name" and "age"
def hello(name, age):
	# this function returns a string
	return "Hello, my name is " + name + ", and I am " + str(age) + "years old!"

# call the function named "hello" with the arguments "Gandalf" and "24000"
# call the function named "print" using the output from "hello" as an argument
print( hello("Gandalf", 24000) )
```