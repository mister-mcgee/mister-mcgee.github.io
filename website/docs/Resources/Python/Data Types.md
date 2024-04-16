# Data Types

In a modern computer all data exists as a simple **binary** sequence which is meaningless without context. This is why data types are useful.

Data types describe how certain data should be handled by your program. Different values can have the same binary representation yet mean different things depending on their data type. A good example of this is the 32-bit hexadecimal value `0x3f800000` which represents the integer `1065353216`, meanwhile that same value represents the floating-point decimal `1.0`.

In Python some important data types include -

| Name       | Symbol  | **Description**                                                                                                                                                           |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| None       | `None`  | In Python, `None` is used to describe something that has no value. It is denoted via the symbol `None`.                                                                   |
| Integer    | `int`   | An integer is a whole number, meaning without a fractional part. In Python an *integer literal* is denoted using numeric characters `0 - 9`and signs `+, -`.              |
| Float      | `float` | A float or *floating-point number* is a fractional number. In Python a *float literal* is denoted using numeric characters `0 - 9`, signs `-, +`, and a decimal point `.` |
| String     | `str`   | A string is a sequence of **characters** or text symbols. In Python a *string literal* is denoted using single `'` or double `"` quotes.                                  |
| Boolean    | `bool`  | A boolean is a special data type that can be either `True` or `False`.                                                                                                    |
| List       | `list`  | A list is a sequence of elements. In some languages a list is referred to as an array. In Python, a *list literal* is denoted using square brackets `[ ]` and commas `,`. |
| Set        | `set`   | A set is a **list** that contains no duplicates. In Python, a *set literal* is denoted using curly braces `{ }` and commas `,`.                                           |
| Dictionary | `dict`  |                                                                                                                                                                           |
### List

```py
# a list of strings
myList = [ "Apple", "Banana", "Coconut", "Apple" ]
print(myList) # [ "Apple", "Banana", "Coconut", "Apple" ]

# a list of integers
myList = [ 1, 2, 2, 3, 3, 3 ]
print(myList) # [ 1, 2, 2, 3, 3, 3 ]
```

### Set

```py
# a set of strings
mySet = { "Apple", "Banana", "Coconut", "Apple" }
print(mySet) # { "Apple", "Banana", "Coconut" }

# a set of integers
mySet = { 1, 2, 2, 3, 3, 3 }
print(mySet) # { 1, 2, 3 }
```

### Dict
