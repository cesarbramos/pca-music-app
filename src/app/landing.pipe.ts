import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'landing'
})
export class LandingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
