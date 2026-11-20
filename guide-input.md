# Destructuring Field Guide

Name: İrem AYRANPINAR

Student number: 2300005623

Bonuses claimed: **Bonus 1: LaTeX**, **Bonus 2: Depth** (A, B and C), **Bonus 3: Real code**, **Bonus 4: Git repository**.

## Run

```
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

`output.txt` contains the complete captured output of `npm run all`, saved as UTF-8. The run completed through the final TypeScript P7 button render, and `npm run check` passed.

## Field guide

### Form 1: values returned by position

**Syntax:** `const [sessionCount, totalMinutes] = sessionSummary([25, 40, 15])`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```
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

```
own form 1: 3 80
```

**Use it when:** A function needs to return a few related results in a fixed order, such as the number of sessions and their total duration.

**Watch out:** The first variable gets the first result, regardless of its name. In TypeScript, the `[number, number]` return type records that there are exactly two numeric results.

### Form 2: skip and collect the rest

**Syntax:** `const [, nextActivity, ...laterActivities] = routine`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```
{
  const routine = ['Breakfast', 'React revision', 'Pixel drawing', 'Walk']
  const [, nextActivity, ...laterActivities] = routine
  console.log('form 2:', nextActivity, laterActivities)
}
```

**Output:**

```
form 2: React revision [ 'Pixel drawing', 'Walk' ]
```

**Use it when:** The first item is already finished and the next activity and remaining activities are needed separately.

**Watch out:** The empty position still skips one item. Rest must be last and creates a new array; objects inside it would still be shared. In the TS version, `routine` is `string[]`, so `nextActivity` has type `string | undefined` with `noUncheckedIndexedAccess` enabled.

### Form 3: swap existing variables

**Syntax:** `[firstActivity, secondActivity] = [secondActivity, firstActivity]`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```
{
  let firstActivity = 'Coding'
  let secondActivity = 'Drawing'
  ;[firstActivity, secondActivity] = [secondActivity, firstActivity]
  console.log('form 3:', firstActivity, secondActivity)
}
```

**Output:**

```
form 3: Drawing Coding
```

**Use it when:** Two planned activities need to exchange places.

**Watch out:** Both variables must allow reassignment, so they use `let`. The right side reads both original values before either assignment. Without destructuring, the first value would need a temporary variable. The leading semicolon prevents the opening bracket from continuing the previous statement.

### Form 4: array defaults

**Syntax:** `const [workMinutes = 25, breakMinutes = 10] = settings`

**Example** (from `js/arrays.mjs`; typed counterpart in `ts/arrays.ts`):

```
{
  const settings = [undefined, 0]
  const [workMinutes = 25, breakMinutes = 10] = settings
  console.log('form 4:', workMinutes, breakMinutes)
}
```

**Output:**

```
form 4: 25 0
```

**Use it when:** A missing session setting needs a fallback, but a deliberately chosen zero-minute break should remain zero.

**Watch out:** Only `undefined` or a missing position triggers a default. Zero, `null`, `false` and an empty string do not. This example changes the walkthrough's break value from `5` to `0` to check that distinction. In TS, `settings` is `[number?, number?]`; the defaults make both extracted values `number`.

### Form 5: object properties by name

**Syntax:** `let { title, status } = planner`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```
// Own Form 5: read properties regardless of their position.
{
  const planner = { title: 'Sketch the agenda cover', status: 'in-progress', minutes: 40 }
  let { title, status } = planner
  console.log('own form 5:', title, status)
}
```

**Output:**

```
own form 5: Sketch the agenda cover in-progress
```

**Use it when:** A planner's title and status are needed as separate variables.

**Watch out:** Property names select the values, so their order in the object does not matter. The source must exist; destructuring `null` or `undefined` throws. In TS, the planner annotation limits `status` to the three allowed strings.

### Form 6: rename while extracting

**Syntax:** `const { title: heading } = planner`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```
{
  const planner = { title: 'Sketch the agenda cover', minutes: 40 }
  const { title: heading } = planner
  console.log('form 6:', heading, planner.title)
}
```

**Output:**

```
form 6: Sketch the agenda cover Sketch the agenda cover
```

**Use it when:** A property named `title` is easier to use locally as `heading`, or another variable already uses the name `title`.

**Watch out:** The colon separates the source property from the new variable name. It does not rename the original property. Both printed values match because `planner.title` remains available. The same syntax also means a rename in TS; it is not a type annotation.

### Form 7: object defaults

**Syntax:** `const { priority = 'normal' } = session`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```
{
  const session = { title: 'React revision' }
  const { priority = 'normal' } = session
  console.log('form 7:', priority)
}
```

**Output:**

```
form 7: normal
```

**Use it when:** An optional session priority needs a fallback for local use.

**Watch out:** The default does not add a `priority` property to `session`. It applies to missing or `undefined` values, and preserves `null`. In TS, `priority?: string` describes the optional property; the extracted `priority` is a `string` after the default.

### Form 8: object rest

**Syntax:** `const { id, ...details } = session`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```
{
  const session = { id: 'session-7', title: 'React revision', minutes: 25 }
  const { id, ...details } = session
  console.log('form 8:', id, details)
}
```

**Output:**

```
form 8: session-7 { title: 'React revision', minutes: 25 }
```

**Use it when:** A session's identifier should be handled separately from its remaining details.

**Watch out:** Rest collects the remaining own enumerable properties into a new object, excluding `id`. It only makes a shallow copy, so nested objects would still be shared. TS infers `details` as an object containing `title` and `minutes`.

### Form 9: nested patterns

**Syntax:** `const { owner: { name }, activities: [firstActivity] } = agenda`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```
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

```
form 9: Irem Draw a cover
```

**Use it when:** The owner's name and first activity are needed from a known agenda structure.

**Watch out:** This creates `name` and `firstActivity` variables; `owner` and `activities` are property names in the pattern. The nested object and iterable must exist. In TS, `activities` is inferred as `string[]`, so `firstActivity` can be `undefined` when the array is empty.

### Form 10: computed property key

**Syntax:** `const { [selectedDay]: selectedMinutes } = totals`

**Example** (from `js/objects.mjs`; typed counterpart in `ts/objects.ts`):

```
{
  const totals = { monday: 50, tuesday: 75 }
  const selectedDay = 'tuesday'
  const { [selectedDay]: selectedMinutes } = totals
  console.log('form 10:', selectedDay, selectedMinutes)
}
```

**Output:**

```
form 10: tuesday 75
```

**Use it when:** A variable decides which day's total should be read.

**Watch out:** The brackets evaluate `selectedDay` as the property key; the new variable is `selectedMinutes`. An unknown key gives `undefined` in JS. The TS version uses `keyof typeof totals` to accept only `monday` or `tuesday` as keys.

### Form 11: patterns in function parameters

**Syntax:** `function planSession({ title = 'Free drawing', minutes = 25 } = {})`

**Example** (from `js/params.mjs`; typed counterpart in `ts/params.ts`):

```
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

```
own form 11 missing: { title: 'Free drawing', minutes: 25 }
own form 11 partial: { title: 'React revision', minutes: 25 }
own form 11 zero: { title: 'Rest', minutes: 0 }
```

**Array parameter (Form 11b)** (from the same files):

```
{
  function sessionLength([workMinutes, breakMinutes]) {
    return workMinutes + breakMinutes
  }
  console.log('form 11b:', sessionLength([25, 5]))
}
```

**Output:**

```
form 11b: 30
```

**Use it when:** An options object lets callers supply only the session settings they need. An array parameter fits a small pair with a known order, such as work and break durations.

**Watch out:** The outer `= {}` handles an omitted or `undefined` argument. The property defaults fill in missing fields. A `null` argument still throws, and a provided zero remains zero. In TS, `SessionOptions` marks the fields optional, and its annotation goes after the whole pattern. Form 11b uses `[number, number]` to require two numbers. The teacher's original `createTask` example is preserved; its TS `title` remains required.

### Form 12: patterns in loops

**Syntax:** `for (const [day, minutes] of Object.entries(minutesByDay))`

**Example** (from `js/params.mjs`; typed counterpart in `ts/params.ts`):

```
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

```
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

```
ts/types.ts(52,9): error TS2322: Type '[number, string]' is not assignable to type '[number, number]'.
  Type at position 1 in source is not compatible with type at position 1 in target.
    Type 'string' is not assignable to type 'number'.
```

The correct version keeps the second position as a string:

```
const [correctMinutes, correctTitle]: [number, string] = result
```

The single permitted suppression was then restored above the deliberately incorrect line, and `npm run check` passed. `@ts-expect-error` expects a diagnostic on the next line; it reports an unused directive if that line no longer has an error. The runtime log still reports a string for `wrongMinutes`: a type annotation does not convert the actual value to a number.

**Actual runtime output for T1–T5** (from `npm run all`, which runs `ts/types.ts` with `tsx`):

```
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

The examples below are from `js/pitfalls.mjs`. The outputs were captured with `node js/pitfalls.mjs` on Node v24.21.0. The teacher's initial example is preserved and also prints `pitfall 1: TypeError`.

### Pitfall 1: Destructuring null or undefined throws

```
for (const value of [undefined, null]) {
  try {
    const { title } = value
    console.log(title)
  } catch (error) {
    console.log('own pitfall 1:', error.name, error.message)
  }
}
```

**Actual output:**

```
own pitfall 1: TypeError Cannot destructure property 'title' of 'value' as it is undefined.
own pitfall 1: TypeError Cannot destructure property 'title' of 'value' as it is null.
```

**Why:** Neither `null` nor `undefined` can be used as the source of an object pattern. The operation fails before a `title` value can be read. Check that the source exists before destructuring it; a default for the `title` property alone would not fix the missing source.

### Pitfall 2: Defaults preserve null

```
{
  const { minutes: missingMinutes = 25 } = {}
  const { minutes: undefinedMinutes = 25 } = { minutes: undefined }
  const { minutes: nullMinutes = 25 } = { minutes: null }
  console.log('pitfall 2:', missingMinutes, undefinedMinutes, nullMinutes)
}
```

**Actual output:**

```
pitfall 2: 25 25 null
```

**Why:** A missing property is read as `undefined`, so both the missing and explicit `undefined` cases select `25`. The `null` value is preserved. A destructuring default does not replace every empty-looking or falsy value.

### Pitfall 3: Assignment patterns need parentheses

```
{
  try {
    new Function('let title; { title } = { title: "Study React" };')()
  } catch (error) {
    console.log('pitfall 3 error:', error.name, error.message)
  }
  let title
  ;({ title } = { title: 'Study React' })
  console.log('pitfall 3 fixed:', title)
}
```

**Actual output:**

```
pitfall 3 error: SyntaxError Unexpected token '='
pitfall 3 fixed: Study React
```

**Why:** At the start of a statement, `{ title }` is parsed as a block, so the following `=` is invalid there. Parentheses make the destructuring assignment an expression. The leading semicolon keeps it separate from the previous statement. `new Function` parses the deliberately incorrect experiment text separately; writing that syntax directly in the file would prevent the entire file from running, even inside a try block.

### Pitfall 4: Nested objects are shared

```
{
  const original = { owner: { name: 'Irem' }, title: 'Daily agenda' }
  const { owner } = original
  owner.name = 'Updated owner'
  console.log('pitfall 4:', original.owner.name, owner === original.owner)
}
```

**Actual output:**

```
pitfall 4: Updated owner true
```

**Why:** The variable `owner` holds the same object reference as `original.owner`. Changing its `name` therefore changes what is read through the original object too. The `true` comparison confirms the shared reference. Destructuring does not make a deep copy.

### Pitfall 5: Object names and array positions match differently

```
{
  const { title, minutes } = { minutes: 25, title: 'React revision' }
  const [first, second] = [25, 'React revision']
  console.log('pitfall 5 object:', title, minutes)
  console.log('pitfall 5 array:', first, second)
}
```

**Actual output:**

```
pitfall 5 object: React revision 25
pitfall 5 array: 25 React revision
```

**Why:** The object pattern selects properties by name, even though `minutes` is written first in the source object. The array pattern selects by position: `first` gets `25` and `second` gets `'React revision'`. Renaming the array variables would not change which positions they read.

## Props and children

The examples below are from `js/props.jsx` and `ts/props.tsx`. Rendered HTML was captured from `npm run all` using the installed React 19.3.1. Both files use `renderToStaticMarkup` from `react-dom/server`. The TS file also imports `ReactNode`, `PropsWithChildren` and `ComponentProps` as types.

### P1: One props object

Both components receive one props object. `CardA` reads its fields with `props.title` and `props.children`; `CardB` extracts them in the parameter list. This combines object destructuring (Form 5) with a parameter pattern (Form 11). The teacher's components are preserved and called with new inputs. TS adds `CardProps` after the whole parameter pattern. See [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component).

**JavaScript:**

```
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}

// P1: the existing CardA and CardB receive the same props object.
console.log('P1 A:', renderToStaticMarkup(<CardA title="Agenda">Plan a drawing session</CardA>))
console.log('P1 B:', renderToStaticMarkup(<CardB title="Agenda">Plan a drawing session</CardB>))
```

**TypeScript:**

```
type CardProps = { title: string; children?: ReactNode }

function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}

// P1: add a non-destructured counterpart; keep the existing Card function.
function CardWithoutPattern(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}

// P1: the existing CardWithoutPattern and Card receive the same props object.
console.log('P1 A:', renderToStaticMarkup(<CardWithoutPattern title="Agenda">Plan a drawing session</CardWithoutPattern>))
console.log('P1 B:', renderToStaticMarkup(<Card title="Agenda">Plan a drawing session</Card>))
```

**Actual output (same in JS and TS):**

```
P1 A: <section><h2>Agenda</h2>Plan a drawing session</section>
P1 B: <section><h2>Agenda</h2>Plan a drawing session</section>
```

### P2: children is a prop

The text between the component tags becomes its `children` prop. Giving that same text through the `children` attribute produces the same HTML. Other props, such as `title`, remain separate fields of the same object.

**JavaScript:**

```
// P2: children between tags and children as an attribute.
console.log('P2 tags:', renderToStaticMarkup(<CardB title="Agenda">Draw a cover</CardB>))
console.log('P2 prop:', renderToStaticMarkup(<CardB title="Agenda" children="Draw a cover" />))
```

**TypeScript:**

```
// P2: children between tags and children as an attribute.
console.log('P2 tags:', renderToStaticMarkup(<Card title="Agenda">Draw a cover</Card>))
console.log('P2 prop:', renderToStaticMarkup(<Card title="Agenda" children="Draw a cover" />))
```

**Actual output (same in JS and TS):**

```
P2 tags: <section><h2>Agenda</h2>Draw a cover</section>
P2 prop: <section><h2>Agenda</h2>Draw a cover</section>
```

### P3: What appears as child content

The following cases were rendered separately. Strings and numbers appear as text, including zero. Elements produce markup; the array of elements renders both in order. `undefined`, `null` and `false` produce no child content.

| Value | Observed child content |
|---|---|
| String | Its text |
| Number, including zero | Numeric text |
| One element | Its markup |
| Several elements | Each element's markup in order |
| undefined, null, false | No child content |
| Raw function | No child content, with a React warning in the JS experiment |
| Function called by RenderCard | The markup returned by the function |

**JavaScript:**

```
// P3: values that React can render directly.
const childCases = [
  ['string', 'React revision'],
  ['number', 25],
  ['zero', 0],
  ['element', <strong>Drawing</strong>],
  ['several', [<span key="a">Study</span>, <span key="b">Draw</span>]],
  ['undefined', undefined],
  ['null', null],
  ['false', false],
]
for (const [label, child] of childCases) {
  console.log('P3 ' + label + ':', renderToStaticMarkup(<CardB title="Child">{child}</CardB>))
}

// A raw function is not rendered as ordinary child content. Capture React's real warning.
{
  const warnings = []
  const originalError = console.error
  console.error = (...values) => warnings.push(values.map(String).join(' '))
  try {
    const html = renderToStaticMarkup(<CardB title="Function">{() => <b>Not called</b>}</CardB>)
    console.log('P3 raw function:', html)
  } catch (error) {
    console.log('P3 raw function error:', error.name, error.message)
  } finally {
    console.error = originalError
  }
  console.log('P3 raw function warnings:', warnings)
}
function RenderCard({ children }) {
  return <section>{children('Drawing')}</section>
}
console.log('P3 render prop:', renderToStaticMarkup(<RenderCard>{(activity) => <b>{activity}</b>}</RenderCard>))
```

**TypeScript:**

```
// P3: values that React can render directly.
const childCases: [string, ReactNode][] = [
  ['string', 'React revision'],
  ['number', 25],
  ['zero', 0],
  ['element', <strong>Drawing</strong>],
  ['several', [<span key="a">Study</span>, <span key="b">Draw</span>]],
  ['undefined', undefined],
  ['null', null],
  ['false', false],
]
for (const [label, child] of childCases) {
  console.log('P3 ' + label + ':', renderToStaticMarkup(<Card title="Child">{child}</Card>))
}

function RenderCard({ children }: { children: (activity: string) => ReactNode }) {
  return <section>{children('Drawing')}</section>
}
console.log('P3 render prop:', renderToStaticMarkup(<RenderCard>{(activity) => <b>{activity}</b>}</RenderCard>))
```

**Actual output (same in JS and TS):**

```
P3 string: <section><h2>Child</h2>React revision</section>
P3 number: <section><h2>Child</h2>25</section>
P3 zero: <section><h2>Child</h2>0</section>
P3 element: <section><h2>Child</h2><strong>Drawing</strong></section>
P3 several: <section><h2>Child</h2><span>Study</span><span>Draw</span></section>
P3 undefined: <section><h2>Child</h2></section>
P3 null: <section><h2>Child</h2></section>
P3 false: <section><h2>Child</h2></section>
P3 render prop: <section><b>Drawing</b></section>
```

**Additional JS-only output for the raw function:**

```
P3 raw function: <section><h2>Function</h2></section>
P3 raw function warnings: [
  'Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it. children children'
]
```

The warning above is captured from React's real `console.error` call. Its format placeholders remain in the captured string because the example joins the original arguments. The original `console.error` is restored in `finally`.

A raw function is not ordinary ReactNode child content. `RenderCard` instead declares a function-valued children contract and explicitly calls it with `'Drawing'`. React renders the returned element. This is the [render-prop alternative described by React](https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering). The TS version includes the valid render-prop example; the rejected ordinary child is shown in the E9 diagnostics under P7.

### P4: Rest props and spread order

The parameter pattern removes `title` and `children` before collecting the remaining props in `rest`. Those two fields are handled inside the component; `id` and `className` are forwarded to the section. The last assignment of `className` wins: spread last uses `from-rest`, while explicit last uses `fixed`. The TS intersection combines section props with the required custom `title`.

**JavaScript:**

```
// P4: rest excludes title/children; the last className wins.
function RestLastPanel({ title, children, ...rest }) {
  return <section className="fixed" {...rest}><h2>{title}</h2>{children}</section>
}
function ExplicitLastPanel({ title, children, ...rest }) {
  return <section {...rest} className="fixed"><h2>{title}</h2>{children}</section>
}
const panelProps = { id: 'agenda', className: 'from-rest' }
console.log('P4 rest last:', renderToStaticMarkup(<RestLastPanel title="Agenda" {...panelProps}>Notes</RestLastPanel>))
console.log('P4 explicit last:', renderToStaticMarkup(<ExplicitLastPanel title="Agenda" {...panelProps}>Notes</ExplicitLastPanel>))
```

**TypeScript:**

```
// P4: rest excludes title/children; the last className wins.
type PanelProps = ComponentProps<'section'> & { title: string }
function RestLastPanel({ title, children, ...rest }: PanelProps) {
  return <section className="fixed" {...rest}><h2>{title}</h2>{children}</section>
}
function ExplicitLastPanel({ title, children, ...rest }: PanelProps) {
  return <section {...rest} className="fixed"><h2>{title}</h2>{children}</section>
}
const panelProps = { id: 'agenda', className: 'from-rest' }
console.log('P4 rest last:', renderToStaticMarkup(<RestLastPanel title="Agenda" {...panelProps}>Notes</RestLastPanel>))
console.log('P4 explicit last:', renderToStaticMarkup(<ExplicitLastPanel title="Agenda" {...panelProps}>Notes</ExplicitLastPanel>))
```

**Actual output (same in JS and TS):**

```
P4 rest last: <section class="from-rest" id="agenda"><h2>Agenda</h2>Notes</section>
P4 explicit last: <section id="agenda" class="fixed"><h2>Agenda</h2>Notes</section>
```

### P5: Named slots or composed children

`SlotCard` gives named `header` and `footer` props fixed regions in the layout. Its paragraph is `children`. `CompositionCard` receives the entire layout as `children`, letting the caller choose the structure and order. The two calls happen to produce identical HTML, but the named-slot version controls the layout more closely.

**JavaScript:**

```
// P5: named slots versus composed children.
function SlotCard({ header, footer, children }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function CompositionCard({ children }) {
  return <article>{children}</article>
}
console.log('P5 slots:', renderToStaticMarkup(<SlotCard header={<h2>Today</h2>} footer={<small>One session</small>}><p>Draw</p></SlotCard>))
console.log('P5 children:', renderToStaticMarkup(<CompositionCard><header><h2>Today</h2></header><main><p>Draw</p></main><footer><small>One session</small></footer></CompositionCard>))
```

**TypeScript:**

```
// P5: named slots versus composed children.
function SlotCard({ header, footer, children }: { header: ReactNode; footer: ReactNode; children?: ReactNode }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function CompositionCard({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
console.log('P5 slots:', renderToStaticMarkup(<SlotCard header={<h2>Today</h2>} footer={<small>One session</small>}><p>Draw</p></SlotCard>))
console.log('P5 children:', renderToStaticMarkup(<CompositionCard><header><h2>Today</h2></header><main><p>Draw</p></main><footer><small>One session</small></footer></CompositionCard>))
```

**Actual output (same in JS and TS):**

```
P5 slots: <article><header><h2>Today</h2></header><main><p>Draw</p></main><footer><small>One session</small></footer></article>
P5 children: <article><header><h2>Today</h2></header><main><p>Draw</p></main><footer><small>One session</small></footer></article>
```

### P6: Defaults

Both a missing title and an explicit `undefined` use `Untitled session`. With `null`, the heading element stays empty; the default is not selected. The TS type explicitly permits `null` so the same experiment can run. This matches [React's explanation of prop defaults](https://react.dev/learn/passing-props-to-a-component#specifying-a-default-value-for-a-prop).

**JavaScript:**

```
// P6: missing/undefined use the default; null does not.
function DefaultCard({ title = 'Untitled session', children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P6 missing:', renderToStaticMarkup(<DefaultCard>Notes</DefaultCard>))
console.log('P6 undefined:', renderToStaticMarkup(<DefaultCard title={undefined}>Notes</DefaultCard>))
console.log('P6 null:', renderToStaticMarkup(<DefaultCard title={null}>Notes</DefaultCard>))
```

**TypeScript:**

```
// P6: missing/undefined use the default; null does not.
function DefaultCard({ title = 'Untitled session', children }: { title?: string | null; children?: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P6 missing:', renderToStaticMarkup(<DefaultCard>Notes</DefaultCard>))
console.log('P6 undefined:', renderToStaticMarkup(<DefaultCard title={undefined}>Notes</DefaultCard>))
console.log('P6 null:', renderToStaticMarkup(<DefaultCard title={null}>Notes</DefaultCard>))
```

**Actual output (same in JS and TS):**

```
P6 missing: <section><h2>Untitled session</h2>Notes</section>
P6 undefined: <section><h2>Untitled session</h2>Notes</section>
P6 null: <section><h2></h2>Notes</section>
```

### P7: Types of children and native props

`children?: ReactNode` allows renderable values and makes children optional. `PropsWithChildren<{ title: string }>` adds optional ReactNode children while keeping `title` required. `ComponentProps<'button'>` reuses the native button prop types, including `type` and `disabled`. These types are imported only by the TS file; the JS wrappers show the same runtime behavior.

**JavaScript:**

```
// P7: runtime counterparts of the TypeScript wrappers.
function Layout({ title, children }) {
  return <aside><h2>{title}</h2>{children}</aside>
}
function ActionButton({ children, ...rest }) {
  return <button {...rest}>{children}</button>
}
console.log('P7 node:', renderToStaticMarkup(<CardB title="ReactNode">{25}</CardB>))
console.log('P7 optional:', renderToStaticMarkup(<Layout title="No child" />))
console.log('P7 button:', renderToStaticMarkup(<ActionButton type="button" disabled>Start</ActionButton>))
```

**TypeScript:**

```
// P7: PropsWithChildren and native button props.
function Layout({ title, children }: PropsWithChildren<{ title: string }>) {
  return <aside><h2>{title}</h2>{children}</aside>
}
function ActionButton({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
console.log('P7 node:', renderToStaticMarkup(<Card title="ReactNode">{25}</Card>))
console.log('P7 optional:', renderToStaticMarkup(<Layout title="No child" />))
console.log('P7 button:', renderToStaticMarkup(<ActionButton type="button" disabled>Start</ActionButton>))
```

**Actual output (same in JS and TS):**

```
P7 node: <section><h2>ReactNode</h2>25</section>
P7 optional: <aside><h2>No child</h2></aside>
P7 button: <button type="button" disabled="">Start</button>
```

The button's static HTML contains `disabled=""`; this terminal example does not simulate a click. The isolated E9–E11 experiment below confirms what the TS props types reject. These deliberately invalid examples were only type-checked.

#### E9: Invalid ordinary children

```
function NodeCard({ children }: { children?: ReactNode }) {
  return <section>{children}</section>
}
const invalidFunction = <NodeCard>{() => <b>Drawing</b>}</NodeCard>
const invalidObject = <NodeCard>{{ label: 'Drawing' }}</NodeCard>
```

**Actual diagnostics:**

```
experiment.tsx(63,36): error TS2322: Type '() => JSX.Element' is not assignable to type 'ReactNode'.
experiment.tsx(64,36): error TS2353: Object literal may only specify known properties, and 'label' does not exist in type 'ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<...>'.
```

A function is rejected as ordinary ReactNode content; the valid render-prop version in P3 declares and calls a function explicitly. A plain object with a `label` property is also rejected. To show its label, render the string property rather than the object itself.

#### E10: A required prop stays required

```
const missingTitle = <Layout>Drawing</Layout>
```

**Actual diagnostic:**

```
experiment.tsx(71,23): error TS2741: Property 'title' is missing in type '{ children: string; }' but required in type '{ title: string; }'.
```

`PropsWithChildren` adds optional children, but does not make the existing `title: string` field optional. Supplying `title="Agenda"` fixes this call.

#### E11: Native button props are checked

```
const wrongHref = <ActionButton href="/agenda">Open</ActionButton>
const wrongType = <ActionButton type="launch">Start</ActionButton>
```

**Actual diagnostics:**

```
experiment.tsx(78,33): error TS2322: Type '{ children: string; href: string; }' is not assignable to type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>'.
  Property 'href' does not exist on type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>'. Did you mean 'ref'?
experiment.tsx(79,33): error TS2322: Type '"launch"' is not assignable to type '"button" | "submit" | "reset" | undefined'.
```

A native button does not accept an anchor's `href`. Its `type` is limited to `button`, `submit` or `reset` when supplied. The valid P7 call uses `type="button"` and `disabled`. The compiler's suggestion `ref` is part of the recorded message; it is not a replacement for link navigation.

## JavaScript vs TypeScript

The destructuring operations run the same way in JS and TS. TypeScript adds checks before execution; annotations do not convert runtime values. The table refers to real diagnostics from the isolated experiment recorded below.

| Form | What stays the same | What TypeScript adds or checks | Actual diagnostic |
|---|---|---|---|
| 1: returned tuple | Values are taken by position | An explicit tuple records each position's type | [E1: TS2322](#e1-returned-tuple), string in the second position does not fit number |
| 2: array pattern | Skipping and rest use the source iterator | The source must have an iterator | [E2: TS2488](#e2-iterable-source), numeric keys and length do not provide Symbol.iterator |
| 3: swap | The right side is read before assignment | Both existing bindings must be writable | [E3: TS2588](#e3-writable-swap-targets), both const targets are rejected |
| 4: array default | The fallback applies only to undefined | The fallback must fit the annotated element type | [E4: TS2322](#e4-array-default-type), a string fallback does not fit number |
| 5: named fields | Properties are selected by name | The source type must contain the requested property | [E5: TS2339](#e5-existing-property), duration is absent from the source type |
| 6: rename | A colon chooses a new local name | Only the new binding exists | [E6: TS2304](#e6-renamed-binding), sessionTitle is not a local variable |
| 9: nesting | The pattern reads the nested structure | An optional intermediate object needs a check or default | [E7: TS2339](#e7-optional-nested-object), owner can be undefined |
| 10: computed key | An expression selects the property | A known key union or suitable index signature is needed | [E8: TS2537](#e8-computed-key), an arbitrary string cannot index these fixed keys |

### Isolated compiler experiment

The following file was temporarily saved as `experiment.tsx` in the project root, outside the starter tsconfig's include patterns. It was only type-checked, never executed. The command explicitly supplies the relevant options because a file was passed directly to `tsc`:

```
npx tsc --noEmit --strict --skipLibCheck --target ES2022 --module NodeNext --moduleResolution NodeNext --jsx react-jsx --noUncheckedIndexedAccess experiment.tsx
```

The command exited with code 1 as expected, reporting the deliberate errors. The source is retained here for reference; the temporary file was removed afterward and `npm run check` passed. No suppression was added to these experiments. The only source suppression remains the permitted T5 `@ts-expect-error`.

```
// İrem AYRANPINAR, 2300005623
// Deliberately invalid experiments. Type-check only; do not execute this file.
import type { ReactNode, PropsWithChildren, ComponentProps } from 'react'

// E1: a tuple position has the wrong type.
{
  const result: [number, string] = [25, 'Drawing']
  const [minutes, title]: [number, number] = result
  console.log(minutes, title)
}

// E2: a plain object is not an iterable.
{
  const [first] = { 0: 'Drawing', length: 1 }
  console.log(first)
}

// E3: swap requires writable variables.
{
  const first = 'Drawing'
  const second = 'React'
  ;[first, second] = [second, first]
}

// E4: the fallback must fit the annotated tuple position.
{
  const [minutes = 'twenty-five']: [number?] = []
  console.log(minutes)
}

// E5: the source property does not exist.
{
  const session = { title: 'Drawing' }
  const { duration } = session
  console.log(duration)
}

// E6: rename creates the new binding, not the original name.
{
  const { sessionTitle: heading } = { sessionTitle: 'Drawing' }
  console.log(sessionTitle, heading)
}

// E7: a nested optional object needs a check or a default.
{
  const session: { owner?: { name: string } } = {}
  const { owner: { name } } = session
  console.log(name)
}

// E8: an arbitrary string is not a known key.
{
  const totals = { monday: 50, tuesday: 75 }
  const key: string = 'monday'
  const { [key]: minutes } = totals
  console.log(minutes)
}

// E9: ordinary ReactNode children cannot be functions or plain objects.
function NodeCard({ children }: { children?: ReactNode }) {
  return <section>{children}</section>
}
const invalidFunction = <NodeCard>{() => <b>Drawing</b>}</NodeCard>
const invalidObject = <NodeCard>{{ label: 'Drawing' }}</NodeCard>
console.log(invalidFunction, invalidObject)

// E10: PropsWithChildren preserves the required title prop.
function Layout({ title, children }: PropsWithChildren<{ title: string }>) {
  return <aside><h2>{title}</h2>{children}</aside>
}
const missingTitle = <Layout>Drawing</Layout>
console.log(missingTitle)

// E11: native button props reject an anchor's href and an invalid type.
function ActionButton({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
const wrongHref = <ActionButton href="/agenda">Open</ActionButton>
const wrongType = <ActionButton type="launch">Start</ActionButton>
console.log(wrongHref, wrongType)
```

### Recorded diagnostics for the table

The messages and line numbers below are copied from that temporary file's compiler run. E9–E11 are recorded under P7 above.

#### E1: Returned tuple

```
experiment.tsx(8,9): error TS2322: Type '[number, string]' is not assignable to type '[number, number]'.
  Type at position 1 in source is not compatible with type at position 1 in target.
    Type 'string' is not assignable to type 'number'.
```

#### E2: Iterable source

```
experiment.tsx(14,9): error TS2488: Type '{ 0: string; length: 1; }' must have a '[Symbol.iterator]()' method that returns an iterator.
```

#### E3: Writable swap targets

```
experiment.tsx(22,5): error TS2588: Cannot assign to 'first' because it is a constant.
experiment.tsx(22,12): error TS2588: Cannot assign to 'second' because it is a constant.
```

#### E4: Array default type

```
experiment.tsx(27,10): error TS2322: Type 'string' is not assignable to type 'number'.
```

#### E5: Existing property

```
experiment.tsx(34,11): error TS2339: Property 'duration' does not exist on type '{ title: string; }'.
```

#### E6: Renamed binding

```
experiment.tsx(41,15): error TS2304: Cannot find name 'sessionTitle'.
```

#### E7: Optional nested object

```
experiment.tsx(47,20): error TS2339: Property 'name' does not exist on type '{ name: string; } | undefined'.
```

#### E8: Computed key

```
experiment.tsx(55,12): error TS2537: Type '{ monday: number; tuesday: number; }' has no matching index signature for type 'string'.
```

## Bonus 1: LaTeX

The complete README is typeset with Pandoc and XeLaTeX. Code uses listings, the tables are LaTeX tables, and the table of contents links to the sections.

Source: [guide.tex](guide.tex)

PDF: [guide.pdf](guide.pdf)

After editing the README, rerun the commands below so the LaTeX source and PDF contain the same final content.

Commands:

```
node prepare-latex.mjs
pandoc guide-input.md --from=markdown --to=latex --standalone --toc --number-sections --listings --include-in-header=latex-header.tex --metadata title="Destructuring Field Guide" --metadata author="İrem AYRANPINAR - 2300005623" -V documentclass=article -V geometry:margin=25mm -V fontsize=11pt -o guide.tex
xelatex -interaction=nonstopmode -halt-on-error guide.tex
xelatex -interaction=nonstopmode -halt-on-error guide.tex
```

## Bonus 2: Depth

### A: Iterables and generator closing

**Expected result before execution:** The repeated `React` should appear once in the Set. The one-element pattern should read `25` and close the generator before `yield 40`. Changing it to a two-element pattern should also read `40`; `finally` should run in both cases. Form 4 should print `25 0`, since zero is a provided value.

**Code** (from `js/arrays.mjs`; the final version keeps the one-element generator pattern):

```
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

```
depth A string: A R
depth A set: React [ 'Pixel art', 'Math' ]
depth A map: monday 50
depth A generator: 25 [ 'yield 25', 'iterator closed' ]
depth A not iterable: TypeError {(intermediate value)(intermediate value)} is not iterable
```

For the second run, only the generator pattern and its log were changed:

```
const [onlyFirst, second] = sessions()
console.log('depth A generator:', onlyFirst, second, visited)
```

**Actual output, second run** (other output lines stayed the same):

```
depth A generator: 25 40 [ 'yield 25', 'yield 40', 'iterator closed' ]
```

The results matched the expected behavior. The second pattern reads one more value. The final code restores `[onlyFirst]` so its output clearly shows that `yield 40` is never reached.

**Why:** An array pattern reads an iterator obtained through `Symbol.iterator`. Strings, Sets and Maps support this; numeric keys and `length` alone do not. A Set provides unique values in insertion order, while a Map provides key/value entries. This explains the observed values.

The specification's BindingInitialization algorithm obtains an iterator, calls IteratorBindingInitialization and closes the iterator if it is not done. In these generator runs, closing invokes `return()` and runs `finally`. Even after the second yield, the generator is suspended until it is resumed or closed. These experiments match [ECMAScript BindingInitialization](https://262.ecma-international.org/16.0/#sec-runtime-semantics-bindinginitialization) and [IteratorBindingInitialization](https://262.ecma-international.org/16.0/#sec-runtime-semantics-iteratorbindinginitialization).

### B: When defaults run and binding order

**Expected result before execution:** A provided `0` should leave the call count at zero. Replacing it with `undefined` should call `chooseMinutes()`, while `null` should remain `null` without a call. The missing property should trigger one additional call in every run. `rest` should use the earlier `work` binding, but reading the later `second` binding should throw a `ReferenceError`.

**Code** (from `js/objects.mjs`; the final version keeps `{ minutes: 0 }`):

```
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

```
depth B provided: 0 0
depth B missing: 25 1
depth B earlier binding: 25 5
depth B later binding: ReferenceError Cannot access 'second' before initialization
```

For the second run, the provided property's value was changed from `0` to `undefined`:

```
const { minutes: provided = chooseMinutes() } = { minutes: undefined }
```

**Actual output, second run** (the binding-order lines stayed the same):

```
depth B provided: 25 1
depth B missing: 25 2
```

For the third run, the provided value was changed to `null`:

```
const { minutes: provided = chooseMinutes() } = { minutes: null }
```

**Actual output, third run** (the binding-order lines stayed the same):

```
depth B provided: null 0
depth B missing: 25 1
```

Each run started with a fresh `calls = 0`. The results matched the expectation. The final file restores `0` to keep a simple example of a supplied numeric value that does not trigger a default.

**Why:** The counter shows that the fallback function is evaluated only when needed, rather than being called and having its result discarded. Both a missing property and an explicit `undefined` trigger it. Zero and `null` preserve their values and skip the function call. This matches the initializer condition in [ECMAScript KeyedBindingInitialization](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-runtime-semantics-keyedbindinginitialization).

The pattern initializes bindings from left to right. `work` already contains `25` when `rest` is calculated, giving `5`. In the reversed dependency, `second` exists but has not been initialized when `first` tries to read it; that is the temporal dead zone. `new Function` isolates this deliberately failing experiment, and the catch prints its real error so the rest of the file can continue.

### C: Extracting types with infer and Parameters

**Code** (from `ts/types.ts`):

```
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

```
depth C: 25 [ 'Drawing', true ] Drawing: 25
```

`First` matches a tuple with a required first position and infers that position's type as `Head`. `Rest` skips the first position and infers the remaining tuple as `Tail`. This follows the approach described in the [TypeScript handbook on infer within conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types).

`Parameters<typeof describeSession>` produces the parameter tuple `[minutes: number, title: string]`. The `args` value is checked against it, then spread into the call. See the [TypeScript Parameters utility](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype).

**Extra type experiment:** The installed TypeScript compiler's type checker was used to inspect the types, as an editor hover would. The original source and a temporary in-memory version with `Session` replaced by `readonly [25, 'Drawing', true]` were both checked. A temporary alias `type ArrayFirst = First<string[]>` also checked the ordinary-array limitation. Neither experiment added a file to the project.

**Actual type-inspection output:**

```
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

These five cases cover the teacher's Assignment 3 starter, the installed TypeScript library and Vite. The Assignment 3 references were checked inside the original `Assignment_3/starter.zip`. The TypeScript locations were checked against both `package-lock.json` and the installed version, `5.8.3`. The Vite reference uses the fixed `v6.0.0` tag.

### Case 1: Task Manager useReducer

**Source:** Assignment 3 teacher's `starter.zip`, entry `starter/src/App.tsx`, line 37. **Form:** 1, values returned by position.

**Original code:**

```
const [tasks, dispatch] = useReducer(taskReducer, [])
```

**Without destructuring:**

```
const reducerResult = useReducer(taskReducer, [])
const tasks = reducerResult[0]
const dispatch = reducerResult[1]
```

**Analysis:** The hook returns the current state followed by the dispatch function. The pattern gives those two related results clear local names in one line. Their positions matter: the first value is the task state and the second is the function used to send actions. The expanded version still calls the hook once. This is a useful short pattern because the pair has a known meaning and order.

### Case 2: TaskRow props in a parameter

**Source:** Assignment 3 teacher's `starter.zip`, entry `starter/src/TaskRow.tsx`, line 5. Its props type is on line 3; the call is in `starter/src/App.tsx`, lines 25–30. **Forms:** 5 and 11, named properties extracted in a function parameter.

**Original code:**

```
export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
```

**Without destructuring** (replacement function opening; the existing body follows the bindings):

```
export default function TaskRow(props: TaskRowProps) {
  const task = props.task
  const onNext = props.onNext
  const onDelete = props.onDelete
  // Existing function body follows.
}
```

**Analysis:** `task`, `onNext` and `onDelete` are three named props within one object. `task` supplies the row data; the two callbacks are used by the Next and Delete buttons. The pattern makes the component's inputs easy to see. `TaskRowProps` has no `children` field, and the call does not pass children. The elements returned by TaskRow are its rendered content; they do not mean that TaskRow received a `children` prop. This component works with its three named props.

### Case 3: Renaming a TypeScript version field

**Source:** `node_modules/typescript/lib/typescript.js`, TypeScript `5.8.3`, line 4830, inside `Version.tryParse`. **Forms:** 5 and 6, named properties with a renamed binding.

**Original code:**

```
const { major, minor, patch, prerelease, build: build2 } = result;
```

**Without destructuring:**

```
const major = result.major;
const minor = result.minor;
const patch = result.patch;
const prerelease = result.prerelease;
const build2 = result.build;
```

**Analysis:** The version components are selected by name. The `build` property becomes the local variable `build2`, while the other bindings keep their property names. The next line passes these components to a version constructor. The surrounding code checks that parsing returned a result before destructuring it. This is emitted library code, so the local name `build2` may reflect generated naming; the snippet does not establish a performance reason for that name.

### Case 4: A nested pattern that is harder to follow

**Source:** `node_modules/typescript/lib/typescript.js`, TypeScript `5.8.3`, line 7802.

**Context:** `onTimerToUpdateChildWatches`.

**Forms:** 9 with an array pattern from Form 1.

**Original code:**

```
const { value: [dirPath, { dirName, options, fileNames }] } = result;
```

**Without destructuring:**

```
const entry = result.value;
const dirPath = entry[0];
const watchInfo = entry[1];
const dirName = watchInfo.dirName;
const options = watchInfo.options;
const fileNames = watchInfo.fileNames;
```

**Analysis:** Reading this line requires following an object property, a two-item entry and another object. The expanded version gives the intermediate values names, `entry` and `watchInfo`, so the data shape is easier to trace. For this case, those names make the longer version clearer. The surrounding code obtains `result` from a Map entry iterator and calls `Debug.assert(!result.done)` on line 7801. Access to the nested fields depends on that precondition.

### Case 5: Vite separates a URL into named parts

**Source:** [Vite v6.0.0, packages/vite/src/node/utils.ts, line 332](https://github.com/vitejs/vite/blob/v6.0.0/packages/vite/src/node/utils.ts#L332), inside `injectQuery`. **Form:** 5, named properties from a returned object.

**Original code:**

```
const { file, postfix } = splitFileAndPostfix(url)
```

**Without destructuring:**

```
const parts = splitFileAndPostfix(url)
const file = parts.file
const postfix = parts.postfix
```

**Analysis:** The helper returns the file part and the remaining query/hash suffix. The field names explain the two results without requiring an array position convention. The surrounding function uses those parts when inserting a query. Both versions call the helper once, preserving that behavior. The two short names keep this pattern easy to read. The helper's return structure was also checked in [Vite v6.0.0, packages/vite/src/shared/utils.ts, line 36](https://github.com/vitejs/vite/blob/v6.0.0/packages/vite/src/shared/utils.ts#L36).

## Bonus 4: Git repository

https://github.com/Hestiade/Advanced-Web-Assignment-4

The repository is public. At verification, its history contained 12 commits dated 17 and 20 November 2026. The initial commit was on 17 November; the implementation steps were committed on 20 November.

A fresh GitHub clone of commit `627a10e` passed `npm install`, `npm run all` and `npm run check`. The cloned `guide.tex` also compiled successfully with XeLaTeX twice. The `.gitignore` excludes `node_modules` and temporary LaTeX files.

## My own log

These notes are from the experiments run with coding assistance. I did not have clear predictions before these tests. The explanations below follow the real outputs.

### 1. Defaults with zero, undefined and null

- What was tested: In Bonus 2 B (`js/objects.mjs`), the provided `minutes` value was changed from `0` to `undefined`, then to `null`, in separate runs. A counter recorded calls to `chooseMinutes()`.
- My prediction: I was not sure when the default function would run.
- Actual result: With zero and null, `chooseMinutes()` did not run. With undefined, it ran. The missing property also called the function.
- Exact error: There was no error in these default-value comparisons.
- What I learned or changed: A default is used for undefined. It does not replace zero or null. The counter shows when the function is called.

```
depth B provided: 0 0
depth B missing: 25 1
```

```
depth B provided: 25 1
depth B missing: 25 2
```

```
depth B provided: null 0
depth B missing: 25 1
```

### 2. An array-like object without an iterator

- What was tested: Bonus 2 A (`js/arrays.mjs`) tried an array pattern on `{ 0: 'React', length: 1 }`.
- My prediction: I did not know if an object with a numeric key and length could be used here.
- Actual result: Destructuring failed and the catch printed the TypeError. The other iterable examples continued to work.
- Exact error:

```
depth A not iterable: TypeError {(intermediate value)(intermediate value)} is not iterable
```

- What I learned or changed: Looking like an array is not enough. Numeric keys and length do not make an object iterable. It also needs an iterator.

### 3. A tuple annotation does not convert a value

- What was tested: T5 (`ts/types.ts`) annotated a `[number, string]` result as `[number, number]`. Only the permitted suppression comment was temporarily removed for the compiler run, then restored.
- My prediction: I did not have a clear prediction about the type check and the actual value.
- Actual result: The compiler rejected the annotation. The runtime output still showed the second value as a string. The corrected annotation uses `[number, string]`.
- Exact compiler error from the temporary version:

```
ts/types.ts(52,9): error TS2322: Type '[number, string]' is not assignable to type '[number, number]'.
  Type at position 1 in source is not compatible with type at position 1 in target.
    Type 'string' is not assignable to type 'number'.
```

```
T5 wrong at runtime: React revision string
T5 fixed: 25 React revision
```

- What I learned or changed: A TypeScript annotation does not change the JavaScript value. I need to use the correct type instead of expecting the string to become a number.

### 4. A function passed as ordinary child content

- What was tested: P3 (`js/props.jsx`) passed a function as ordinary children, then used a separate `RenderCard` that explicitly calls its function-valued children.
- My prediction: I was not sure if React would call the function given as children.
- Actual result: The ordinary function child produced no child HTML and a React warning. The explicit render-prop call produced a bold Drawing element.
- Exact warning and rendered results:

```
P3 raw function: <section><h2>Function</h2></section>
P3 raw function warnings: [
  'Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it. children children'
]
P3 render prop: <section><b>Drawing</b></section>
```

- What I learned or changed: React does not call the function just because it is between tags. In `RenderCard`, the component calls the function and renders its result.

### 5. Rest props and the final className

- What was tested: P4 (`js/props.jsx` and `ts/props.tsx`) placed `{...rest}` after an explicit `className` in one component, and before it in the other.
- My prediction: I was not sure which className would be used when both were present.
- Actual result: The final value of `className` followed the prop order. The `id` was forwarded in both versions.
- Exact error: There was no error in these valid render calls.

```
P4 rest last: <section class="from-rest" id="agenda"><h2>Agenda</h2>Notes</section>
P4 explicit last: <section id="agenda" class="fixed"><h2>Agenda</h2>Notes</section>
```

- What I learned or changed: The last className wins. I need to check the position of `{...rest}`, because it can replace an earlier prop. The extracted title and children are not in rest.
