import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'nbOccurences' })
export class NbOccurencesPipe implements PipeTransform {
  transform(array: any, id: string): any {
    return array.filter(item => item._id===id).length;
  }

}
