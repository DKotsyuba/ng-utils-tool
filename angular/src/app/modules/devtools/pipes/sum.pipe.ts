import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  pure: false
})
export class SumPipe implements PipeTransform {

  transform(value: any[], field: string): number {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const num = parseFloat(item[field])
      if (isNaN(num)) break;
      count += num
    }
    return count;
  }

}
