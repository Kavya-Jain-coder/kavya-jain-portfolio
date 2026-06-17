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
        borderColor: `${c}33`,
        boxShadow: `0 0 0 0 ${c}00`,
      }}
      onMouseEnter={(e) => {
        const el = e.target as HTMLElement;
        el.style.boxShadow = `0 0 15px ${c}40`;
        el.style.borderColor = `${c}80`;
        el.style.background = `${c}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.target as HTMLElement;
        el.style.boxShadow = `0 0 0 0 ${c}00`;
        el.style.borderColor = `${c}33`;
        el.style.background = 'rgba(255,255,255,0.04)';
      }}
      data-hover
    >
      {name}
    </span>
  );
}

export { categoryColors };
