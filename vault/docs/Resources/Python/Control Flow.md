# Control Flow

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
