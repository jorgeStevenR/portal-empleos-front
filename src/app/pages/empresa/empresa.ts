import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css']
})
export class EmpresaComponent implements OnInit {
  jobs: any[] = [];
  newJob: any = {};

  constructor(private jobService: JobService, private auth: AuthService) {}

  ngOnInit(): void {
    // ✅ Aquí ya puedes usar this.auth
    this.newJob = {
      title: '',
      description: '',
      location: '',
      mode: 'ONSITE',
      company: { idCompany: this.auth.getUserId() }
    };

    this.loadJobs();
  }

  loadJobs(): void {
    const id = this.auth.getUserId();
    if (!id) return;
    this.jobService.getByCompany(id).subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => console.error('❌ Error al cargar ofertas:', err)
    });
  }

  createJob(): void {
    if (!this.newJob.title || !this.newJob.description) return;
    this.jobService.create(this.newJob).subscribe({
      next: () => {
        this.newJob = {
          title: '',
          description: '',
          location: '',
          mode: 'ONSITE',
          company: { idCompany: this.auth.getUserId() }
        };
        this.loadJobs();
      },
      error: (err) => console.error('❌ Error al crear oferta:', err)
    });
  }

  deleteJob(id: number): void {
    this.jobService.delete(id).subscribe({
      next: () => this.loadJobs(),
      error: (err) => console.error('❌ Error al eliminar oferta:', err)
    });
  }
}
