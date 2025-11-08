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
  ofertas: any[] = [];
  nuevaOferta = {
    title: '',
    description: '',
    location: '',
  };
  cargando = true;

  constructor(private jobService: JobService, private auth: AuthService) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  /** 🟢 Cargar todas las ofertas de la empresa actual */
  cargarOfertas(): void {
    const idEmpresa = this.auth.getUserId();

    if (!idEmpresa) {
      console.warn('⚠️ No hay empresa logueada.');
      return;
    }

    this.jobService.getByCompany(idEmpresa).subscribe({
      next: (data) => {
        this.ofertas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar ofertas:', err);
        this.cargando = false;
      },
    });
  }

  /** 🟢 Publicar una nueva oferta */
  publicarOferta(): void {
    const idEmpresa = this.auth.getUserId();

    if (!idEmpresa) {
      alert('⚠️ No se detectó la empresa logueada.');
      return;
    }

    const nueva = {
      ...this.nuevaOferta,
      company: { idCompany: idEmpresa },
    };

    this.jobService.create(nueva).subscribe({
      next: () => {
        alert('✅ Oferta publicada correctamente.');
        this.nuevaOferta = { title: '', description: '', location: '' };
        this.cargarOfertas();
      },
      error: (err) => {
        console.error('❌ Error al publicar oferta:', err);
        alert('Ocurrió un error al publicar la oferta.');
      },
    });
  }

  /** 🔴 Eliminar oferta */
  eliminarOferta(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta oferta?')) return;

    this.jobService.delete(id).subscribe({
      next: () => {
        alert('🗑️ Oferta eliminada correctamente.');
        this.cargarOfertas();
      },
      error: (err) => {
        console.error('❌ Error al eliminar oferta:', err);
      },
    });
  }
}
