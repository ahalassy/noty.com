/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'noty-new-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, NgIf],
  templateUrl: './new-list-control.component.html'
})
export class NewListControlComponent {

  public isFocused: boolean = false;

  public onInputFocus(): void {
    this.isFocused = true;
  }

  public onCancel(): void {
    this.isFocused = false;
  }


}
