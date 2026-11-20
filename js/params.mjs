// İrem AYRANPINAR
// 2300005623
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11 (worked example): an options object in the parameter list, with defaults.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}
console.log('form 11:', createTask({ title: 'Read' })) // form 11: { title: 'Read', status: 'todo' }

// Own Form 11: both the object and its properties can have defaults.
{
  function planSession({ title = 'Free drawing', minutes = 25 } = {}) {
    return { title, minutes }
  }
  console.log('own form 11 missing:', planSession())
  console.log('own form 11 partial:', planSession({ title: 'React revision' }))
  console.log('own form 11 zero:', planSession({ title: 'Rest', minutes: 0 }))
}

// Form 11b: destructuring an array parameter.
{
  function sessionLength([workMinutes, breakMinutes]) {
    return workMinutes + breakMinutes
  }
  console.log('form 11b:', sessionLength([25, 5]))
}

// Form 12: Object.entries and Map both produce pairs.
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
