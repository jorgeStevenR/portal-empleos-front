import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {

  userData: any = {};
  loading = false;
  selectedFile: File | null = null;

  mostrarUploader = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private http: HttpClient,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.auth.getUserId();

    if (!id) {
      this.toast.show("No se pudo identificar al usuario.", "warning");
      return;
    }

    this.loading = true;

    this.userService.getById(id).subscribe({
      next: (data) => {
        this.userData = data;
        this.loading = false;
      },
      error: () => {
        this.toast.show("Error al cargar perfil.", "error");
        this.loading = false;
      }
    });
  }

  // 🔄 Mostrar/ocultar el uploader
  toggleUploader() {
    this.mostrarUploader = !this.mostrarUploader;
  }

  // 📄 Abrir CV en nueva pestaña
  verCV(): void {
    if (this.userData?.cvUrl) {
      window.open(this.userData.cvUrl, '_blank');
    } else {
      this.toast.show("No hay un CV cargado.", "warning");
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.toast.show("Selecciona un archivo primero.", "warning");
      return;
    }

    const id = this.auth.getUserId();
    if (!id) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const url = `${environment.apiBaseUrl}/files/upload/cv/${id}`;

    this.http.post<any>(url, formData).subscribe({
      next: (resp) => {
        if (resp.cvUrl) this.userData.cvUrl = resp.cvUrl;
        this.toast.show("CV subido correctamente", "success");
        this.mostrarUploader = false;  
      },
      error: () => {
        this.toast.show("Error al subir CV", "error");
      }
    });
  }
}
