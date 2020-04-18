import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'h2-td',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TdComponent { }
