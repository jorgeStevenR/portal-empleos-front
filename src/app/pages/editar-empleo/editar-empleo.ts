import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-editar-empleo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-empleo.html',
  styleUrls: ['./editar-empleo.css']
})
export class EditarEmpleoComponent implements OnInit {

  job: any = {};
  postulantes: any[] = [];
  idJob!: number;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private appService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.idJob = Number(this.route.snapshot.paramMap.get('id'));

    this.jobService.getById(this.idJob).subscribe(job => {
      this.job = job;
      this.cargarPostulantes();
    });
  }

  cargarPostulantes(): void {
    this.appService.getByJobId(this.idJob).subscribe({
      next: (res) => {
        this.postulantes = res;
        this.cargando = false;
      },
      error: (err) => console.error(err)
    });
  }

  guardarCambios() {
    this.jobService.update(this.idJob, this.job).subscribe({
      next: () => {
        alert("✔ Oferta actualizada correctamente");
        this.router.navigate(['/empresa']);
      }
    });
  }
}
