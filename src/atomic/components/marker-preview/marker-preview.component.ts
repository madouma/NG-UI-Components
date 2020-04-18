import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkerPreviewStyle } from './marker-preview.enums';
import { clamp } from '../../common/utils';

@Component({
  selector: 'h2-marker-preview',
  templateUrl: './marker-preview.component.html',
  styleUrls: ['./marker-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerPreviewComponent {
  @Input() wrapper = true;
  @Input() text: string;
  @Input() viewboxSize = 25;
  // Marker specific Inputs
  @Input() size = 10;
  @Input() borderWidth = 2;
  @Input() lineColor = 'currentColor';
  @Input() fillColor = 'currentColor';
  @Input() style: MarkerPreviewStyle;

  Style = MarkerPreviewStyle;

  get halfBorderWidth() {
    return this.borderWidth / 2;
  }

  get diamondPoints() {
    const diamondHeight = clamp(
      Math.sqrt(Math.pow(this.size, 2) + Math.pow(this.size, 2)) - this.borderWidth,
      this.size,
      this.viewboxSize
    );
    const spaceFromEdge = Math.round((this.viewboxSize - diamondHeight) / 2);
    return `
      ${spaceFromEdge} ${this.viewboxSize / 2},
      ${this.viewboxSize / 2} ${spaceFromEdge},
      ${this.viewboxSize - spaceFromEdge} ${this.viewboxSize / 2},
      ${this.viewboxSize / 2} ${this.viewboxSize - spaceFromEdge}  
    `;
  }

  get trianglePoints() {
    const triangleHeight = Math.sqrt(Math.pow(this.size, 2) - Math.pow(this.size / 2, 2));
    const vertSpaceFromEdge = Math.floor((this.viewboxSize - triangleHeight) / 2);
    const horzSpaceFromEdge = Math.floor((this.viewboxSize - this.size) / 2);
    return `
      ${this.viewboxSize / 2} ${vertSpaceFromEdge},
      ${this.viewboxSize - horzSpaceFromEdge} ${this.viewboxSize - vertSpaceFromEdge},
      ${horzSpaceFromEdge} ${this.viewboxSize - vertSpaceFromEdge}
    `;
  }

  get lineEdgeSpace() {
    return (this.viewboxSize - this.size) / 2;
  }
}
