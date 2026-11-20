// İrem AYRANPINAR
// 2300005623
// What only TypeScript adds (topics T1 to T5). See the handout.

// T1 (worked example): `{ a: string }` inside a pattern is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal; there is no variable x
console.log('T1:', horizontal) // T1: 1

// Own T1: the colon inside the pattern renames the binding.
{
  const example = { title: 'Daily agenda' }
  const { title: string } = example
  console.log('T1 rename:', string)
  const { title }: { title: string } = example
  console.log('T1 annotation:', title)
}

// T2: an explicit tuple and an inferred readonly tuple.
{
  function sessionResult(): [number, string] {
    return [50, 'React revision']
  }
  const [minutes, title] = sessionResult()
  const preset = [25, 'Drawing'] as const
  const [fixedMinutes, fixedTitle] = preset
  console.log('T2:', minutes, title, fixedMinutes, fixedTitle)
}

// T3: string[] can be empty; first has type string | undefined.
{
  const activities: string[] = []
  const [first] = activities
  console.log('T3 first:', first)
  if (first !== undefined) console.log('T3 narrowed:', first.toUpperCase())
  const [fallback = 'Rest'] = activities
  console.log('T3 fallback:', fallback.toUpperCase())
}

// T4: an optional field, with and without a default.
{
  type Options = { minutes?: number }
  const options: Options = {}
  const { minutes: optionalMinutes } = options
  const { minutes: safeMinutes = 25 } = options
  console.log('T4:', optionalMinutes, safeMinutes, safeMinutes + 5)
}

// T5: remove only the suppression temporarily to record the real diagnostic.
{
  const result: [number, string] = [25, 'React revision']
  // @ts-expect-error -- the second tuple item is a string, not a number.
  const [, wrongMinutes]: [number, number] = result
  console.log('T5 wrong at runtime:', wrongMinutes, typeof wrongMinutes)
  const [correctMinutes, correctTitle]: [number, string] = result
  console.log('T5 fixed:', correctMinutes, correctTitle)
}

// Bonus 2 C: destructuring-like extraction at the type level.
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
