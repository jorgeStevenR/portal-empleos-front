import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  empleos: any[] = [];
  cargando = true;

  constructor(
    public auth: AuthService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    // 🔹 Llamar a la API para traer todos los empleos
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.empleos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar empleos', err);
        this.cargando = false;
      }
    });
  }

  postular(id: number) {
    const token = localStorage.getItem('token') || '';
    this.jobService.postular(id, token).subscribe({
      next: () => alert('✅ Postulación enviada correctamente'),
      error: (err) =>
        alert('⚠️ No se pudo postular: ' + (err.error?.message || 'Error desconocido'))
    });
  }
}
