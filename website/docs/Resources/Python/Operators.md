# Operators

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

:::warning A Note on Assignment and Equality

A common pitfall when checking for equality `==` is to accidentally use assignment `=`. In most cases this will be interpreted without an error, but will result in undefined or unexpected behavior.
:::

### Boolean Operators

Boolean operators are used to join **boolean** expressions and values.

| Name        | Symbol | Signature | Description                                                                                |
| ----------- | ------ | --------- | ------------------------------------------------------------------------------------------ |
| Boolean NOT | `not`  | `not a`   | Unary boolean operator. Returns `True` if the right value is `False`, returns `False` otherwise. |
| Boolean AND | `and`  | `a and b` | Returns `True` if both the left and right values are `True`, returns `False` otherwise.    |
| Boolean OR  | `or`   | `a or b`  | Returns `True` if either left or right value is `True`, returns `False` otherwise.       |
