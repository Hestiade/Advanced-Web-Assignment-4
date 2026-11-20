// İrem AYRANPINAR
// 2300005623
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5 (worked example): take properties out of an object by name.
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// Own Form 5: read properties regardless of their position.
{
  const planner = { title: 'Sketch the agenda cover', status: 'in-progress', minutes: 40 }
  let { title, status } = planner
  console.log('own form 5:', title, status)
}

// Form 6: rename without changing the original object.
{
  const planner = { title: 'Sketch the agenda cover', minutes: 40 }
  const { title: heading } = planner
  console.log('form 6:', heading, planner.title)
}

// Form 7: a default for an omitted property.
{
  const session = { title: 'React revision' }
  const { priority = 'normal' } = session
  console.log('form 7:', priority)
}

// Form 8: rest excludes the extracted property.
{
  const session = { id: 'session-7', title: 'React revision', minutes: 25 }
  const { id, ...details } = session
  console.log('form 8:', id, details)
}

// Form 9: an object and an array inside another object.
{
  const agenda = {
    owner: { name: 'Irem' },
    activities: ['Draw a cover', 'Write a daily page'],
  }
  const { owner: { name }, activities: [firstActivity] } = agenda
  console.log('form 9:', name, firstActivity)
}

// Form 10: choose the property at runtime.
{
  const totals = { monday: 50, tuesday: 75 }
  const selectedDay = 'tuesday'
  const { [selectedDay]: selectedMinutes } = totals
  console.log('form 10:', selectedDay, selectedMinutes)
}

// Bonus 2 B: defaults run only when the extracted value is undefined.
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
