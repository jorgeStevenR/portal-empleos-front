// ============================================
// 📂 src/app/pages/ofertas-laborales/oferta-detalle/oferta-detalle.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-oferta-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './oferta-detalle.html',
  styleUrls: ['./oferta-detalle.css']
})
export class OfertaDetalleComponent implements OnInit {
  job: any;
  yaPostulado = false;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private appService: ApplicationService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getById(id).subscribe({
      next: (data) => {
        this.job = data;
        this.verificarPostulacion();
      },
      error: (err) => console.error('❌ Error cargando oferta', err),
      complete: () => (this.cargando = false)
    });
  }

  /** 🔍 Verifica si el usuario ya está postulado a este empleo */
  verificarPostulacion(): void {
    const userId = this.auth.getUserId();
    if (!userId) return;

    this.appService.getByUserId(userId).subscribe({
      next: (data) => {
        this.yaPostulado = data.some((p: any) => p.job?.idJob === this.job.idJob);
      },
      error: (err) => console.error('Error verificando postulaciones', err)
    });
  }

  /** 📩 Envía la postulación */
  postular(): void {
    const userId = this.auth.getUserId();
    const token = this.auth.getToken();

    if (!userId || !token) {
      alert('⚠️ Debes iniciar sesión para postularte.');
      return;
    }

    if (this.yaPostulado) {
      alert('⚠️ Ya estás postulado a esta oferta.');
      return;
    }

    const nuevaPostulacion = {
      coverLetter: 'Estoy interesado en esta oferta.',
      urlImg: 'https://via.placeholder.com/150',
      status: 'ENVIADA',
      user: { idUser: userId },
      job: { idJob: this.job.idJob }
    };

    this.appService.create(nuevaPostulacion).subscribe({
      next: () => {
        alert('✅ Postulación enviada correctamente');
        this.yaPostulado = true;
      },
      error: (err) => {
        console.error('❌ Error al postular:', err);
        alert(err.error || 'Ocurrió un error al postular.');
      }
    });
  }
}
