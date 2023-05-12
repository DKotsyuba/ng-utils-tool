import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumTotal',
  pure: false
})
export class SumTotalPipe implements PipeTransform {

  transform(value: any[][], field: string): number {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      count += item[1].reduce((acc, item) => acc + item[field], 0);
    }
    return count;
  }

}
