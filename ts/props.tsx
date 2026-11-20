// İrem AYRANPINAR
// 2300005623
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ReactNode, PropsWithChildren, ComponentProps } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

type CardProps = { title: string; children?: ReactNode }

// Worked example: the type goes after the whole pattern, and children is in the type too.
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log(renderToStaticMarkup(<Card title="Hi">text</Card>))
// <section><h2>Hi</h2>text</section>

// P1: add a non-destructured counterpart; keep the existing Card function.
function CardWithoutPattern(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}

// P1: the existing CardWithoutPattern and Card receive the same props object.
console.log('P1 A:', renderToStaticMarkup(<CardWithoutPattern title="Agenda">Plan a drawing session</CardWithoutPattern>))
console.log('P1 B:', renderToStaticMarkup(<Card title="Agenda">Plan a drawing session</Card>))

// P2: children between tags and children as an attribute.
console.log('P2 tags:', renderToStaticMarkup(<Card title="Agenda">Draw a cover</Card>))
console.log('P2 prop:', renderToStaticMarkup(<Card title="Agenda" children="Draw a cover" />))

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

// P5: named slots versus composed children.
function SlotCard({ header, footer, children }: { header: ReactNode; footer: ReactNode; children?: ReactNode }) {
  return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article>
}
function CompositionCard({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
console.log('P5 slots:', renderToStaticMarkup(<SlotCard header={<h2>Today</h2>} footer={<small>One session</small>}><p>Draw</p></SlotCard>))
console.log('P5 children:', renderToStaticMarkup(<CompositionCard><header><h2>Today</h2></header><main><p>Draw</p></main><footer><small>One session</small></footer></CompositionCard>))

// P6: missing/undefined use the default; null does not.
function DefaultCard({ title = 'Untitled session', children }: { title?: string | null; children?: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P6 missing:', renderToStaticMarkup(<DefaultCard>Notes</DefaultCard>))
console.log('P6 undefined:', renderToStaticMarkup(<DefaultCard title={undefined}>Notes</DefaultCard>))
console.log('P6 null:', renderToStaticMarkup(<DefaultCard title={null}>Notes</DefaultCard>))

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
