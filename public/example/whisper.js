class Index {
  constructor(idx, row, col) {
    this.idx = idx ?? 0
    this.row = row ?? 1
    this.col = col ?? 1
  }

  next(s, n=1) {
    let idx = this.idx
    let row = this.row
    let col = this.col

    for(let i = 0; i < n; i ++) {
      idx += 1
      if(s &&
        idx <= s.length &&
        s[idx - 1] == "\n"
      ) {
        row += 1
        col  = 1
      } else {
        col += 1
      }
    }

    return new Index(idx, row, col)
  }

  peek(s) {
    return s.slice(this.idx, this.idx + 1)
  }

  to(b) {
    return b.idx - this.idx
  }

  toString() {
    return `${this.row}:${this.col}`
  }
}

class Range {
  constructor(from, to) {
    this.from = from
    this.to   = to
  }

  peek(s) {
    return s.slice(this.from.idx, this.to.idx)
  }

  toString() {
    return `${this.from.toString()} - ${this.to.toString()}`
  }
}

const Token = Object.freeze({
  // id
  ID: "ID",

  // keywords
  VAR : "VAR",
  IF  : "IF",
  ELIF: "ELIF",
  ELSE: "ELSE",
  EACH: "EACH",
  IN  : "IN",
  LOOP: "LOOP",
  NOT : "NOT",
  AND : "AND",
  OR  : "OR",
  XOR : "XOR",
  IS  : "IS",
  AYE : "AYE",
  NAY : "NAY",

  // separators
  L_PAREN: "L_PAREN",
  R_PAREN: "R_PAREN",
  L_BRACE: "L_BRACE",
  R_BRACE: "R_BRACE",
  L_BRACK: "L_BRACK",
  R_BRACK: "R_BRACK",
  COLON  :   "COLON",
  COMMA  :   "COMMA",

  // operators
  DOT:        "DOT",
  DOT_DOT:    "DOT_DOT",
  EQUAL:      "EQUAL",
  EQUAL_EQUAL:"EQUAL_EQUAL",
  PLUS:       "PLUS",
  PLUS_PLUS:  "PLUS_PLUS",
  PLUS_EQUAL: "PLUS_EQUAL",
  MINUS:      "MINUS",
  MINUS_MINUS:"MINUS_MINUS",
  MINUS_EQUAL:"MINUS_EQUAL",
  STAR:       "STAR",
  STAR_EQUAL: "STAR_EQUAL",
  SLASH:      "SLASH",
  SLASH_EQUAL:"SLASH_EQUAL",
  LESS:       "LESS",
  LESS_EQUAL: "LESS_EQUAL",
  MORE:       "MORE",
  MORE_EQUAL: "MORE_EQUAL",

  // literals
  STRING : "STRING",
  NUMBER : "NUMBER",
  COMMENT: "COMMENT",
})

class Lexeme {
  constructor(range, token, value) {
    this.range = range
    this.token = token
    this.value = value
  }
}

function isDigit(c) {
  return c && (c >= "0" && c <= "9")
}

function isLower(c) {
  return c && (c >= "a" && c <= "z")
}

function isUpper(c) {
  return c && (c >= "A" && c <= "Z")
}

function isAlpha(c) {
  return isLower(c) || isUpper(c)
}

function isUnder(c) {
  return c == "_"
}

class Lexer {
  constructor(s) {
    this.s = s
    this.i = new Index()
  }

  eof() {
    return this.i.idx >= this.s.length
  }

  ahead(n = 1) {
    return this.i.next(this.s, n)
  }

  range(n = 1) {
    return new Range(
      this.ahead(0),
      this.ahead(n)
    )
  }

  read(n = 1) {
    const a = this.ahead(0)
    const b = this.ahead(n)
    this.i  = this.ahead(n)
    return new Range(a, b).peek(this.s)
  }

  string() {
    let a = this.ahead(0 )
    let b = this.ahead(1 )
    let c = a.peek(this.s)
    let d = b.peek(this.s)

    if(!(c === "'" || c === '"'))
      throw new Error(`[Lexer.string] expected ' or ", got '${c}' on line ${a.toString()}`)

    while(true) {
      switch(d) {
        case c: return new Lexeme(new Range(a, b), Token.STRING, this.read(a.to(b) + 1))
        case ""  : throw new Error(`[Lexer.string] unexpected end of file on line ${b.toString()}`)
        case "\n": throw new Error(`[Lexer.string] unexpected end of line on ${b.toString()}`)
        case "\r": throw new Error(`[Lexer.string] unexpected end of line on ${b.toString()}`)
        default: {          
          b = b.next(this.s)
          d = b.peek(this.s)
        } break;
      }
    } 
  }

  number() {
    let a = this.ahead(0 )
    let b = this.ahead(1 )
    let c = a.peek(this.s)
    let d = b.peek(this.s)
    let dot = c === "."

    if(!(isDigit(c) || c === "."))
      throw new Error(`[Lexer.number] expected digit or decimal, got '${c}' on line ${a.toString()}`)

    while(d && isDigit(d)) {
      b = b.next(this.s)
      d = b.peek(this.s)
    }
    if(!dot && d === ".") {
      b = b.next(this.s)
      d = b.peek(this.s)
      while(d && isDigit(d)) {
        b = b.next(this.s)
        d = b.peek(this.s)
      }
      dot = true
    }

    return new Lexeme(new Range(a, b), Token.NUMBER, this.read(a.to(b)))
  }

  unique() {
    let a = this.ahead(0 )
    let b = this.ahead(1 )
    let c = a.peek(this.s)
    let d = b.peek(this.s)

    if(!(isAlpha(c) || c === "_"))
      throw new Error(`[Lexer.unique] expected letter or underscore, got '${c}' on line ${a.toString()}`)

    while(d && (isAlpha(d) || isDigit(d) || d === "_")) {
      b = b.next(this.s)
      d = b.peek(this.s)
    }

    switch(new Range(a, b).peek(this.s)) {
      case "var" : return new Lexeme(new Range(a, b), Token.VAR , this.read(a.to(b)))
      case "if"  : return new Lexeme(new Range(a, b), Token.IF  , this.read(a.to(b)))
      case "elif": return new Lexeme(new Range(a, b), Token.ELIF, this.read(a.to(b)))
      case "else": return new Lexeme(new Range(a, b), Token.ELSE, this.read(a.to(b)))
      case "each": return new Lexeme(new Range(a, b), Token.EACH, this.read(a.to(b)))
      case "in"  : return new Lexeme(new Range(a, b), Token.IN  , this.read(a.to(b)))
      case "loop": return new Lexeme(new Range(a, b), Token.LOOP, this.read(a.to(b)))
      case "not" : return new Lexeme(new Range(a, b), Token.NOT , this.read(a.to(b)))
      case "and" : return new Lexeme(new Range(a, b), Token.AND , this.read(a.to(b)))
      case "or"  : return new Lexeme(new Range(a, b), Token.OR  , this.read(a.to(b)))
      case "xor" : return new Lexeme(new Range(a, b), Token.XOR , this.read(a.to(b)))
      case "is"  : return new Lexeme(new Range(a, b), Token.IS  , this.read(a.to(b)))
      case "aye" : return new Lexeme(new Range(a, b), Token.AYE , this.read(a.to(b)))
      case "nay" : return new Lexeme(new Range(a, b), Token.NAY , this.read(a.to(b)))
      default    : return new Lexeme(new Range(a, b), Token.ID  , this.read(a.to(b)))
    }
  }

  comment() {
    let a = this.ahead(0 )
    let b = this.ahead(1 )
    let c = a.peek(this.s)
    let d = b.peek(this.s)

    if(c !== "!")
      throw new Error(`[Lexer.comment] expected '!', got '${c}' on line ${a.toString()}`)

    while(d && d !== "\n" && d !== "\r") {
      b = b.next(this.s)
      d = b.peek(this.s)
    }

    return new Lexeme(new Range(a, b), Token.COMMENT, this.read(a.to(b)))
  }

  next() {
    while(!this.eof()) {
      const c = this.ahead(0).peek(this.s)
      switch(c) {
        // whitespace
        case " ":
        case "\t":
        case "\n":
        case "\r": this.read(); break;

        // separators
        case "(": return new Lexeme(this.range(1), Token.L_PAREN, this.read(1))
        case ")": return new Lexeme(this.range(1), Token.R_PAREN, this.read(1))
        case "{": return new Lexeme(this.range(1), Token.L_BRACE, this.read(1))
        case "}": return new Lexeme(this.range(1), Token.R_BRACE, this.read(1))
        case "[": return new Lexeme(this.range(1), Token.L_BRACK, this.read(1))
        case "]": return new Lexeme(this.range(1), Token.R_BRACK, this.read(1))
        case ":": return new Lexeme(this.range(1), Token.  COLON, this.read(1))
        case ",": return new Lexeme(this.range(1), Token.  COMMA, this.read(1))

        // operators
        case "+": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.PLUS_EQUAL, this.read(2))
            case "+": return new Lexeme(this.range(2), Token.PLUS_PLUS , this.read(2))
            default : return new Lexeme(this.range(1), Token.PLUS      , this.read(1))
          }
        } break;

        case "-": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.MINUS_EQUAL, this.read(2))
            case "-": return new Lexeme(this.range(2), Token.MINUS_MINUS, this.read(2))
            default : return new Lexeme(this.range(1), Token.MINUS      , this.read(1))
          }
        } break;

        case "*": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.STAR_EQUAL, this.read(2))
            default : return new Lexeme(this.range(1), Token.STAR      , this.read(1))
          }
        } break;

        case "/": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.SLASH_EQUAL, this.read(2))
            default : return new Lexeme(this.range(1), Token.SLASH      , this.read(1))
          }
        } break;

        case "=": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.EQUAL_EQUAL, this.read(2))
            default : return new Lexeme(this.range(1), Token.EQUAL      , this.read(1))
          }
        } break;

        case "<": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.LESS_EQUAL, this.read(2))
            default : return new Lexeme(this.range(1), Token.LESS      , this.read(1))
          }
        } break;

        case ">": {
          switch(this.ahead().peek(this.s)) {
            case "=": return new Lexeme(this.range(2), Token.MORE_EQUAL, this.read(2))
            default : return new Lexeme(this.range(1), Token.MORE      , this.read(1))
          }
        } break;

        case ".": {
          switch(this.ahead().peek(this.s)) {
            case ".": return new Lexeme(this.range(2), Token.DOT_DOT   , this.read(2))
            default : return new Lexeme(this.range(1), Token.DOT       , this.read(1))
          }
        }

        case '"': return this.string()
        case "'": return this.string()
        case ".":
          if( isDigit(this.ahead().peek(this.s)))
            return this.number()
          else switch(this.ahead().peek(this.s)) {
            case ".": return new Lexeme(this.range(2), Token.DOT_DOT   , this.read(2))
            default : return new Lexeme(this.range(1), Token.DOT       , this.read(1))
          }

        default: {
          if(c === "." || isDigit(c)) return this.number ()
          if(c === "_" || isAlpha(c)) return this.unique ()
          if(c === "!"              ) return this.comment()
          throw new Error(`[Lexer.next] unexpected character '${c}' on line ${this.i.toString()}`)
        } break;
      }
    }
  }

  scan() {
    const lexemes = [ ]
    while(!this.eof()) {
      const l = this.next()
      if(l) lexemes.push(l)
      else  break;
    }
    return lexemes
  }
}

class Expression {

  accept(visitor) { }

  static Literal = class extends Expression {
    constructor(value) {
      this.value = value
    }

    accept(visitor) {
      return visitor.visitLiteral(this)
    }
  }

  static Prefix  = class extends Expression {
    constructor(operator, right) {
      this.operator = operator
      this.right    = right
    }

    accept(visitor) {
      return visitor.visitPrefix(this)
    }
  }

  static Infix   = class extends Expression {
    constructor(left, operator, right) {
      this.left     = left
      this.operator = operator
      this.right    = right
    }

    accept(visitor) {
      return visitor.visitInfix(this)
    }
  }

  static Postfix = class extends Expression {
    constructor(left, operator) {
      this.left     = left
      this.operator = operator
    }

    accept(visitor) {
      return visitor.visitPostfix(this)
    }
  }

  static Grouping = class extends Expression {
    constructor(expression) {
      this.expression = expression
    }

    accept(visitor) {
      return visitor.visitGrouping(this)
    }
  }
}

class TreePrinter {
  visitLiteral(literal) {
    return literal.value
  }

  visitPrefix(prefix) {
    return `(${prefix.operator.value} ${prefix.right})`
  }

  visitInfix(infix) {
    return `(${infix.operator.value} ${infix.left} ${infix.right})`
  }

  visitPostfix(postfix) {
    return `(${postfix.operator.value} ${postfix.left})`
  }

  visitGrouping(grouping) {
    return `(group ${grouping.expression})`
  }
}

window.Lexer = Lexer
