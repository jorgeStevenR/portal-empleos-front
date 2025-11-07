// ============================================
// 📂 src/app/pages/candidato/candidato.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-candidato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidato.html',
  styleUrl: './candidato.css'
})
export class CandidatoComponent implements OnInit {
  postulaciones: any[] = [];
  idUser!: number;
  userData: any = null;
  loading = true;

  constructor(
    private appService: ApplicationService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.idUser = this.auth.getUserId() ?? 0;
    if (this.idUser) {
      this.loadPerfil();
      this.loadPostulaciones();
    } else {
      this.loading = false;
    }
  }

  // 🔹 Cargar perfil del usuario
  loadPerfil(): void {
    this.userService.getById(this.idUser).subscribe({
      next: (data) => {
        this.userData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando perfil', err);
        this.loading = false;
      }
    });
  }

  // 🔹 Cargar postulaciones del usuario
  loadPostulaciones(): void {
    this.appService.getAll().subscribe({
      next: (data: any[]) => {
        this.postulaciones = data.filter((p) => p.user?.idUser === this.idUser);
      },
      error: (err) => console.error('Error cargando postulaciones', err)
    });
  }
}
