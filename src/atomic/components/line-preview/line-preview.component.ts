import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinePreviewSize, LinePreviewStyle } from "./line-preview.enums";

@Component({
  selector: 'h2-line-preview',
  templateUrl: './line-preview.component.html',
  styleUrls: ['./line-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinePreviewComponent {
  @Input() text: string;
  @Input() style: LinePreviewStyle;
  @Input() thickness: number;
  @Input() color: string;
  @Input() size = LinePreviewSize.XSmall;
  @Input() wrapper = true;

  lineStyleSegments = Array(20);
  LinePreviewStyle = LinePreviewStyle;
}
