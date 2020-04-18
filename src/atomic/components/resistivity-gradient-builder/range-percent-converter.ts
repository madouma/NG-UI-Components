// tslint:disable:max-line-length
export class RangePercentConverter {
  isLog: boolean;
  minValueOfRange: number;
  maxValueOfRange: number;
  grid = new Array(9);

  private _power = 10;

  constructor(params: IRangePercentConverter) {
    this.minValueOfRange = params.minValueOfRange;
    this.maxValueOfRange = params.maxValueOfRange;
  }

  toPercent(valueToConvert: number): number {
    return this.isLog
      ? (Math.log10(valueToConvert) - Math.log10(this.minValueOfRange)) / (Math.log10(this.maxValueOfRange) - Math.log10(this.minValueOfRange)) * 100
      : (valueToConvert - this.minValueOfRange) / (this.maxValueOfRange - this.minValueOfRange) * 100;
  }

  toRange(rangeValue: number): number {
    const percent = rangeValue / 100;
    return this.isLog
      ?  Math.pow(this._power, ((Math.log10(this.maxValueOfRange) - Math.log10(this.minValueOfRange)) * percent) + Math.log10(this.minValueOfRange))
      : ((this.maxValueOfRange - this.minValueOfRange) * percent) + this.minValueOfRange;
  }

  getScale(idx: number): number {
    return this.isLog
      ? Math.pow(this._power, idx / (this.grid.length - 1) * (Math.log10(this.maxValueOfRange) - Math.log10(this.minValueOfRange)) + Math.log10(this.minValueOfRange))
      : idx / (this.grid.length - 1) * (this.maxValueOfRange - this.minValueOfRange) + this.minValueOfRange;
  }
}

export interface IRangePercentConverter {
  minValueOfRange: number;
  maxValueOfRange: number;
}
