function  isBetween(value:number,min: number, max: number): boolean {
    return value >= min && value <= max;
  }

function  isGte(value: number, compare: number): boolean {
    return value >= compare;
  }

function  isGt(value:number,compare: number): boolean {
    return value > compare;
  }

function  isLte(value:number,compare: number): boolean {
    return value <= compare;
  }

function  isLt(value:number,compare: number): boolean {
    return value < compare;
  }

function  equals(value:number,compare: number): boolean {
    return value === compare;
  }

function  notEquals(value:number,compare: number): boolean {
    return value !== compare;
  }

function  isPositive(value:number,): boolean {
    return value > 0;
  }

function  isNegative(value:number,): boolean {
    return value < 0;
  }

function  isZero(value:number,): boolean {
    return value === 0;
  }

function  isEven(value:number,): boolean {
    return Number.isInteger(value) && value % 2 === 0;
  }

function  isOdd(value:number,): boolean {
    return Number.isInteger(value) && value % 2 !== 0;
  }

function  isInteger(value:number,): boolean {
    return Number.isInteger(value);
  }

function  isFinite(value:number,): boolean {
    return Number.isFinite(value);
}

