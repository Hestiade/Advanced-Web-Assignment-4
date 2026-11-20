// İrem AYRANPINAR
// 2300005623
// The same six object forms as js/objects.mjs, now typed.

type Task = { id: string; title: string; status: 'todo' | 'in-progress' | 'done' }

// Form 5 (worked example)
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// Own Form 5: read properties regardless of their position.
{
  const planner: { title: string; status: 'todo' | 'in-progress' | 'done'; minutes: number } = { title: 'Sketch the agenda cover', status: 'in-progress', minutes: 40 }
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
  const session: { title: string; priority?: string } = { title: 'React revision' }
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
  const selectedDay: keyof typeof totals = 'tuesday'
  const { [selectedDay]: selectedMinutes } = totals
  console.log('form 10:', selectedDay, selectedMinutes)
}
