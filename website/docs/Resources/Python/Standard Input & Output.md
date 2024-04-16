# Standard Input / Output

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

:::warning A Note on Standard Input in Python

In Python, the `input()` function will always return a **string**. Be cognizant of this when trying to perform operations like arithmetic where the strings must be first parsed into a numeric type.
