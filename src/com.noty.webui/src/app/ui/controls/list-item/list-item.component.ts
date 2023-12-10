import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'noty-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {

  public type: NotyEntryType = NotyEntryType.checkItem;
  public text: string = '';

}
