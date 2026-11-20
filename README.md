# Destructuring Field Guide

Name: İrem AYRANPINAR

Student number: 2300005623

Bonuses in progress: **Bonus 2: Depth** (A and B completed), **Bonus 4: Git repository**.

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

### Form 5: object properties by name

**Syntax:** `let { title, status } = planner`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```js
// Own Form 5: read properties regardless of their position.
{
  const planner = { title: 'Sketch the agenda cover', status: 'in-progress', minutes: 40 }
  let { title, status } = planner
  console.log('own form 5:', title, status)
}
```

**Output:**

```text
own form 5: Sketch the agenda cover in-progress
```

**Use it when:** A planner's title and status are needed as separate variables.

**Watch out:** Property names select the values, so their order in the object does not matter. The source must exist; destructuring `null` or `undefined` throws. In TS, the planner annotation limits `status` to the three allowed strings.

### Form 6: rename while extracting

**Syntax:** `const { title: heading } = planner`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```js
{
  const planner = { title: 'Sketch the agenda cover', minutes: 40 }
  const { title: heading } = planner
  console.log('form 6:', heading, planner.title)
}
```

**Output:**

```text
form 6: Sketch the agenda cover Sketch the agenda cover
```

**Use it when:** A property named `title` is easier to use locally as `heading`, or another variable already uses the name `title`.

**Watch out:** The colon separates the source property from the new variable name. It does not rename the original property. Both printed values match because `planner.title` remains available. The same syntax also means a rename in TS; it is not a type annotation.

### Form 7: object defaults

**Syntax:** `const { priority = 'normal' } = session`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```js
{
  const session = { title: 'React revision' }
  const { priority = 'normal' } = session
  console.log('form 7:', priority)
}
```

**Output:**

```text
form 7: normal
```

**Use it when:** An optional session priority needs a fallback for local use.

**Watch out:** The default does not add a `priority` property to `session`. It applies to missing or `undefined` values, and preserves `null`. In TS, `priority?: string` describes the optional property; the extracted `priority` is a `string` after the default.

### Form 8: object rest

**Syntax:** `const { id, ...details } = session`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```js
{
  const session = { id: 'session-7', title: 'React revision', minutes: 25 }
  const { id, ...details } = session
  console.log('form 8:', id, details)
}
```

**Output:**

```text
form 8: session-7 { title: 'React revision', minutes: 25 }
```

**Use it when:** A session's identifier should be handled separately from its remaining details.

**Watch out:** Rest collects the remaining own enumerable properties into a new object, excluding `id`. It only makes a shallow copy, so nested objects would still be shared. TS infers `details` as an object containing `title` and `minutes`.

### Form 9: nested patterns

**Syntax:** `const { owner: { name }, activities: [firstActivity] } = agenda`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```js
{
  const agenda = {
    owner: { name: 'Irem' },
    activities: ['Draw a cover', 'Write a daily page'],
  }
  const { owner: { name }, activities: [firstActivity] } = agenda
  console.log('form 9:', name, firstActivity)
}
```

**Output:**

```text
form 9: Irem Draw a cover
```

**Use it when:** The owner's name and first activity are needed from a known agenda structure.

**Watch out:** This creates `name` and `firstActivity` variables; `owner` and `activities` are property names in the pattern. The nested object and iterable must exist. In TS, `activities` is inferred as `string[]`, so `firstActivity` can be `undefined` when the array is empty.

### Form 10: computed property key

**Syntax:** `const { [selectedDay]: selectedMinutes } = totals`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```js
{
  const totals = { monday: 50, tuesday: 75 }
  const selectedDay = 'tuesday'
  const { [selectedDay]: selectedMinutes } = totals
  console.log('form 10:', selectedDay, selectedMinutes)
}
```

**Output:**

```text
form 10: tuesday 75
```

**Use it when:** A variable decides which day's total should be read.

**Watch out:** The brackets evaluate `selectedDay` as the property key; the new variable is `selectedMinutes`. An unknown key gives `undefined` in JS. The TS version uses `keyof typeof totals` to accept only `monday` or `tuesday` as keys.

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

### B: When defaults run and binding order

**Expected result before execution:** A provided `0` should leave the call count at zero. Replacing it with `undefined` should call `chooseMinutes()`, while `null` should remain `null` without a call. The missing property should trigger one additional call in every run. `rest` should use the earlier `work` binding, but reading the later `second` binding should throw a `ReferenceError`.

**Code** (from `js/objects.mjs`; the final version keeps `{ minutes: 0 }`):

```js
{
  let calls = 0
  function chooseMinutes() {
    calls += 1
    return 25
  }
  const { minutes: provided = chooseMinutes() } = { minutes: 0 }
  console.log('depth B provided:', provided, calls)
  const { minutes: missing = chooseMinutes() } = {}
  console.log('depth B missing:', missing, calls)
  const [work = 25, rest = work / 5] = []
  console.log('depth B earlier binding:', work, rest)
  try {
    new Function('const [first = second, second = 5] = []; return first;')()
  } catch (error) {
    console.log('depth B later binding:', error.name, error.message)
  }
}
```

**Actual output, first run** (`node js/objects.mjs`, Node v24.21.0):

```text
depth B provided: 0 0
depth B missing: 25 1
depth B earlier binding: 25 5
depth B later binding: ReferenceError Cannot access 'second' before initialization
```

For the second run, the provided property's value was changed from `0` to `undefined`:

```js
const { minutes: provided = chooseMinutes() } = { minutes: undefined }
```

**Actual output, second run** (the binding-order lines stayed the same):

```text
depth B provided: 25 1
depth B missing: 25 2
```

For the third run, the provided value was changed to `null`:

```js
const { minutes: provided = chooseMinutes() } = { minutes: null }
```

**Actual output, third run** (the binding-order lines stayed the same):

```text
depth B provided: null 0
depth B missing: 25 1
```

Each run started with a fresh `calls = 0`. The results matched the expectation. The final file restores `0` to keep a simple example of a supplied numeric value that does not trigger a default.

**Why:** The counter shows that the fallback function is evaluated only when needed, rather than being called and having its result discarded. Both a missing property and an explicit `undefined` trigger it. Zero and `null` preserve their values and skip the function call. This matches the initializer condition in [ECMAScript KeyedBindingInitialization](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-runtime-semantics-keyedbindinginitialization).

The pattern initializes bindings from left to right. `work` already contains `25` when `rest` is calculated, giving `5`. In the reversed dependency, `second` exists but has not been initialized when `first` tries to read it; that is the temporal dead zone. `new Function` isolates this deliberately failing experiment, and the catch prints its real error so the rest of the file can continue.

## Bonus 3: Real code

## Bonus 4: Git repository

https://github.com/Hestiade/Advanced-Web-Assignment-4

## My own log

(Your errors, wrong guesses and surprises, in your own words. See the handout.)
