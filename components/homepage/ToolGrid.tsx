import SearchFilter from '@/components/homepage/SearchFilter';
import { getAllTools } from '@/lib/tools';
import type { ToolMeta } from '@/types';

export default async function ToolGrid(): Promise<React.ReactElement> {
  const tools: ToolMeta[] = await getAllTools();

  return <SearchFilter tools={tools} />;
}
