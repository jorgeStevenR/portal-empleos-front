// ============================================
// 📂 src/app/pages/perfil/perfil.ts
// ============================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  userData: any = null;
  loading = true;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();

    if (!userId) {
      console.warn('⚠️ No hay userId en localStorage');
      this.loading = false;
      return;
    }

    // ✅ Petición al backend
    this.userService.getById(userId).subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos del backend:', data);
        this.userData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error obteniendo usuario:', err);
        this.loading = false;
      }
    });
  }
}
