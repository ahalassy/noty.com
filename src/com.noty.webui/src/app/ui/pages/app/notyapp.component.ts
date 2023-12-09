import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ImpersonationService } from 'src/app/services/impersonation.service';
import { NewListControlComponent } from '../../controls/new-list-control/new-list-control.component';

@Component({
  selector: 'app-notyapp',
  standalone: true,
  imports: [CommonModule, RouterModule, NewListControlComponent],
  templateUrl: './notyapp.component.html',
  styleUrl: './notyapp.component.css'
})
export class NotyappComponent {

  public constructor(
    private impersonation: ImpersonationService,
    private router: Router
  ) {

  }

  public async onSignOutClick() {
    await this.impersonation.release();
    this.router.navigate(["/"]);
  }

}
