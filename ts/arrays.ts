// İrem AYRANPINAR
// 2300005623
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

// Form 1 (worked example): the return type of the function is a tuple.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// Own Form 1: a session count and a total returned together.
{
  function sessionSummary(minutes: number[]): [number, number] {
    return [minutes.length, minutes.reduce((total, value) => total + value, 0)]
  }
  const [sessionCount, totalMinutes] = sessionSummary([25, 40, 15])
  console.log('own form 1:', sessionCount, totalMinutes)
}

// Form 2: skip the first item and collect the remaining ones.
{
  const routine: string[] = ['Breakfast', 'React revision', 'Pixel drawing', 'Walk']
  const [, nextActivity, ...laterActivities] = routine
  console.log('form 2:', nextActivity, laterActivities)
}

// Form 3: change the order of two planned activities.
{
  let firstActivity = 'Coding'
  let secondActivity = 'Drawing'
  ;[firstActivity, secondActivity] = [secondActivity, firstActivity]
  console.log('form 3:', firstActivity, secondActivity)
}

// Form 4: undefined uses the default; a zero-minute break remains zero.
{
  const settings: [number?, number?] = [undefined, 0]
  const [workMinutes = 25, breakMinutes = 10] = settings
  console.log('form 4:', workMinutes, breakMinutes)
}
