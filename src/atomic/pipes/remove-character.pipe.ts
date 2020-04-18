import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeChar'
})
export class RemoveCharacterPipe implements PipeTransform {

  transform(value: string, char: string): string {
      return (value + '').replace(char, '');
  }

}
