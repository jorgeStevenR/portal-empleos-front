// ============================================
// 📂 src/app/pages/postulacion-detalle/postulacion-detalle.ts
// ============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { JobService } from '../../services/job.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-postulacion-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './postulacion-detalle.html',
  styleUrls: ['./postulacion-detalle.css']
})
export class PostulacionDetalleComponent implements OnInit {

  idApplication!: number;
  application: any = null;
  candidato: any = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationService,
    private jobService: JobService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.idApplication = Number(this.route.snapshot.paramMap.get('idApp'));

    this.appService.getById(this.idApplication).subscribe({
      next: (data) => {
        this.application = data;

        // 🔥 Traer job completo con empresa incluida
        this.jobService.getById(data.job.idJob).subscribe(jobFull => {
          this.application.job = jobFull;
        });

        // 🔥 Traer al usuario completo (incluye CV)
        this.userService.getById(data.user.idUser).subscribe(userFull => {
          this.candidato = userFull;
          this.cargando = false;
        });
      },
      error: () => this.cargando = false
    });
  }
}
