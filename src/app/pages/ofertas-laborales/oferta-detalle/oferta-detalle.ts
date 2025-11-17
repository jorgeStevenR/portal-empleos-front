// ============================================
// 📂 src/app/pages/ofertas-laborales/oferta-detalle/oferta-detalle.ts
// ============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    private router: Router,
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

  // ================================================
  // 🔍 Verificar si el usuario ya se postuló
  // ================================================
  verificarPostulacion(): void {
    const userId = this.auth.getUserId();
    if (!userId) return;

    this.appService.getByUserId(userId).subscribe({
      next: (data) => {
        this.yaPostulado = data.some(
          (p: any) => p.job?.idJob === this.job.idJob
        );
      },
      error: (err) => console.error('❌ Error verificando postulaciones', err)
    });
  }

  // ================================================
  // 🚀 Ir al formulario de postulación
  // ================================================
  irAFormularioPostulacion(): void {
    this.router.navigate(['/postulacion', this.job.idJob]);
  }
}
