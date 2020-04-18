import { RangePercentConverter, Color, GradientStep, GradientMapObj, GradientPreset } from '.';
// import { GRADIENT_PRESET } from './color-gradient-presets';

export class GradientMap {
  presets: GradientPreset[];
  resistivityRange: {
    min: number;
    max: number;
  };
  // default value
  steps: GradientStep[] = [
    { resistivityPoint: 0, hex: '', alpha: 0 },
    { resistivityPoint: 1, hex: '', alpha: 0 }
  ];

  get resistivityPoints() {
    return this.steps.map(x => x.resistivityPoint);
  }

  get colors() {
    return this.steps.map(
      x =>
        <Color>{
          hex: x.hex,
          alpha: x.alpha
        }
    );
  }

  selectedIndex: number;
  rangePercentConverter: RangePercentConverter;

  constructor(map) {
    this.resistivityRange = map.resistivityRange || { min: 0, max: 1 };
    this.selectedIndex = map.selectedIndex || 1;
    this.rangePercentConverter =
      map.rangePercentConverter ||
      new RangePercentConverter({ minValueOfRange: 0, maxValueOfRange: 1 });
  }

  get(i = this.selectedIndex) {
    return <GradientStep>{
      resistivityPoint: this.resistivityPoints[i],
      hex: this.colors[i] && this.colors[i].hex,
      alpha: this.colors[i] && this.colors[i].alpha
    };
  }

  add(position: number) {
    this.steps.push({
      resistivityPoint: position,
      hex: '#0000ff',
      alpha: 15
    });
    this.selectedIndex = this.steps.length - 1;
  }

  addStep(step: GradientStep) {
    this.steps.push({
      resistivityPoint: step.resistivityPoint,
      hex: step.hex,
      alpha: step.alpha
    });
    this.selectedIndex = this.steps.length - 1;
  }

  delete() {
    this.steps.splice(this.selectedIndex, 1);
    this.selectedIndex = Math.min(this.selectedIndex, this.steps.length - 1);
  }

  toSortedSteps() {
    return [...this.steps].sort((a, b) => a.resistivityPoint - b.resistivityPoint);
  }
}
