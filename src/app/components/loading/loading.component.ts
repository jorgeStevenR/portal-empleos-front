import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <div *ngIf="loadingService.loading$ | async" class="loading-bar-container">
      <div class="loading-bar"></div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
