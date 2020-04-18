import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoke'
})
export class InvokePipe implements PipeTransform {
  transform(value: any, func: Function, args?: any): any {
    return func(value, ...args);
  }
}
