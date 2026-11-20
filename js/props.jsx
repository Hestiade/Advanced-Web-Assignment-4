// İrem AYRANPINAR
// 2300005623
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// Worked example: props is ONE object; the parameter pattern takes it apart.
// These two components are the same thing written two ways.
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))
// A: <section><h2>Hi</h2>text</section>
// B: <section><h2>Hi</h2>text</section>

// P1: the existing CardA and CardB receive the same props object.
console.log('P1 A:', renderToStaticMarkup(<CardA title="Agenda">Plan a drawing session</CardA>))
console.log('P1 B:', renderToStaticMarkup(<CardB title="Agenda">Plan a drawing session</CardB>))

// P2: children between tags and children as an attribute.
console.log('P2 tags:', renderToStaticMarkup(<CardB title="Agenda">Draw a cover</CardB>))
console.log('P2 prop:', renderToStaticMarkup(<CardB title="Agenda" children="Draw a cover" />))

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

// P5: named slots versus composed children.
function SlotCard({ header, footer, children }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function CompositionCard({ children }) {
  return <article>{children}</article>
}
console.log('P5 slots:', renderToStaticMarkup(<SlotCard header={<h2>Today</h2>} footer={<small>One session</small>}><p>Draw</p></SlotCard>))
console.log('P5 children:', renderToStaticMarkup(<CompositionCard><header><h2>Today</h2></header><main><p>Draw</p></main><footer><small>One session</small></footer></CompositionCard>))

// P6: missing/undefined use the default; null does not.
function DefaultCard({ title = 'Untitled session', children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P6 missing:', renderToStaticMarkup(<DefaultCard>Notes</DefaultCard>))
console.log('P6 undefined:', renderToStaticMarkup(<DefaultCard title={undefined}>Notes</DefaultCard>))
console.log('P6 null:', renderToStaticMarkup(<DefaultCard title={null}>Notes</DefaultCard>))

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
