import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postulacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postulacion.html',
  styleUrls: ['./postulacion.css']
})
export class PostulacionComponent {
  carta = '';
  urlImg = '';
  idJob!: number;

  constructor(
    private appService: ApplicationService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idJob = Number(this.route.snapshot.paramMap.get('idJob'));
  }

  enviarPostulacion(): void {
    const idUser = this.auth.getUserId();

    if (!idUser) {
      alert('Debes iniciar sesión para postularte.');
      return;
    }

    const data = {
      coverLetter: this.carta,
      urlImg: this.urlImg,
      status: 'ENVIADA',
      user: { idUser },
      job: { idJob: this.idJob }
    };

    this.appService.create(data).subscribe({
      next: () => {
        alert('✅ ¡Postulación enviada con éxito!');
        this.router.navigate(['/candidato']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al enviar la postulación.');
      }
    });
  }
}
