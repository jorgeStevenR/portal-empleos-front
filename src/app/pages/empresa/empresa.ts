// ============================================
// 📂 src/app/pages/empresa/empresa.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css']
})
export class EmpresaComponent implements OnInit {
  empresaId!: number;
  vacantes: any[] = [];
  nuevaVacante = {
    title: '',
    description: '',
    location: '',
    type: 'Remoto'
  };
  mostrandoFormulario = false;

  constructor(private jobService: JobService, private auth: AuthService) {}

  ngOnInit(): void {
    this.empresaId = this.auth.getUserId()!;
    this.cargarVacantes();
  }

  /** 🔹 Cargar vacantes de la empresa */
  cargarVacantes(): void {
    this.jobService.getByCompany(this.empresaId).subscribe({
      next: (data) => {
        this.vacantes = data || [];
        console.log('✅ Vacantes cargadas:', this.vacantes);
      },
      error: (err) => {
        console.error('❌ Error cargando vacantes:', err);
      }
    });
  }

  /** 🔹 Crear nueva vacante */
  crearVacante(): void {
    if (!this.nuevaVacante.title || !this.nuevaVacante.description) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    const vacante = {
      ...this.nuevaVacante,
      company: { idCompany: this.empresaId }
    };

    this.jobService.create(vacante).subscribe({
      next: (res) => {
        console.log('Vacante creada:', res);
        alert('✅ Vacante creada con éxito.');
        this.mostrandoFormulario = false;
        this.cargarVacantes();
        this.nuevaVacante = { title: '', description: '', location: '', type: 'Remoto' };
      },
      error: (err) => {
        console.error('Error al crear vacante:', err);
      }
    });
  }

  /** 🔹 Eliminar vacante */
  eliminarVacante(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta vacante?')) {
      this.jobService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Vacante eliminada.');
          this.cargarVacantes();
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }
}
