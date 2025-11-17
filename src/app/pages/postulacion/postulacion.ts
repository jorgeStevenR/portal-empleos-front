import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-postulacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postulacion.html',
  styleUrls: ['./postulacion.css']
})
export class PostulacionComponent implements OnInit {

  idJob!: number;
  job: any;
  coverLetter: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private appService: ApplicationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.idJob = Number(this.route.snapshot.paramMap.get('idJob'));

    this.jobService.getById(this.idJob).subscribe({
      next: (data) => this.job = data
    });
  }

  enviarPostulacion(): void {
    const idUser = this.auth.getUserId();

    const postulacion = {
      coverLetter: this.coverLetter,
      user: { idUser },
      job: { idJob: this.idJob }
    };

    this.appService.create(postulacion).subscribe({
      next: () => {
        alert('✔ Postulación enviada con éxito');
        this.router.navigate(['/candidato']);
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un error al enviar la postulación');
      }
    });
  }
}
