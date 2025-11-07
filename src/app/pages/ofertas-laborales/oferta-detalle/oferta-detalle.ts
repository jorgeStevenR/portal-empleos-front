// ============================================
// 📂 src/app/pages/ofertas-laborales/oferta-detalle/oferta-detalle.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-oferta-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oferta-detalle.html',
  styleUrls: ['./oferta-detalle.css']
})
export class OfertaDetalleComponent implements OnInit {
  job: any;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private appService: ApplicationService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getById(id).subscribe({
      next: (data) => (this.job = data),
      error: (err) => console.error('Error cargando oferta', err)
    });
  }

  postular(): void {
    const userId = this.auth.getUserId();
    const token = this.auth.getToken();

    console.log('🟢 ID usuario:', userId, '🟢 Token:', token); // <-- Verifica que existan

    if (!userId || !token) {
      alert('Debes iniciar sesión para postularte.');
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
      next: () => alert('✅ Postulación enviada correctamente'),
      error: (err) => {
        console.error('❌ Error al postular:', err);
        alert('Ocurrió un error al postular. Revisa la consola.');
      }
    });
  }
}
