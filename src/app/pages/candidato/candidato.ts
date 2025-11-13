import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-candidato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidato.html',
  styleUrls: ['./candidato.css']
})
export class CandidatoComponent implements OnInit {
  jobs: any[] = [];
  applications: any[] = [];
  userId: number | null = null;
  loading = false;

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.loadJobs();
    this.loadApplications();
  }

  // 🔹 Obtener todas las vacantes
  loadJobs(): void {
    this.loading = true;
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar vacantes:', err);
        this.loading = false;
      }
    });
  }

  // 🔹 Obtener postulaciones del usuario
  loadApplications(): void {
    if (!this.userId) return;
    this.applicationService.getByUserId(this.userId).subscribe({
      next: (data) => (this.applications = data || []),
      error: (err) => console.error('❌ Error al cargar postulaciones:', err)
    });
  }

  // 🔹 Saber si ya está postulado a una vacante
  isApplied(jobId: number): boolean {
    return this.applications.some((a) => a.job.idJob === jobId);
  }

  // 🔹 Postularse a una vacante
  apply(jobId: number): void {
    if (!this.userId) return;
    const app = {
      user: { idUser: this.userId },
      job: { idJob: jobId },
      coverLetter: 'Estoy interesado en esta oportunidad.',
      status: 'PENDING'
    };

    this.applicationService.create(app).subscribe({
      next: () => {
        alert('✅ Te has postulado correctamente.');
        this.loadApplications();
      },
      error: (err) => {
        console.error('❌ Error al postularse:', err);
        alert('⚠️ Ya estás postulado o ocurrió un error.');
      }
    });
  }
}
