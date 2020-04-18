import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {
  transform(str: string = ''): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')    // replaces camelCase
              .replace(/[\s_]+/g, '-')                // replace dashes and spaces
              .toLowerCase();
  }
}
