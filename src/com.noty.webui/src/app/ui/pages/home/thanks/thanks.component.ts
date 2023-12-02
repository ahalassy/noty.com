import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './thanks.component.html'
})
export class ThanksComponent {

}
