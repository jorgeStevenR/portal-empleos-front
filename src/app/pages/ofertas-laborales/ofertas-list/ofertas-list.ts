import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
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
  empleosPagina: any[] = [];

  postuladosIds: number[] = [];

  filtro: string = '';
  cargando = true;

  // PAGINACIÓN
  paginaActual = 1;
  itemsPorPagina = 12;
  totalPaginas = 1;

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.jobService.getAllJobs().subscribe({
      next: (data: any[]) => {

        // ORDENAR NUEVOS PRIMERO
        this.empleos = data.sort((a, b) => b.idJob - a.idJob);

        // PAGINACIÓN
        this.totalPaginas = Math.ceil(this.empleos.length / this.itemsPorPagina);
        this.actualizarPagina();

        // POSTULACIONES
        const userId = this.authService.getUserId();
        if (userId) {
          this.applicationService.getByUserId(userId).subscribe({
            next: (apps: any[]) => {
              this.postuladosIds = apps.map(a => a.job.idJob);
            }
          });
        }

        this.cargando = false;
      }
    });
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.empleosPagina = this.empleos.slice(inicio, fin);
  }

  cambiarPagina(nueva: number) {
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
      this.actualizarPagina();
    }
  }

  esPostulado(idJob: number): boolean {
    return this.postuladosIds.includes(idJob);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/oferta', id]);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/default-job.png';
  }
}
