export type SpecialConversion = 'temperature' | 'fuel';
export type CategoryIcon =
  | 'ruler'
  | 'scale'
  | 'thermometer'
  | 'area'
  | 'volume'
  | 'speed'
  | 'time'
  | 'pressure'
  | 'energy'
  | 'power'
  | 'data'
  | 'angle'
  | 'frequency'
  | 'fuel';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  factor?: number;
}

export interface UnitCategory {
  id: string;
  name: string;
  icon: CategoryIcon;
  special?: SpecialConversion;
  units: UnitDefinition[];
}

export interface ConversionResult {
  unit: UnitDefinition;
  value: number;
}

export const unitCategories: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: 'ruler',
    units: [
      { id: 'km', name: 'Kilometre', symbol: 'km', factor: 1000 },
      { id: 'm', name: 'Metre', symbol: 'm', factor: 1 },
      { id: 'cm', name: 'Centimetre', symbol: 'cm', factor: 0.01 },
      { id: 'mm', name: 'Millimetre', symbol: 'mm', factor: 0.001 },
      { id: 'mi', name: 'Mile', symbol: 'mi', factor: 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', factor: 0.0254 },
      { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
      { id: 'au', name: 'Astronomical Unit', symbol: 'AU', factor: 1.496e11 },
      { id: 'ly', name: 'Light Year', symbol: 'ly', factor: 9.461e15 },
    ],
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: 'scale',
    units: [
      { id: 't', name: 'Metric Ton', symbol: 't', factor: 1e6 },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1000 },
      { id: 'g', name: 'Gram', symbol: 'g', factor: 1 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', factor: 0.001 },
      { id: 'lb', name: 'Pound', symbol: 'lb', factor: 453.59237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', factor: 28.349523125 },
      { id: 'st', name: 'Stone', symbol: 'st', factor: 6350.29318 },
      { id: 'ct', name: 'Carat', symbol: 'ct', factor: 0.2 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: 'thermometer',
    special: 'temperature',
    units: [
      { id: 'c', name: 'Celsius', symbol: 'C' },
      { id: 'f', name: 'Fahrenheit', symbol: 'F' },
      { id: 'k', name: 'Kelvin', symbol: 'K' },
      { id: 'r', name: 'Rankine', symbol: 'R' },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    icon: 'area',
    units: [
      { id: 'km2', name: 'Square Kilometre', symbol: 'km2', factor: 1e6 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', factor: 10000 },
      { id: 'm2', name: 'Square Metre', symbol: 'm2', factor: 1 },
      { id: 'cm2', name: 'Square Centimetre', symbol: 'cm2', factor: 1e-4 },
      { id: 'mi2', name: 'Square Mile', symbol: 'mi2', factor: 2589988.110336 },
      { id: 'acre', name: 'Acre', symbol: 'ac', factor: 4046.8564224 },
      { id: 'ft2', name: 'Square Foot', symbol: 'ft2', factor: 0.09290304 },
      { id: 'in2', name: 'Square Inch', symbol: 'in2', factor: 0.00064516 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: 'volume',
    units: [
      { id: 'm3', name: 'Cubic Metre', symbol: 'm3', factor: 1000 },
      { id: 'l', name: 'Litre', symbol: 'L', factor: 1 },
      { id: 'ml', name: 'Millilitre', symbol: 'mL', factor: 0.001 },
      { id: 'cm3', name: 'Cubic Centimetre', symbol: 'cm3', factor: 0.001 },
      { id: 'ft3', name: 'Cubic Foot', symbol: 'ft3', factor: 28.316846592 },
      { id: 'in3', name: 'Cubic Inch', symbol: 'in3', factor: 0.016387064 },
      { id: 'gal-us', name: 'Gallon US', symbol: 'gal US', factor: 3.785411784 },
      { id: 'qt-us', name: 'Quart US', symbol: 'qt US', factor: 0.946352946 },
      { id: 'cup-us', name: 'Cup US', symbol: 'cup', factor: 0.2365882365 },
      { id: 'floz-us', name: 'Fluid Ounce US', symbol: 'fl oz', factor: 0.0295735296 },
      { id: 'tbsp', name: 'Tablespoon', symbol: 'tbsp', factor: 0.0147867648 },
      { id: 'tsp', name: 'Teaspoon', symbol: 'tsp', factor: 0.00492892159 },
      { id: 'gal-uk', name: 'Gallon UK', symbol: 'gal UK', factor: 4.54609 },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: 'speed',
    units: [
      { id: 'mps', name: 'Metre per Second', symbol: 'm/s', factor: 1 },
      { id: 'kmh', name: 'Kilometre per Hour', symbol: 'km/h', factor: 0.2777777778 },
      { id: 'mph', name: 'Mile per Hour', symbol: 'mph', factor: 0.44704 },
      { id: 'kn', name: 'Knot', symbol: 'kn', factor: 0.5144444444 },
      { id: 'fps', name: 'Foot per Second', symbol: 'ft/s', factor: 0.3048 },
      { id: 'mach', name: 'Mach', symbol: 'Ma', factor: 343 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    icon: 'time',
    units: [
      { id: 'yr', name: 'Year', symbol: 'yr', factor: 31557600 },
      { id: 'mo', name: 'Month', symbol: 'mo', factor: 2629800 },
      { id: 'wk', name: 'Week', symbol: 'wk', factor: 604800 },
      { id: 'd', name: 'Day', symbol: 'd', factor: 86400 },
      { id: 'h', name: 'Hour', symbol: 'h', factor: 3600 },
      { id: 'min', name: 'Minute', symbol: 'min', factor: 60 },
      { id: 's', name: 'Second', symbol: 's', factor: 1 },
      { id: 'ms', name: 'Millisecond', symbol: 'ms', factor: 0.001 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: 'pressure',
    units: [
      { id: 'mpa', name: 'Megapascal', symbol: 'MPa', factor: 1e6 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { id: 'pa', name: 'Pascal', symbol: 'Pa', factor: 1 },
      { id: 'bar', name: 'Bar', symbol: 'bar', factor: 100000 },
      { id: 'psi', name: 'PSI', symbol: 'psi', factor: 6894.7572932 },
      { id: 'atm', name: 'Atmosphere', symbol: 'atm', factor: 101325 },
      { id: 'mmhg', name: 'Millimetre Mercury', symbol: 'mmHg', factor: 133.322387415 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'energy',
    units: [
      { id: 'mj', name: 'Megajoule', symbol: 'MJ', factor: 1e6 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      { id: 'j', name: 'Joule', symbol: 'J', factor: 1 },
      { id: 'kwh', name: 'Kilowatt Hour', symbol: 'kWh', factor: 3600000 },
      { id: 'wh', name: 'Watt Hour', symbol: 'Wh', factor: 3600 },
      { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      { id: 'cal', name: 'Calorie', symbol: 'cal', factor: 4.184 },
      { id: 'btu', name: 'BTU', symbol: 'BTU', factor: 1055.05585262 },
    ],
  },
  {
    id: 'power',
    name: 'Power',
    icon: 'power',
    units: [
      { id: 'mw', name: 'Megawatt', symbol: 'MW', factor: 1e6 },
      { id: 'kw', name: 'Kilowatt', symbol: 'kW', factor: 1000 },
      { id: 'w', name: 'Watt', symbol: 'W', factor: 1 },
      { id: 'mw-small', name: 'Milliwatt', symbol: 'mW', factor: 0.001 },
      { id: 'hp', name: 'Horsepower', symbol: 'hp', factor: 745.699872 },
      { id: 'btuh', name: 'BTU per Hour', symbol: 'BTU/h', factor: 0.29307107 },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    icon: 'data',
    units: [
      { id: 'tb', name: 'Terabyte', symbol: 'TB', factor: 8e12 },
      { id: 'gb', name: 'Gigabyte', symbol: 'GB', factor: 8e9 },
      { id: 'mb', name: 'Megabyte', symbol: 'MB', factor: 8e6 },
      { id: 'kb', name: 'Kilobyte', symbol: 'KB', factor: 8000 },
      { id: 'b', name: 'Byte', symbol: 'B', factor: 8 },
      { id: 'bit', name: 'Bit', symbol: 'bit', factor: 1 },
      { id: 'gib', name: 'Gibibyte', symbol: 'GiB', factor: 8589934592 },
      { id: 'mib', name: 'Mebibyte', symbol: 'MiB', factor: 8388608 },
      { id: 'kib', name: 'Kibibyte', symbol: 'KiB', factor: 8192 },
    ],
  },
  {
    id: 'angle',
    name: 'Angle',
    icon: 'angle',
    units: [
      { id: 'turn', name: 'Turn', symbol: 'turn', factor: 360 },
      { id: 'deg', name: 'Degree', symbol: 'deg', factor: 1 },
      { id: 'rad', name: 'Radian', symbol: 'rad', factor: 180 / Math.PI },
      { id: 'grad', name: 'Gradian', symbol: 'grad', factor: 0.9 },
      { id: 'arcmin', name: 'Arc Minute', symbol: 'arcmin', factor: 1 / 60 },
      { id: 'arcsec', name: 'Arc Second', symbol: 'arcsec', factor: 1 / 3600 },
    ],
  },
  {
    id: 'fuel',
    name: 'Fuel Economy',
    icon: 'fuel',
    special: 'fuel',
    units: [
      { id: 'l100', name: 'Litres per 100 km', symbol: 'L/100km' },
      { id: 'mpg-us', name: 'Miles per Gallon US', symbol: 'mpg US' },
      { id: 'mpg-uk', name: 'Miles per Gallon UK', symbol: 'mpg UK' },
      { id: 'kml', name: 'Kilometres per Litre', symbol: 'km/L' },
    ],
  },
];

const fallbackCategory: UnitCategory = unitCategories[0] ?? {
  id: 'length',
  name: 'Length',
  icon: 'ruler',
  units: [
    { id: 'm', name: 'Metre', symbol: 'm', factor: 1 },
    { id: 'km', name: 'Kilometre', symbol: 'km', factor: 1000 },
  ],
};

function toCelsius(value: number, fromId: string): number {
  switch (fromId) {
    case 'c':
      return value;
    case 'f':
      return ((value - 32) * 5) / 9;
    case 'k':
      return value - 273.15;
    case 'r':
      return ((value - 491.67) * 5) / 9;
    default:
      return value;
  }
}

function fromCelsius(celsius: number, toId: string): number {
  switch (toId) {
    case 'c':
      return celsius;
    case 'f':
      return (celsius * 9) / 5 + 32;
    case 'k':
      return celsius + 273.15;
    case 'r':
      return ((celsius + 273.15) * 9) / 5;
    default:
      return celsius;
  }
}

function toLitresPer100Km(value: number, fromId: string): number {
  if (value === 0) return Infinity;

  switch (fromId) {
    case 'l100':
      return value;
    case 'mpg-us':
      return 235.214583 / value;
    case 'mpg-uk':
      return 282.480936 / value;
    case 'kml':
      return 100 / value;
    default:
      return value;
  }
}

function fromLitresPer100Km(value: number, toId: string): number {
  if (!Number.isFinite(value) || value === 0) {
    return toId === 'l100' ? 0 : Infinity;
  }

  switch (toId) {
    case 'l100':
      return value;
    case 'mpg-us':
      return 235.214583 / value;
    case 'mpg-uk':
      return 282.480936 / value;
    case 'kml':
      return 100 / value;
    default:
      return value;
  }
}

export function getCategoryById(categoryId: string): UnitCategory {
  return (
    unitCategories.find((category: UnitCategory) => category.id === categoryId) ??
    fallbackCategory
  );
}

export function getDefaultTargetUnit(category: UnitCategory): string {
  return category.units[Math.min(1, category.units.length - 1)]?.id ?? category.units[0]?.id ?? '';
}

export function convertUnits(
  value: number,
  category: UnitCategory,
  fromId: string,
  toId: string,
): number {
  if (category.special === 'temperature') {
    return fromCelsius(toCelsius(value, fromId), toId);
  }

  if (category.special === 'fuel') {
    return fromLitresPer100Km(toLitresPer100Km(value, fromId), toId);
  }

  const fromUnit: UnitDefinition | undefined = category.units.find(
    (unit: UnitDefinition) => unit.id === fromId,
  );
  const toUnit: UnitDefinition | undefined = category.units.find(
    (unit: UnitDefinition) => unit.id === toId,
  );

  if (!fromUnit?.factor || !toUnit?.factor) {
    return Number.NaN;
  }

  return (value * fromUnit.factor) / toUnit.factor;
}

export function getAllConversions(
  value: number,
  category: UnitCategory,
  fromId: string,
): ConversionResult[] {
  return category.units.map((unit: UnitDefinition) => ({
    unit,
    value: convertUnits(value, category, fromId, unit.id),
  }));
}

export function getFormulaLine(
  category: UnitCategory,
  fromId: string,
  toId: string,
): string {
  if (category.special) {
    return 'Uses a formula-based conversion for this category.';
  }

  const fromUnit: UnitDefinition | undefined = category.units.find(
    (unit: UnitDefinition) => unit.id === fromId,
  );
  const toUnit: UnitDefinition | undefined = category.units.find(
    (unit: UnitDefinition) => unit.id === toId,
  );

  if (!fromUnit?.factor || !toUnit?.factor) {
    return '';
  }

  return `1 ${fromUnit.symbol} = ${formatNumber(fromUnit.factor / toUnit.factor)} ${toUnit.symbol}`;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return '-';

  const absoluteValue: number = Math.abs(value);

  if (absoluteValue === 0) return '0';
  if (absoluteValue >= 1e15 || absoluteValue < 1e-9) {
    return value.toExponential(5);
  }
  if (absoluteValue >= 10000) {
    return Number.parseFloat(value.toPrecision(8)).toLocaleString('en-IN');
  }
  if (absoluteValue >= 1) {
    return String(Number.parseFloat(value.toPrecision(8)));
  }

  return String(Number.parseFloat(value.toPrecision(6)));
}
