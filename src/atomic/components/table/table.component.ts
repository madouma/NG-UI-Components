import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'h2-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent { }
