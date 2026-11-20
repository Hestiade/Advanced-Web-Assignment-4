# Destructuring Field Guide

Name: İrem AYRANPINAR

Student number: 2300005623

Bonuses in progress: **Bonus 2: Depth** (A completed), **Bonus 4: Git repository**.

## Run

```sh
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

## How an entry looks

Starter reference only; the entries with my example data are in Field guide below.

### Form 1: array destructuring, `const [x, y] = f()`

**Syntax:** `const [lowest, highest] = minMax([4, 9, 2])`

**Example** (from `js/arrays.mjs`):

```js
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)
```

**Output:** `form 1: 2 9`

**Use it when:** a function returns several values in order.

**Watch out:** the order matters, and a missing item gives `undefined`.

## Field guide

### Form 1: values returned by position

**Syntax:** `const [sessionCount, totalMinutes] = sessionSummary([25, 40, 15])`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```js
// Own Form 1: a session count and a total returned together.
{
  function sessionSummary(minutes) {
    return [minutes.length, minutes.reduce((total, value) => total + value, 0)]
  }
  const [sessionCount, totalMinutes] = sessionSummary([25, 40, 15])
  console.log('own form 1:', sessionCount, totalMinutes)
}
```

**Output:**

```text
own form 1: 3 80
```

**Use it when:** A function needs to return a few related results in a fixed order, such as the number of sessions and their total duration.

**Watch out:** The first variable gets the first result, regardless of its name. In TypeScript, the `[number, number]` return type records that there are exactly two numeric results.

### Form 2: skip and collect the rest

**Syntax:** `const [, nextActivity, ...laterActivities] = routine`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```js
{
  const routine = ['Breakfast', 'React revision', 'Pixel drawing', 'Walk']
  const [, nextActivity, ...laterActivities] = routine
  console.log('form 2:', nextActivity, laterActivities)
}
```

**Output:**

```text
form 2: React revision [ 'Pixel drawing', 'Walk' ]
```

**Use it when:** The first item is already finished and the next activity and remaining activities are needed separately.

**Watch out:** The empty position still skips one item. Rest must be last and creates a new array; objects inside it would still be shared. In the TS version, `routine` is `string[]`, so `nextActivity` has type `string | undefined` with `noUncheckedIndexedAccess` enabled.

### Form 3: swap existing variables

**Syntax:** `[firstActivity, secondActivity] = [secondActivity, firstActivity]`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```js
{
  let firstActivity = 'Coding'
  let secondActivity = 'Drawing'
  ;[firstActivity, secondActivity] = [secondActivity, firstActivity]
  console.log('form 3:', firstActivity, secondActivity)
}
```

**Output:**

```text
form 3: Drawing Coding
```

**Use it when:** Two planned activities need to exchange places.

**Watch out:** Both variables must allow reassignment, so they use `let`. The right side reads both original values before either assignment. Without destructuring, the first value would need a temporary variable. The leading semicolon prevents the opening bracket from continuing the previous statement.

### Form 4: array defaults

**Syntax:** `const [workMinutes = 25, breakMinutes = 10] = settings`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```js
{
  const settings = [undefined, 0]
  const [workMinutes = 25, breakMinutes = 10] = settings
  console.log('form 4:', workMinutes, breakMinutes)
}
```

**Output:**

```text
form 4: 25 0
```

**Use it when:** A missing session setting needs a fallback, but a deliberately chosen zero-minute break should remain zero.

**Watch out:** Only `undefined` or a missing position triggers a default. Zero, `null`, `false` and an empty string do not. This example changes the walkthrough's break value from `5` to `0` to check that distinction. In TS, `settings` is `[number?, number?]`; the defaults make both extracted values `number`.

## TypeScript topics

## Pitfalls

## Props and children

## JavaScript vs TypeScript

## Bonus 1: LaTeX

## Bonus 2: Depth

### A: Iterables and generator closing

**Expected result before execution:** The repeated `React` should appear once in the Set. The one-element pattern should read `25` and close the generator before `yield 40`. Changing it to a two-element pattern should also read `40`; `finally` should run in both cases. Form 4 should print `25 0`, since zero is a provided value.

**Code** (from `js/arrays.mjs`; the final version keeps the one-element generator pattern):

```js
{
  const [firstLetter, secondLetter] = 'ART'
  const [firstTopic, ...laterTopics] = new Set(['React', 'React', 'Pixel art', 'Math'])
  const [[firstKey, firstValue]] = new Map([['monday', 50], ['tuesday', 75]])
  console.log('depth A string:', firstLetter, secondLetter)
  console.log('depth A set:', firstTopic, laterTopics)
  console.log('depth A map:', firstKey, firstValue)

  const visited = []
  function* sessions() {
    try {
      visited.push('yield 25')
      yield 25
      visited.push('yield 40')
      yield 40
    } finally {
      visited.push('iterator closed')
    }
  }
  const [onlyFirst] = sessions()
  console.log('depth A generator:', onlyFirst, visited)
  try {
    const [value] = { 0: 'React', length: 1 }
    console.log(value)
  } catch (error) {
    console.log('depth A not iterable:', error.name, error.message)
  }
}
```

**Actual output, first run** (`node js/arrays.mjs`, Node v24.21.0):

```text
depth A string: A R
depth A set: React [ 'Pixel art', 'Math' ]
depth A map: monday 50
depth A generator: 25 [ 'yield 25', 'iterator closed' ]
depth A not iterable: TypeError {(intermediate value)(intermediate value)} is not iterable
```

For the second run, only the generator pattern and its log were changed:

```js
const [onlyFirst, second] = sessions()
console.log('depth A generator:', onlyFirst, second, visited)
```

**Actual output, second run** (other output lines stayed the same):

```text
depth A generator: 25 40 [ 'yield 25', 'yield 40', 'iterator closed' ]
```

The results matched the expected behavior. The second pattern reads one more value. The final code restores `[onlyFirst]` so its output clearly shows that `yield 40` is never reached.

**Why:** An array pattern reads an iterator obtained through `Symbol.iterator`. Strings, Sets and Maps support this; numeric keys and `length` alone do not. A Set provides unique values in insertion order, while a Map provides key/value entries. This explains the observed values.

The specification's BindingInitialization algorithm obtains an iterator, calls IteratorBindingInitialization and closes the iterator if it is not done. In these generator runs, closing invokes `return()` and runs `finally`. Even after the second yield, the generator is suspended until it is resumed or closed. These experiments match [ECMAScript BindingInitialization](https://262.ecma-international.org/16.0/#sec-runtime-semantics-bindinginitialization) and [IteratorBindingInitialization](https://262.ecma-international.org/16.0/#sec-runtime-semantics-iteratorbindinginitialization).

## Bonus 3: Real code

## Bonus 4: Git repository

https://github.com/Hestiade/Advanced-Web-Assignment-4

## My own log

(Your errors, wrong guesses and surprises, in your own words. See the handout.)
