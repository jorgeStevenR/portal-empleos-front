import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  userData: any = {};
  loading = false;
  isCompany = false;
  selectedFile: File | null = null;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private companyService: CompanyService,
    private http: HttpClient,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const role = this.auth.getRole();
    const id = this.auth.getUserId();

    if (!role || !id) return;

    this.isCompany = role === 'COMPANY';
    this.loading = true;

    const loadObs = this.isCompany
      ? this.companyService.getById(id)
      : this.userService.getById(id);

    loadObs.subscribe({
      next: (data) => {
        this.userData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar perfil:', err);
        this.toast.show('Ocurrió un error al cargar tu perfil.', 'error');
        this.loading = false;
      }
    });
  }

  // 🔹 Guardar cambios generales del perfil
  saveChanges(): void {
    const id = this.auth.getUserId();
    if (!id) return;

    this.loading = true;
    const updateObs = this.isCompany
      ? this.companyService.update(id, this.userData)
      : this.userService.update(id, this.userData);

    updateObs.subscribe({
      next: () => {
        this.toast.show('✅ Perfil actualizado correctamente.', 'success');
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al actualizar perfil:', err);
        this.toast.show('Ocurrió un error al guardar los cambios.', 'error');
        this.loading = false;
      }
    });
  }

  // 🔹 Cuando se selecciona un archivo (CV o logo)
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // 🔹 Subir archivo (con validación y actualización automática en BD)
  uploadFile(): void {
    if (!this.selectedFile) {
      this.toast.show('Por favor selecciona un archivo primero.', 'warning');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (this.selectedFile.size > maxSize) {
      this.toast.show('⚠️ El archivo excede el tamaño máximo permitido (5 MB).', 'warning');
      this.selectedFile = null;
      return;
    }

    const id = this.auth.getUserId();
    if (!id) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const url = this.isCompany
      ? `${environment.apiBaseUrl}/files/upload/logo/${id}`
      : `${environment.apiBaseUrl}/files/upload/cv/${id}`;

    this.loading = true;

    this.http.post<any>(url, formData).subscribe({
      next: (resp) => {
        const fileUrl = resp.cvUrl || resp.logoUrl || resp.url;
        if (this.isCompany) {
          this.userData.logoUrl = fileUrl;
        } else {
          this.userData.cvUrl = fileUrl;
        }

        this.toast.show(resp.message || '✅ Archivo subido correctamente.', 'success');
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al subir archivo:', err);
        let message = 'Ocurrió un error al subir el archivo.';
        if (err.status === 413) message = '⚠️ El archivo es demasiado grande.';
        else if (err.status === 400) message = err.error?.error || message;
        this.toast.show(message, 'error');
        this.loading = false;
      }
    });
  }
}
