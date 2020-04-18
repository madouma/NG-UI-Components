import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, Output, EventEmitter, TemplateRef } from '@angular/core';

import { TextboxSize, TextboxTexAlign } from '..';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'h2-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements OnInit {
  @Input() label: string;
  @Input() mode: string;
  @Input() dateTimeValue: Date = new Date();
  @Input() multiDates: Date[] = [new Date(), (new Date() as any)['fp_incr'](7)];
  @Input() rangeValue: { from: Date; to: Date } = {
    from: (new Date() as any)['fp_incr'](-1),
    to: new Date()
  };
  @Input() iconTemplate: TemplateRef<void> | string = '';
  @Output() refreshDate = new EventEmitter<Date | { from: Date; to: Date }>();

  TextboxSize = TextboxSize;
  TextboxTextAlign = TextboxTexAlign;

  constructor() { }

  ngOnInit() {
  }

  set value(date: Date | { from: Date; to: Date }) {
    if (this.mode === 'range') {
      this.rangeValue = {
        from: (date as { from: Date; to: Date }).from,
        to: (date as { from: Date; to: Date }).to
      };
    } else {
      this.dateTimeValue = <Date>date;
    }
  }

  get value() {
    return this.mode === 'range' ? this.rangeValue : this.dateTimeValue;
  }

  getSize() {
    return this.mode === 'range' ? TextboxSize.XLarge : TextboxSize.Large;
  }

}
