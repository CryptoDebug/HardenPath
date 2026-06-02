type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-mint">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {body ? <p className="mt-3 text-base leading-7 text-slate-300">{body}</p> : null}
    </div>
  );
}
