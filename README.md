# Destructuring Field Guide

Name: İrem AYRANPINAR

Student number: 2300005623

Bonuses claimed: none yet.

## Run

```sh
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

## How an entry looks

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

(Forms 1 to 12 go here, one entry each.)

## TypeScript topics

## Pitfalls

## Props and children

## JavaScript vs TypeScript

## Bonus 1: LaTeX

## Bonus 2: Depth

## Bonus 3: Real code

## Bonus 4: Git repository

https://github.com/Hestiade/Advanced-Web-Assignment-4

## My own log

(Your errors, wrong guesses and surprises, in your own words. See the handout.)
