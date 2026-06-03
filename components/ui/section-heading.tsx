type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="hp-kicker mb-3">{eyebrow}</p> : null}
      <h2 className="hp-wrap text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
      <div className="hp-rule mt-3 h-px w-28" />
      {body ? <p className="hp-wrap mt-3 text-base leading-7 text-slate-300">{body}</p> : null}
    </div>
  );
}
