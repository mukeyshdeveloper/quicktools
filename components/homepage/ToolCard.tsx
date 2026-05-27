import Link from 'next/link';
import type { ToolMeta } from '@/types';

const tagClassByCategory: Record<ToolMeta['category'], string> = {
  calculator: 'tag-calculator',
  text: 'tag-text',
  health: 'tag-health',
  developer: 'tag-developer',
  generator: 'tag-generator',
  business: 'tag-business',
};

interface ToolCardProps {
  tool: ToolMeta;
}

export default function ToolCard({ tool }: ToolCardProps): React.ReactElement {
  return (
    <Link className="tool-card group" href={tool.canonical}>
      <span className="card-icon" aria-hidden="true">
        {tool.icon}
      </span>
      <span className="card-name">{tool.name}</span>
      <span className="card-desc">{tool.description}</span>
      <span className={`card-tag ${tagClassByCategory[tool.category]}`}>
        {tool.category}
      </span>
    </Link>
  );
}
