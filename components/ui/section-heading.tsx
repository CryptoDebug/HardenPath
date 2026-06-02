type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="hp-kicker mb-3">{eyebrow}</p> : null}
      <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <div className="hp-rule mt-3 h-px w-28" />
      {body ? <p className="mt-3 text-base leading-7 text-slate-300">{body}</p> : null}
    </div>
  );
}
