/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewListControlComponent } from 'src/app/ui/controls/new-list-control/new-list-control.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, NewListControlComponent]
})
export class DashboardComponent {

  public type: string = '';
}
