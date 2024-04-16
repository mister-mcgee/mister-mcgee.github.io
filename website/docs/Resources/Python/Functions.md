# Functions

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
