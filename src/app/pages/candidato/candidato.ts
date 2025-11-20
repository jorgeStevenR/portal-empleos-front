import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './candidato.html',
  styleUrls: ['./candidato.css']
})
export class CandidatoComponent implements OnInit {

  applications: any[] = [];
  userId: number | null = null;
  loading = false;

  constructor(
    private applicationService: ApplicationService,
    private jobService: JobService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.loadApplications();
  }

  loadApplications(): void {
    if (!this.userId) return;

    this.loading = true;

    this.applicationService.getByUserId(this.userId).subscribe({
      next: (apps) => {

        this.applications = apps;

        // Cargar información completa del job
        this.applications.forEach(app => {
          this.jobService.getById(app.job.idJob).subscribe(jobCompleto => {
            app.job = jobCompleto;
          });
        });

        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  /** TRADUCIR ESTADO (ENUM → español) */
  traducirEstado(state: string): string {
    const estados: any = {
      PENDING: "Pendiente",
      IN_PROGRESS: "En revisión",
      ACCEPTED: "Aceptado",
      REJECTED: "Rechazado",
      CANCELED: "Cancelado"
    };
    return estados[state] || state;
  }

  /** TRADUCIR MODO */
  traducirModo(mode: string): string {
    const modos: any = {
      ONSITE: "Presencial",
      REMOTE: "Remoto",
      HYBRID: "Híbrido"
    };
    return modos[mode] || mode;
  }
}
