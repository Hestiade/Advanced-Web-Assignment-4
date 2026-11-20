// İrem AYRANPINAR
// 2300005623
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1 (worked example): destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name) // pitfall 1: TypeError
}

// Own Pitfall 1: print the actual messages for missing objects.
for (const value of [undefined, null]) {
  try {
    const { title } = value
    console.log(title)
  } catch (error) {
    console.log('own pitfall 1:', error.name, error.message)
  }
}

// Pitfall 2: null is an existing value, so the default is not used.
{
  const { minutes: missingMinutes = 25 } = {}
  const { minutes: undefinedMinutes = 25 } = { minutes: undefined }
  const { minutes: nullMinutes = 25 } = { minutes: null }
  console.log('pitfall 2:', missingMinutes, undefinedMinutes, nullMinutes)
}

// Pitfall 3: parse the incorrect syntax separately, so the whole file still runs.
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

// Pitfall 4: nested objects are shared references.
{
  const original = { owner: { name: 'Irem' }, title: 'Daily agenda' }
  const { owner } = original
  owner.name = 'Updated owner'
  console.log('pitfall 4:', original.owner.name, owner === original.owner)
}

// Pitfall 5: object names, array positions.
{
  const { title, minutes } = { minutes: 25, title: 'React revision' }
  const [first, second] = [25, 'React revision']
  console.log('pitfall 5 object:', title, minutes)
  console.log('pitfall 5 array:', first, second)
}
