factorial(n)
  :factorial(n - 1) * n if n > 1 else 1

print(factorial(5))