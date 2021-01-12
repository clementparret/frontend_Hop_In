import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'nbOccurences' })
/**
 * Compte le nombre d'occurences de la chaine de caractères id dans le tableau array
 */
export class NbOccurencesPipe implements PipeTransform {
  transform(array: any, id: string): any {
    if (array[0] && array[0]._id) {
      return array.filter(item => item._id.toString()===id.toString()).length;
    } else {
      return array.filter(item => item.toString()===id.toString()).length;
    }
  }

}
