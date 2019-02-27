import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any, sortedBy: string): any {
        if(items.content){
            return items.content.sort((a, b) => {return b[sortedBy] - a[sortedBy]});
        }
    }
}