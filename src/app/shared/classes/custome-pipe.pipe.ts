import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customePipe'
})
export class CustomePipePipe implements PipeTransform {

  transform(value: string): string {
    // Add breaks to separate parts of the title
    const formatted = value
      .replace(/Hall 1/gi, '<br>Hall 1') // Add line break before "Hall 1"
      .replace(/Hall 2/gi, '<br>Hall 2') // Add line break before "Hall 2"
      .replace(/Hall 1/gi, '<span style="color: red; font-weight: bold;">Hall 1 -</span>')
      .replace(/Hall 2/gi, '<span style="color: blue; font-weight: bold;">Hall 2 -</span>');
    return formatted;
  }

}
