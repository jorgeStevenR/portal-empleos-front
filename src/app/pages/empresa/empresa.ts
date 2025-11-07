// ============================================
// 📂 src/app/pages/empresa/empresa.ts
// ============================================
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
  newJob = { title: '', description: '', location: '' };
  idCompany!: number;

  constructor(private jobService: JobService, private auth: AuthService) {}

  ngOnInit(): void {
    this.idCompany = this.auth.getUserId() ?? 0;
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: any[]) => {
        this.jobs = data.filter((j: any) => j.company?.idCompany === this.idCompany);
      },
      error: (err: any) => console.error('Error cargando empleos', err)
    });
  }

  createJob(): void {
    if (!this.newJob.title || !this.newJob.description) {
      alert('Completa todos los campos');
      return;
    }

    const job = {
      ...this.newJob,
      company: { idCompany: this.idCompany }
    };

    this.jobService.create(job).subscribe({
      next: () => {
        alert('✅ Oferta publicada correctamente');
        this.newJob = { title: '', description: '', location: '' };
        this.loadJobs();
      },
      error: (err: any) => console.error('❌ Error al crear oferta', err)
    });
  }
}
