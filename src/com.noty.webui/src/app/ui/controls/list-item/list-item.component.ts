import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'noty-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',

})
export class ListItemComponent {

  public type: NotyEntryType = NotyEntryType.checkItem;
  public text: string = '';

  public constructor(
    public t: LocalizationService
  ) { }

  public get typeDescription(): string {
    return this.t.translateEntryType(this.type);
  }

  public onSelectType(type: NotyEntryType | string): void {
    this.type = <NotyEntryType>type;
  }

}
