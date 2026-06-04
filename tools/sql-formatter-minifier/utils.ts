const KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL',
  'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX',
  'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'UNION', 'ALL', 'WITH', 'RECURSIVE',
  'EXISTS', 'ASC', 'DESC', 'COALESCE', 'CAST', 'CONCAT', 'SUBSTRING'
]);

function upperIfKw(token: string, upper: boolean): string {
  const u = token.toUpperCase();
  if (KEYWORDS.has(u)) return upper ? u : token.toLowerCase();
  return token;
}

export function formatSQL(sql: string, uppercase = true, indentSize = 2): string {
  // Basic cleanup
  let s = sql
    .replace(/--.*$/gm, '') // strip line comments for formatting clarity (kept in minify only)
    .replace(/\s+/g, ' ')
    .replace(/\s*([,()])\s*/g, '$1 ')
    .trim();

  const tokens = s.split(/\s+/).filter(Boolean);
  let indent = 0;
  const lines: string[] = [];
  let current = '';

  const push = () => { if (current.trim()) lines.push(' '.repeat(indent * indentSize) + current.trim()); current = ''; };

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i] || '';
    const u = tok.toUpperCase();

    if (['SELECT', 'FROM', 'WHERE', 'GROUP', 'HAVING', 'ORDER', 'LIMIT', 'WITH'].includes(u)) {
      push();
      if (u === 'SELECT' && indent === 0) indent = 1;
      if (u === 'FROM' || u === 'WHERE') indent = Math.max(1, indent);
      current = upperIfKw(tok, uppercase);
    } else if (['JOIN', 'INNER', 'LEFT', 'RIGHT'].includes(u)) {
      push();
      current = upperIfKw(tok, uppercase);
    } else if (u === 'ON') {
      push();
      current = '  ' + upperIfKw(tok, uppercase);
      indent += 0.5; // visual
    } else if (['AND', 'OR'].includes(u)) {
      push();
      current = '  ' + upperIfKw(tok, uppercase);
    } else if (u === 'UNION') {
      push();
      current = upperIfKw(tok, uppercase);
      indent = 1;
    } else if (tok === '(') {
      current += ' (';
      indent += 1;
    } else if (tok === ')') {
      push();
      indent = Math.max(0, indent - 1);
      current = ')';
    } else if (tok === ',') {
      current += ',';
      push();
    } else {
      current += (current ? ' ' : '') + upperIfKw(tok, uppercase);
    }
  }
  push();

  // Re-join and fix minor spacing around parens
  return lines.join('\n').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}

export function minifySQL(sql: string): string {
  return sql
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([,();=<>!+\-*/])\s*/g, '$1')
    .trim();
}

export function detectDialect(sql: string): string {
  const upper = sql.toUpperCase();
  if (upper.includes('WITH ') && upper.includes('AS (')) return 'PostgreSQL / Modern SQL';
  if (upper.includes('LIMIT') && upper.includes('OFFSET')) return 'PostgreSQL';
  if (upper.includes('TOP ') || upper.includes('IDENTITY')) return 'SQL Server';
  if (upper.includes('AUTO_INCREMENT')) return 'MySQL';
  if (upper.includes('RECURSIVE')) return 'SQLite / PostgreSQL';
  return 'Standard SQL';
}
