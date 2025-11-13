import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  companies: any[] = [];
  jobs: any[] = [];
  activeTab: 'users' | 'companies' | 'jobs' = 'users';
  loading = false;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loadUsers();
    this.loadCompanies();
    this.loadJobs();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando usuarios:', err);
        this.loading = false;
      }
    });
  }

  loadCompanies(): void {
    this.companyService.getAll().subscribe({
      next: (data) => (this.companies = data),
      error: (err) => console.error('❌ Error cargando empresas:', err)
    });
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => console.error('❌ Error cargando empleos:', err)
    });
  }

  deleteUser(id: number): void {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.userService.delete(id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.idUser !== id);
        alert('Usuario eliminado.');
      },
      error: (err) => alert('Error eliminando usuario: ' + err.message)
    });
  }

  deleteCompany(id: number): void {
    if (!confirm('¿Eliminar esta empresa?')) return;
    this.companyService.delete(id).subscribe({
      next: () => {
        this.companies = this.companies.filter((c) => c.idCompany !== id);
        alert('Empresa eliminada.');
      },
      error: (err) => alert('Error eliminando empresa: ' + err.message)
    });
  }

  deleteJob(id: number): void {
    if (!confirm('¿Eliminar esta vacante?')) return;
    this.jobService.delete(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter((j) => j.idJob !== id);
        alert('Oferta eliminada.');
      },
      error: (err) => alert('Error eliminando oferta: ' + err.message)
    });
  }
}
