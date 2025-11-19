import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { JobService } from '../../services/job.service';

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
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.idJob = Number(this.route.snapshot.paramMap.get('id'));

    this.jobService.getById(this.idJob).subscribe(j => this.job = j);

    this.cargarPostulantes();
  }

  cargarPostulantes(): void {
    this.appService.getByJobId(this.idJob).subscribe({
      next: (res) => {
        this.postulantes = res;
      },
      error: (err) => console.error('❌ Error cargando postulantes:', err)
    });
  }

  cambiarEstado(idApp: number, estado: string): void {
    this.appService.updateStatus(idApp, estado).subscribe({
      next: () => {
        alert(`✔ Estado actualizado a: ${estado}`);
        this.cargarPostulantes();
      },
      error: (err) => {
        console.error(err);
        alert("❌ No se pudo actualizar el estado");
      }
    });
  }
}
