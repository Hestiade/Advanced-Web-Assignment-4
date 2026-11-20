# Destructuring Field Guide

Name: İrem AYRANPINAR

Student number: 2300005623

Bonuses claimed: **Bonus 2: Depth** (A, B and C).

Bonus in progress: **Bonus 4: Git repository**.

## Run

```sh
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

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

### Form 11: patterns in function parameters

**Syntax:** `function planSession({ title = 'Free drawing', minutes = 25 } = {})`

**Example** (from `js/params.mjs`; typed counterpart in `ts/params.ts`):

```js
// Own Form 11: both the object and its properties can have defaults.
{
  function planSession({ title = 'Free drawing', minutes = 25 } = {}) {
    return { title, minutes }
  }
  console.log('own form 11 missing:', planSession())
  console.log('own form 11 partial:', planSession({ title: 'React revision' }))
  console.log('own form 11 zero:', planSession({ title: 'Rest', minutes: 0 }))
}
```

**Output:**

```text
own form 11 missing: { title: 'Free drawing', minutes: 25 }
own form 11 partial: { title: 'React revision', minutes: 25 }
own form 11 zero: { title: 'Rest', minutes: 0 }
```

**Array parameter (Form 11b)** (from the same files):

```js
{
  function sessionLength([workMinutes, breakMinutes]) {
    return workMinutes + breakMinutes
  }
  console.log('form 11b:', sessionLength([25, 5]))
}
```

**Output:**

```text
form 11b: 30
```

**Use it when:** An options object lets callers supply only the session settings they need. An array parameter fits a small pair with a known order, such as work and break durations.

**Watch out:** The outer `= {}` handles an omitted or `undefined` argument. The property defaults fill in missing fields. A `null` argument still throws, and a provided zero remains zero. In TS, `SessionOptions` marks the fields optional, and its annotation goes after the whole pattern. Form 11b uses `[number, number]` to require two numbers. The teacher's original `createTask` example is preserved; its TS `title` remains required.

### Form 12: patterns in loops

**Syntax:** `for (const [day, minutes] of Object.entries(minutesByDay))`

**Example** (from `js/params.mjs`; typed counterpart in `ts/params.ts`):

```js
{
  const minutesByDay = { monday: 50, tuesday: 75 }
  for (const [day, minutes] of Object.entries(minutesByDay)) {
    console.log('form 12 object:', day, minutes)
  }
  const taskStatuses = new Map([
    ['Sketch cover', 'todo'],
    ['React revision', 'done'],
  ])
  for (const [title, status] of taskStatuses) {
    console.log('form 12 map:', title, status)
  }
}
```

**Output:**

```text
form 12 object: monday 50
form 12 object: tuesday 75
form 12 map: Sketch cover todo
form 12 map: React revision done
```

**Use it when:** Each iteration needs both a key and its value, such as a day's minutes or a task's status.

**Watch out:** `Object.entries` returns pairs for own enumerable string-keyed properties. `Map` can keep other key types. `for...of` reads the pairs; `for...in` provides property keys instead. In TS, the Map is declared as `Map<string, 'todo' | 'done'>`, so its status values are limited to those two strings.

**Rest and spread:** In a pattern, `...laterActivities` collects the remaining values (rest). In an expression, `[...minutes]` or `{ ...object }` expands existing values (spread). The three dots have different jobs depending on where they appear.

## TypeScript topics

### T1: A colon can rename a binding

In `const { title: string } = example`, `string` is the new variable name. The word after the colon does not annotate the value's type inside a destructuring pattern. To add a type, put it after the whole pattern: `const { title }: { title: string } = example`. Both examples in `ts/types.ts` print `Daily agenda`; the teacher's `point` and `horizontal` example is also preserved.

### T2: Tuples and as const

The return type `[number, string]` describes two positions with different types. After destructuring `sessionResult()`, `minutes` is a number and `title` is a string. The array `[25, 'Drawing'] as const` is inferred as a readonly tuple with the literal types `25` and `'Drawing'`. `as const` affects the type; it does not freeze the array at runtime.

### T3: Possibly missing elements

With `noUncheckedIndexedAccess`, taking the first element from a `string[]` gives `string | undefined`. The empty `activities` array actually produces `undefined`, so the guarded `toUpperCase()` call does not run. A default of `'Rest'` makes `fallback` a string, and its uppercase value is printed as `REST`.

### T4: Optional fields and defaults

The type `Options = { minutes?: number }` allows an object without a `minutes` property. Reading it without a default gives `number | undefined`. Reading it as `minutes: safeMinutes = 25` gives a number, so adding five is safe. The example prints `undefined`, `25` and `30`.

### T5: A real diagnostic and its fix

The experiment deliberately assigns a `[number, string]` result to a `[number, number]` annotation. The second position is wrong. With only the T5 `@ts-expect-error` comment temporarily removed, `npm run check` failed with this actual diagnostic:

```text
ts/types.ts(52,9): error TS2322: Type '[number, string]' is not assignable to type '[number, number]'.
  Type at position 1 in source is not compatible with type at position 1 in target.
    Type 'string' is not assignable to type 'number'.
```

The correct version keeps the second position as a string:

```ts
const [correctMinutes, correctTitle]: [number, string] = result
```

The single permitted suppression was then restored above the deliberately incorrect line, and `npm run check` passed. `@ts-expect-error` expects a diagnostic on the next line; it reports an unused directive if that line no longer has an error. The runtime log still reports a string for `wrongMinutes`: a type annotation does not convert the actual value to a number.

**Actual runtime output for T1–T5** (from `npm run all`, which runs `ts/types.ts` with `tsx`):

```text
T1: 1
T1 rename: Daily agenda
T1 annotation: Daily agenda
T2: 50 React revision 25 Drawing
T3 first: undefined
T3 fallback: REST
T4: undefined 25 30
T5 wrong at runtime: React revision string
T5 fixed: 25 React revision
```

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

### C: Extracting types with infer and Parameters

**Code** (from `ts/types.ts`):

```ts
{
  type First<T extends readonly unknown[]> =
    T extends readonly [infer Head, ...unknown[]] ? Head : never
  type Rest<T extends readonly unknown[]> =
    T extends readonly [unknown, ...infer Tail] ? Tail : []
  type Session = [number, string, boolean]
  const first: First<Session> = 25
  const remaining: Rest<Session> = ['Drawing', true]
  function describeSession(minutes: number, title: string) {
    return title + ': ' + minutes
  }
  const args: Parameters<typeof describeSession> = [25, 'Drawing']
  console.log('depth C:', first, remaining, describeSession(...args))
}
```

**Actual runtime output** (from `npm run all`):

```text
depth C: 25 [ 'Drawing', true ] Drawing: 25
```

`First` matches a tuple with a required first position and infers that position's type as `Head`. `Rest` skips the first position and infers the remaining tuple as `Tail`. This follows the approach described in the [TypeScript handbook on infer within conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types).

`Parameters<typeof describeSession>` produces the parameter tuple `[minutes: number, title: string]`. The `args` value is checked against it, then spread into the call. See the [TypeScript Parameters utility](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype).

**Extra type experiment:** The installed TypeScript compiler's type checker was used to inspect the types, as an editor hover would. The original source and a temporary in-memory version with `Session` replaced by `readonly [25, 'Drawing', true]` were both checked. A temporary alias `type ArrayFirst = First<string[]>` also checked the ordinary-array limitation. Neither experiment added a file to the project.

**Actual type-inspection output:**

```text
General tuple:
First<string[]>: never
first: number
remaining: [string, boolean]
args: [minutes: number, title: string]
Readonly literal tuple:
First<string[]>: never
first: 25
remaining: ["Drawing", true]
args: [minutes: number, title: string]
```

The readonly literal tuple preserves the exact values in the inferred types: `first` becomes `25`, and `remaining` becomes `["Drawing", true]`. This `Rest` definition does not preserve the readonly modifier on the resulting tail. The final source keeps the general `[number, string, boolean]` tuple.

`First<string[]>` is `never` with this definition because an ordinary array can be empty and does not guarantee a first position. This helper supports tuples with a required head; it is not a general first-element type for every array. Type aliases and `infer` do their work during type checking and do not produce runtime values. The console output comes from the actual values checked using those types.

## Bonus 3: Real code

## Bonus 4: Git repository

https://github.com/Hestiade/Advanced-Web-Assignment-4

## My own log

(Your errors, wrong guesses and surprises, in your own words. See the handout.)
