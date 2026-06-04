export type MockType = 'string' | 'number' | 'boolean' | 'date' | 'email' | 'uuid' | 'url' | 'object' | 'array' | 'name' | 'price' | 'avatar' | 'phone' | 'city';

export interface MockSchemaField {
  name: string;
  type: MockType;
  min?: number;
  max?: number;
  enum?: any[];
  pattern?: string;
  items?: MockSchemaField[];
  properties?: MockSchemaField[];
}

export interface MockOptions {
  count?: number;
  seed?: string;
  errorType?: 'client' | 'server' | 'none';
  statusCode?: number;
}

const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Jamie', 'Avery', 'Reese', 'Quinn'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const CITIES = ['New York', 'London', 'Berlin', 'Tokyo', 'Mumbai', 'Sydney', 'São Paulo', 'Toronto', 'Dubai', 'Singapore'];

function seededRandom(seed: string, index: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
  }
  const x = Math.sin(hash + index) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], rand: number): T {
  return arr[Math.floor(rand * arr.length)] as T;
}

function generateValue(field: MockSchemaField, index: number, seed?: string): any {
  const s = seed || 'default';
  const rand = seededRandom(s, index * 31 + field.name.length);

  if (field.enum && field.enum.length) {
    return field.enum[Math.floor(rand * field.enum.length)];
  }

  switch (field.type) {
    case 'name':
      return `${pick(FIRST_NAMES, rand)} ${pick(LAST_NAMES, seededRandom(s, index + 7))}`;
    case 'price':
      const pmin = field.min ?? 5;
      const pmax = field.max ?? 199;
      return Math.round((pmin + rand * (pmax - pmin)) * 100) / 100;
    case 'avatar':
      return `https://i.pravatar.cc/128?u=${Math.floor(rand * 9999)}`;
    case 'phone':
      return `+1${Math.floor(2000000000 + rand * 8000000000)}`;
    case 'city':
      return pick(CITIES, rand);
    case 'string':
      if (field.pattern) return field.pattern.replace(/./g, () => String.fromCharCode(97 + Math.floor(rand * 26)));
      return `item-${Math.floor(rand * 10000)}`;
    case 'number':
      const min = field.min ?? 0;
      const max = field.max ?? 100;
      return Math.floor(min + rand * (max - min));
    case 'boolean':
      return rand > 0.5;
    case 'date':
      // Use a fixed reference date so the pure generator is safe during Next.js prerender
      const REF = Date.UTC(2025, 0, 1);
      const d = new Date(REF - rand * 10000000000);
      return d.toISOString();
    case 'email':
      const fn = pick(FIRST_NAMES, rand).toLowerCase();
      return `${fn}.${Math.floor(rand * 999)}@example.com`;
    case 'uuid':
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (rand * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    case 'url':
      return `https://api.example.com/v1/resource/${Math.floor(rand * 10000)}`;
    case 'object':
      if (!field.properties || field.properties.length === 0) return {};
      return Object.fromEntries(field.properties.map(p => [p.name, generateValue(p, index, s)]));
    case 'array':
      const len = field.min ? Math.max(field.min, Math.floor(rand * (field.max || 4) + 1)) : 1 + Math.floor(rand * 4);
      if (!field.items || field.items.length === 0) return [];
      const firstItem = field.items[0];
      if (!firstItem) return [];
      return Array.from({ length: len }, (_, i) => generateValue(firstItem, index * 17 + i, s));
    default:
      return null;
  }
}

export function generateMockResponse(schema: MockSchemaField[], options: MockOptions = {}): any {
  const count = Math.max(1, Math.min(100, options.count || 1));
  const seed = options.seed || '';

  if (options.errorType === 'client') {
    return { error: 'Bad Request', message: 'The request could not be understood.', status: options.statusCode || 400 };
  }
  if (options.errorType === 'server') {
    return { error: 'Internal Server Error', message: 'An unexpected error occurred.', status: options.statusCode || 500 };
  }

  const data = Array.from({ length: count }, (_, i) =>
    Object.fromEntries((schema || []).map((field: MockSchemaField) => [field.name, generateValue(field, i, seed)]))
  );

  return count === 1 ? data[0] : data;
}

export function generateCodeSnippets(endpoint: string, method: string, response: any): Record<string, string> {
  const json = JSON.stringify(response, null, 2);
  return {
    curl: `curl -X ${method.toUpperCase()} "${endpoint}" \\\n  -H "Accept: application/json" \\\n  -H "Content-Type: application/json"`,
    fetch: `const res = await fetch("${endpoint}", {\n  method: "${method.toUpperCase()}",\n  headers: { "Content-Type": "application/json" }\n});\nconst data = await res.json();\nconsole.log(data);`,
    axios: `const { data } = await axios.${method.toLowerCase()}("${endpoint}");\nconsole.log(data);`,
    python: `import requests\nr = requests.${method.toLowerCase()}("${endpoint}")\nprint(r.json())`,
    node: `const res = await fetch("${endpoint}");\nconst json = await res.json();\nconsole.dir(json);`,
  };
}

export const DEFAULT_SCHEMA: MockSchemaField[] = [
  { name: 'id', type: 'uuid' },
  { name: 'name', type: 'name' },
  { name: 'email', type: 'email' },
  { name: 'age', type: 'number', min: 18, max: 65 },
  { name: 'city', type: 'city' },
  { name: 'active', type: 'boolean' },
  { name: 'createdAt', type: 'date' },
];

export const PRESETS: Record<string, MockSchemaField[]> = {
  'User Profile': DEFAULT_SCHEMA,
  'Product': [
    { name: 'id', type: 'uuid' },
    { name: 'name', type: 'string' },
    { name: 'price', type: 'price', min: 9, max: 299 },
    { name: 'inStock', type: 'boolean' },
    { name: 'tags', type: 'array', items: [{ name: 'tag', type: 'string' }] },
  ],
  'Paginated List': [
    { name: 'items', type: 'array', min: 5, max: 5, items: [{ name: 'item', type: 'object', properties: DEFAULT_SCHEMA }] },
    { name: 'page', type: 'number', min: 1, max: 1 },
    { name: 'total', type: 'number', min: 42, max: 42 },
    { name: 'hasMore', type: 'boolean' },
  ],
  'Order with Items': [
    { name: 'orderId', type: 'uuid' },
    { name: 'customer', type: 'name' },
    { name: 'total', type: 'price', min: 20, max: 450 },
    { name: 'items', type: 'array', min: 1, max: 4, items: [{ name: 'line', type: 'object', properties: [
      { name: 'sku', type: 'string' },
      { name: 'qty', type: 'number', min: 1, max: 6 },
      { name: 'unitPrice', type: 'price', min: 4, max: 89 },
    ] }] },
    { name: 'createdAt', type: 'date' },
  ],
};
