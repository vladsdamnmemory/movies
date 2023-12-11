export class ObjectSorter<T> {
  // @param numDesc boolean value for sorting numbers in descending order
  static sort<T>(arr: T[], key: string, numDesc?: boolean): T[] {
    if (arr.length <= 1) {
      return arr;
    }

    return [...arr].sort((a, b) => {
      const valueA = ValueConverter.convert((a as any)[key]);
      const valueB = ValueConverter.convert((b as any)[key]);

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        // Numeric comparison
        return numDesc ? valueB - valueA : valueA - valueB;
      } else {
        // Lexicographic (dictionary) order for other types
        return String(valueA).localeCompare(String(valueB));
      }
    });
  }
}

export class ValueConverter {
  static convert(value: any): number | string {
    // Convert string to number if it represents a valid number
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      return numberValue;
    }

    // Otherwise, return the original value
    return value;
  }
}

export type Option = {
  label: string;
  value: string | number | boolean;
}
