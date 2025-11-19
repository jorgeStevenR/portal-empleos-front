import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { JobService } from '../../services/job.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-postulantes-empleo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './postulantes-empleo.html',
  styleUrls: ['./postulantes-empleo.css']
})
export class PostulantesEmpleoComponent implements OnInit {

  idJob!: number;
  postulantes: any[] = [];
  job: any;

  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationService,
    private jobService: JobService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.idJob = Number(this.route.snapshot.paramMap.get('id'));

    this.jobService.getById(this.idJob).subscribe(j => this.job = j);

    this.appService.getByJobId(this.idJob).subscribe(p =>
      this.postulantes = p
    );
  }

  cambiarEstado(idApp: number, nuevoEstado: string) {
    this.appService.updateStatus(idApp, nuevoEstado).subscribe({
      next: () => {
        this.toast.show("Estado actualizado", "success");

        // Refrescar lista
        this.appService.getByJobId(this.idJob).subscribe(p =>
          this.postulantes = p
        );
      },
      error: (err) => {
        this.toast.show("Error al cambiar estado", "error");
        console.error(err);
      }
    });
  }

}
