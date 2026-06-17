'use client';

interface SkillPillProps {
  name: string;
  color?: string;
}

const categoryColors: Record<string, string> = {
  'ai': '#00f5ff',
  'frontend': '#bf00ff',
  'backend': '#ff6b35',
  'data': '#39ff14',
  'devops': '#fff200',
  'languages': '#00f5ff',
  'database': '#ff6b35',
};

export default function SkillPill({ name, color }: SkillPillProps) {
  const c = color || '#00f5ff';

  return (
    <span
      className="skill-pill"
      style={{
        color: c,
        borderColor: `${c}50`,
        background: `${c}15`,
        textShadow: `0 0 8px ${c}50`,
      }}
      onMouseEnter={(e) => {
        const el = e.target as HTMLElement;
        el.style.boxShadow = `0 0 20px ${c}60`;
        el.style.borderColor = `${c}a0`;
        el.style.background = `${c}25`;
      }}
      onMouseLeave={(e) => {
        const el = e.target as HTMLElement;
        el.style.boxShadow = `none`;
        el.style.borderColor = `${c}50`;
        el.style.background = `${c}15`;
      }}
      data-hover
    >
      {name}
    </span>
  );
}

export { categoryColors };
