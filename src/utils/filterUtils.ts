import type { Condition } from "../types/condition";

export function parseCondition(str: string): Condition | null {
  const match = str.match(/(\w+)\s+(contain|include|>|<)\s+(\w+)/);
  if (!match) return null;

  const [, field, operator, value] = match;
  return { field, operator, value };
}

export function applyFilter<T extends Record<string, any>>(items: T[], condition: Condition): T[] {
  return items.filter(item => {
    const fieldValue = item[condition.field];

    switch (condition.operator) {
      case 'contain':
        return typeof fieldValue === 'string' && fieldValue.toLowerCase().startsWith(condition.value.toLowerCase());
     case 'include':
  if (Array.isArray(fieldValue)) {
    return fieldValue.some((item) => {
      if (typeof item === 'object' && item !== null && 'name' in item) {
        return String(item.name).toLowerCase() === condition.value.toLowerCase();
      }
      return String(item).toLowerCase() === condition.value.toLowerCase();
    });
  }
  return String(fieldValue).toLowerCase() === condition.value.toLowerCase();

      case '<':
      case 'less than':
      case 'inférieur à':
        return Number(fieldValue) < Number(condition.value);
      case '>':
      case 'greater than':
      case 'supérieur à':
        return Number(fieldValue) > Number(condition.value);
      default:
        return false;
    }
  });
}
