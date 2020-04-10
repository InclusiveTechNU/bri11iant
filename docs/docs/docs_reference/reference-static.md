---
id: reference-static
title: Static Type Annotations
---

**Status:** Not Implemented

V11 aims not only to make accessibility apis and services easy to use, but also to make JavaScript more accessible to blind or visually impaired programmers. We accomplish this through a number of language improvements that are outside the scope of the ECMAScript specification, this first being the requirement of **static type annotations**. By requiring variables to be defined with a specific type, devices like screenreaders can understand the code you write, and make the type of a declaration variable clear. V11's static type checking is inspired by [Flow](https://flow.org/), so the documentation there will be very helpful, although, we do describe below the basics of our implementation of static type annotations in V11.

## Type Annotations

Unlike Flow, V11 does not perform type inferencing by default. There are ways around this, and tools we provide to automatically generate type declarations for your existing code,  which will be discussed later in this document. However, it is highly recommended to define types, so variable types will be clear during initialization to yourself or other developers. Type declarations are easy to get adjusted to and follow a simple syntax. For example:

```javascript
let addTwoNums: func = (first: number, second: number): number {
    return first + second;
}

let result: number = addTwoNums(5, 6) // Works! Will return 11
let secondResult: number = addTwoNums("8", 8) // Error!
```

V11 saves the day in this situation, preventing traditionally weird Javascript quirks to let this function return "88", which is not what the developer is expecting.

## Types of Types!

You may have noticed that we defined our variables using certain types such as 'func' and 'number'. These are included as part of the different types supported by V11. V11 supports a lot of different types, almost all of which are the same as FLow. Here are a few of them:

### Primitive Types

We support all of JavaScripts primitive types found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures). The type declarations for these primitive types are defined in V11 as follows:

```javascript
var valueBool:boolean = true; // Boolean: true, false
var valueNull: null = null; // Null: null
var valueUndef: undefined = undefined; // Undefined: undefined
var valueNum: number = 9; // Number: 8, 9, 10
var valueStr: string = "Hello, World" // String: "apple", "orange"
var valueSym: symbol = Symbol("Sym"); // Symbol: Symbol()
var valueObj: object = {hello: "world"}; // Object: {apple: "orange"}, Object()
```

## Avoiding Type Checking

We really hope you like and use the static type checking for your project, however, we understand if you want to run that one cool JavaScript function from a library you built, or you would like to use a third party library with your existing code. To disable static type checking for part of your code, just attach the '// @dynamic' and '// @end' lines to the part you wish for the type checker to ingore. For example:

```javascript
// @dynamic
let addTwoNums = (first, second) {
    return first + second;
}
// @end

let result: number = addTwoNums(5, 6) // Works! Will return 11
let secondResult: string = addTwoNums("8", 8) // Works :(. Returns "88"
let thirdResult: number = addTwoNums("8", 8) // Error! Not a number output
```

As you can see, you can define and use dynamic components of your code even after returning to static typing, _just remember to declare your variable types for the output of the function if calling a dynamic function outside the dynamic tag._
