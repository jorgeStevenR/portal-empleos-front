// ============================================
// 📂 src/app/pages/ofertas-laborales/ofertas-list/ofertas-list.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-ofertas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ofertas-list.html',
  styleUrls: ['./ofertas-list.css']
})
export class OfertasListComponent implements OnInit {
  empleos: any[] = [];
  filtro: string = '';
  cargando = true;

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: any[]) => {
        this.empleos = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar empleos', err);
        this.cargando = false;
      }
    });
  }

  verDetalle(id: number): void {
    if (id) this.router.navigate(['/oferta', id]);
  }
}
