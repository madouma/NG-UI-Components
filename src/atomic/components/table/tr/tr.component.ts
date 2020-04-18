import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'h2-tr',
  templateUrl: './tr.component.html',
  styleUrls: ['./tr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrComponent { }
