import { BadRequestException } from "@nestjs/common";

export class DeepSet<T> extends Set<T> {
  constructor() {
    super();
  }

  add(o: T): this {
    for (let i of this) {
      if (deepCompare(o, i)) {
        throw new BadRequestException("Only unique Objects is allowed in DeepSet!");
      }
    }

    super.add.call(this, o);
    return this;
  }

  values(): IterableIterator<T> {
    return super.values.call(this);
  }
}

export function deepCompare(firstValue: any, secondValue: any): boolean {
  return JSON.stringify(firstValue) === JSON.stringify(secondValue);
}
