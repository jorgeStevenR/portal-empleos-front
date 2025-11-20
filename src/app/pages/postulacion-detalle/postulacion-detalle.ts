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

        // Traer job completo
        this.jobService.getById(data.job.idJob).subscribe(jobFull => {
          this.application.job = jobFull;
        });

        // Traer usuario completo
        this.userService.getById(data.user.idUser).subscribe(userFull => {
          this.candidato = userFull;
          this.cargando = false;
        });
      },
      error: () => this.cargando = false
    });
  }

  // ============================
  // ⭐ TRADUCIR ESTADOS ENUM
  // ============================
  traducirEstado(estado: string): string {
    const map: any = {
      PENDING: "Pendiente",
      IN_PROGRESS: "En revisión",
      ACCEPTED: "Aceptado",
      REJECTED: "Rechazado",
      CANCELED: "Cancelado"
    };
    return map[estado] || estado;
  }

  traducirModo(mode: string): string {
    const map: any = {
      ONSITE: "Presencial",
      REMOTE: "Remoto",
      HYBRID: "Híbrido"
    };
    return map[mode] || mode;
  }

  // ============================
  // ⭐ Añadir clases de color
  // ============================
  estadoClase(estado: string): string {
    switch (estado) {
      case 'PENDING': return 'pending';
      case 'ACCEPTED': return 'accepted';
      case 'REJECTED': return 'rejected';
      case 'IN_PROGRESS': return 'pending'; // mismo estilo
      default: return '';
    }
  }
}
