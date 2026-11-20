// İrem AYRANPINAR
// 2300005623
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (worked example): take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

// Own Form 1: a session count and a total returned together.
{
  function sessionSummary(minutes) {
    return [minutes.length, minutes.reduce((total, value) => total + value, 0)]
  }
  const [sessionCount, totalMinutes] = sessionSummary([25, 40, 15])
  console.log('own form 1:', sessionCount, totalMinutes)
}

// Form 2: skip the first item and collect the remaining ones.
{
  const routine = ['Breakfast', 'React revision', 'Pixel drawing', 'Walk']
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
  const settings = [undefined, 0]
  const [workMinutes = 25, breakMinutes = 10] = settings
  console.log('form 4:', workMinutes, breakMinutes)
}

// Bonus 2 A: array patterns consume an iterable.
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
