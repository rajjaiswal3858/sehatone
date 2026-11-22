export type FaqItem = { q: string; a: string };

/** Native <details> accordion: accessible, works without JS, and answers stay in the HTML for crawlers. */
export function Faq({ items, id = "faq", title = "Frequently asked questions", index }: {
  items: FaqItem[]; id?: string; title?: string; index?: string;
}) {
  return (
    <section id={id} className="section faq" aria-labelledby={`${id}-title`}>
      <div className="wrap faq__grid">
        <div>
          <p className="kicker">{index && <span>{index}</span>}FAQ</p>
          <h2 id={`${id}-title`} className="h2">{title}</h2>
        </div>
        <div className="faq__list">
          {items.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary><h3>{f.q}</h3></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
