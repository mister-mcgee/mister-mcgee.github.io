# Data Types

In a modern computer all data exists in the form of a [binary](/docs/Resources/Glossary/Binary) sequence. Take the following string of [bytes](docs/Resources/Glossary/Byte.md) as an example -

`01101000 01100101 01101100 01101100 01101111 01110111 01101111 01110010 01101100 01100100` 

If I were to ask you to determine the meaning of the binary string above, then you might be confused and rightfully so. Without context, the several billions of bits that comprise your computer's [memory](/docs/Resources/Glossary/Memory) are meaningless to a human reader, so how does your program know what to do with them?

This the purpose of data types, which describe how certain data should be handled by your program. In the earlier example, the binary sequence is actually an [ASCII](https://en.wikipedia.org/wiki/ASCII) encoded string of characters, which means that each [byte](docs/Resources/Glossary/Byte.md) corresponds to one of 256 symbols indicated by the standard. Referencing the following section of the ASCII standard we can see that our string of [bytes](docs/Resources/Glossary/Byte.md) actually decodes to the text `helloworld`.

| **Symbol** | **Binary** | **Symbol** | Binary     |
| ---------- | ---------- | ---------- | ---------- |
| `a`        | `01100001` | `n`        | `01101110` |
| `b`        | `01100010` | `o`        | `01101111` |
| `c`        | `01100011` | `p`        | `01110000` |
| `d`        | `01100100` | `q`        | `01110001` |
| `e`        | `01100101` | `r`        | `01110010` |
| `f`        | `01100110` | `s`        | `01110011` |
| `g`        | `01100111` | `t`        | `01110100` |
| `h`        | `01101000` | `u`        | `01110101` |
| `i`        | `01101001` | `v`        | `01110110` |
| `j`        | `01101010` | `w`        | `01110111` |
| `k`        | `01101011` | `x`        | `01111000` |
| `l`        | `01101100` | `y`        | `01111001` |
| `m`        | `01101101` | `z`        | `01111010` |

Standards are important to the world of computing and ASCII is just one such example. Most modern text is encoded using the ubiquitous [UTF-8](https://en.wikipedia.org/wiki/UTF-8) standard which includes the same 256 characters as its ASCII predecessor, while also making room for an additional 1.1 million symbols. Beside character encodings, another common standard is [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) which describes how to encode a wide range of numbers in binary.

One of the interesting consequences of contextual data types is that different values can have the same underlying binary representation in [memory](/docs/Resources/Glossary/Memory). Take, for example, the 32-bit binary sequence `00111111 10000000 00000000 00000000` which represents the integer number `1065353216`, meanwhile that same sequence represents the IEEE-754 floating-point number `1.0`.

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
