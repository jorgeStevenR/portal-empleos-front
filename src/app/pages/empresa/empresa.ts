// ============================================
// 📂 src/app/pages/empresa/empresa.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css']
})
export class EmpresaComponent implements OnInit {

  jobs: any[] = [];
  postulaciones: any = {};
  newJob: any = {};

  mostrarModal: boolean = false;
  idAEliminar: number | null = null;

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
      salary: '',
      mode: 'ONSITE',
      company: { idCompany: this.auth.getUserId() }
    };

    this.loadJobs();
  }

  traducirModo(mode: string): string {
    switch (mode) {
      case 'ONSITE': return 'Presencial';
      case 'REMOTE': return 'Remoto';
      case 'HYBRID': return 'Híbrido';
      default: return mode;
    }
  }

  // ============================================
  // 🧮 Formatear salario para mostrar (lista)
  // ============================================
  formatSalary(value: any): string {
    if (value === null || value === undefined) return '0';
    const num = Number(
      typeof value === 'string'
        ? value.replace(/\D/g, '')
        : value
    );
    if (isNaN(num)) return value;
    return num.toLocaleString('es-CO');
  }

  // ============================================
  // 🔵 CARGAR OFERTAS DE LA EMPRESA
  // ============================================
  loadJobs(): void {
    const id = this.auth.getUserId();
    if (!id) return;

    this.jobService.getByCompany(id).subscribe({
      next: (data) => {
        // ✅ Si backend responde 204, null o undefined → evitar crash
        if (!data || !Array.isArray(data)) {
          this.jobs = [];
          return;
        }

        // Limpiar campos repetidos
        this.jobs = data.map(job => {
          job.description = job.description
            ?.replace(/Ubicación:.*/gi, '')
            ?.replace(/Modalidad:.*/gi, '')
            ?.trim();
          return job;
        });

        // Cargar postulaciones por oferta
        this.jobs.forEach(job => {
          this.appService.getByJobId(job.idJob).subscribe(res => {
            this.postulaciones[job.idJob] = res;
          });
        });
      }
    });
  }

  // ============================================
  // 🔢 Solo números en salario + formato con comas
  // ============================================
  onlyNumbers(event: any) {
    let value: string = event.target.value || '';

    // Quitar todo lo que no sea dígito
    value = value.replace(/\D/g, '');

    if (!value) {
      this.newJob.salary = '';
      event.target.value = '';
      return;
    }

    const num = parseInt(value, 10);
    const formatted = new Intl.NumberFormat('es-CO').format(num);

    // Guardamos el SALARIO formateado en el modelo (para el input)
    this.newJob.salary = formatted;
    event.target.value = formatted;
  }

  // Normalizar salario antes de enviarlo al backend (sin puntos/comas)
  private normalizeSalary(value: any): number | null {
    if (value === null || value === undefined) return null;
    const clean = value.toString().replace(/\D/g, '');
    if (!clean) return null;
    return Number(clean);
  }

  // ============================================
  // 🟢 Crear oferta
  // ============================================
  createJob(): void {
    if (!this.newJob.title || !this.newJob.description) return;

    const jobToSend = {
      ...this.newJob,
      salary: this.normalizeSalary(this.newJob.salary)
    };

    this.jobService.create(jobToSend).subscribe({
      next: () => {
        this.newJob = {
          title: '',
          description: '',
          location: '',
          salary: '',
          mode: 'ONSITE',
          company: { idCompany: this.auth.getUserId() }
        };

        this.loadJobs();
      }
    });
  }

  // ============================================
  // 🔴 ABRIR / CERRAR MODAL
  // ============================================
  openModal(id: number) {
    this.idAEliminar = id;
    this.mostrarModal = true;
    document.documentElement.classList.add('modal-open');
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.idAEliminar = null;
    document.documentElement.classList.remove('modal-open');
  }

  // ============================================
  // 🗑️ ELIMINAR OFERTA (INSTANTÁNEO + SEGURO)
  // ============================================
  confirmarEliminacion() {
    if (!this.idAEliminar) return;

    const id = this.idAEliminar;

    // 1️⃣ Cerrar modal inmediatamente
    this.cerrarModal();

    // 2️⃣ Eliminar visualmente sin esperar backend
    this.jobs = this.jobs.filter(job => job.idJob !== id);

    // 3️⃣ Llamar al backend igualmente
    this.jobService.delete(id).subscribe({
      next: () => {
        // opcional, recarga desde backend
        this.loadJobs();
      },
      error: (err) => {
        console.error("Error al eliminar en backend:", err);
      }
    });
  }
}
