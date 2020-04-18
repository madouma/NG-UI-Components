export interface GradientMapObj {
    resistivityRange: {
        min: number,
        max: number
    };
    steps: GradientStep[];
    selectedIndex: number;
}

export interface Color {
    hex: string;
    alpha: number;
}

export interface GradientStep extends Color {
    resistivityPoint: number;
}

export interface GradientPreset {
    name: string;
    properties: GradientPresetProperties[];
}

export class GradientPresetProperties {
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public alpha: number,
        public percentOfRes?: number
    ) { }
}
