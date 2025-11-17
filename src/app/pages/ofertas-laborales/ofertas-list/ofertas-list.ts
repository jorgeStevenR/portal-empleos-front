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
  postuladosIds: number[] = [];

  filtro: string = '';
  cargando = true;

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 1️⃣ Obtener ofertas
    this.jobService.getAllJobs().subscribe({
      next: (data: any[]) => {
        this.empleos = data;

        // 2️⃣ Obtener postulaciones del usuario
        const userId = this.authService.getUserId();

        if (userId) {
          this.applicationService.getByUserId(userId).subscribe({
            next: (apps: any[]) => {
              this.postuladosIds = apps.map(a => a.job.idJob);
              console.log('Postulados del usuario:', this.postuladosIds);
            },
            error: err => console.error('Error al traer postulaciones', err)
          });
        }

        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar empleos', err);
        this.cargando = false;
      }
    });
  }

  // 🔥 Saber si el usuario YA se postuló a este job
  esPostulado(idJob: number): boolean {
    return this.postuladosIds.includes(idJob);
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
