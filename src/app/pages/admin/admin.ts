// ============================================
// 📂 src/app/pages/admin/admin.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  companies: any[] = [];
  jobs: any[] = [];

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userService.getAll().subscribe({
      next: (data: any[]) => (this.users = data),
      error: (err: any) => console.error('Error cargando usuarios', err)
    });

    this.companyService.getAll().subscribe({
      next: (data: any[]) => (this.companies = data),
      error: (err: any) => console.error('Error cargando empresas', err)
    });

    this.jobService.getAllJobs().subscribe({
      next: (data: any[]) => (this.jobs = data),
      error: (err: any) => console.error('Error cargando empleos', err)
    });
  }
}
