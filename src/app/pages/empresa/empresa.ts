// ============================================
// 📂 src/app/pages/empresa/empresa.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';            // 👈 IMPORTANTE
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],      // 👈 AÑADIMOS RouterModule
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css']
})
export class EmpresaComponent implements OnInit {

  jobs: any[] = [];
  postulaciones: any = {};
  newJob: any = {};

  constructor(
    private jobService: JobService,
    private auth: AuthService,
    private appService: ApplicationService
  ) {}

  ngOnInit(): void {
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
      next: (data) => {
        this.jobs = data;

        this.jobs.forEach(job => {
          this.appService.getByJobId(job.idJob).subscribe(res => {
            this.postulaciones[job.idJob] = res;
          });
        });
      },
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
      }
    });
  }

  deleteJob(id: number): void {
    this.jobService.delete(id).subscribe({
      next: () => this.loadJobs()
    });
  }
}
