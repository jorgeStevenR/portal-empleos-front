import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { FiltroEmpleosPipe } from '../../../pipes/filtro-empleos.pipe';

@Component({
  selector: 'app-ofertas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroEmpleosPipe],
  templateUrl: './ofertas-list.html',
  styleUrls: ['./ofertas-list.css']
})
export class OfertasListComponent implements OnInit {

  empleos: any[] = [];
  empleosFiltrados: any[] = [];

  filtro: string = '';
  cargando = true;

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: any[]) => {
        this.empleos = data;
        this.empleosFiltrados = data;  // inicial
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar empleos', err);
        this.cargando = false;
      }
    });
  }

  // 🔍 Aplicar filtro sin usar el pipe en el ngFor
  filtrar(): void {
    const term = this.filtro.toLowerCase().trim();

    if (!term) {
      this.empleosFiltrados = this.empleos;
      return;
    }

    this.empleosFiltrados = this.empleos.filter(job =>
      job.title?.toLowerCase().includes(term) ||
      job.description?.toLowerCase().includes(term) ||
      job.company?.name?.toLowerCase().includes(term)
    );
  }

  verDetalle(id: number): void {
    if (id) {
      this.router.navigate(['/oferta', id]);
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/default-job.png';
  }
}
