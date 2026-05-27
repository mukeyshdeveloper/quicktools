export default function HomeHero(): React.ReactElement {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-20">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        Free · Fast · No Signup
      </div>

      <h1 className="font-display text-4xl font-extrabold leading-tight text-text sm:text-5xl lg:text-6xl">
        Your everyday web tools all in one place
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
        QuickUtils gives you simple calculators, text helpers, generators, and
        developer utilities that work right in your browser.
      </p>
    </section>
  );
}
