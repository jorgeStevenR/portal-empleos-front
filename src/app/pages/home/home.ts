// ============================================
// 📂 src/app/pages/home/home.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { JobFilterPipe } from '../../pipes/job-filter.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, JobFilterPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  empleos: any[] = [];
  cargando = true;
  filtro: string = '';

  constructor(public auth: AuthService, private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: any) => {
        this.empleos = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar empleos', err);
        this.cargando = false;
      }
    });
  }

  postular(idJob: number): void {
    const token = this.auth.getToken() || '';
    const userId = this.auth.getUserId();

    if (!token || !userId) {
      alert('Debes iniciar sesión para postularte.');
      return;
    }

    this.jobService.postular(idJob, userId, token).subscribe({
      next: () => alert('✅ Postulación enviada correctamente'),
      error: (err: any) => alert('⚠️ No se pudo postular: ' + err.error?.message)
    });
  }
}
