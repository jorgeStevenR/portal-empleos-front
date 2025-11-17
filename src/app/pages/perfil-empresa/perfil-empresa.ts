// =====================================
// 📂 src/app/pages/perfil-empresa/perfil-empresa.ts
// =====================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-empresa.html',
  styleUrls: ['./perfil-empresa.css']
})
export class PerfilEmpresaComponent implements OnInit {

  empresaData: any = {};
  loading = true;

  selectedFile: File | null = null;

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.auth.getUserId();

    if (!id) {
      this.toast.show("❌ No se pudo obtener el ID de la empresa.", "error");
      this.loading = false;
      return;
    }

    this.companyService.getById(id).subscribe({
      next: (data) => {
        this.empresaData = data;
        this.loading = false;
      },
      error: () => {
        this.toast.show("❌ Error al cargar datos de la empresa.", "error");
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🔥 Fallback si el logo no carga
  onLogoError(event: any) {
    event.target.src = 'assets/img/icono.jpg';
  }

  subirLogo() {
    if (!this.selectedFile) {
      this.toast.show("Selecciona una imagen primero", "warning");
      return;
    }

    const id = this.auth.getUserId();
    if (!id) return;

    this.companyService.uploadLogo(id, this.selectedFile).subscribe({
      next: (resp) => {
        this.toast.show("Logo subido correctamente", "success");

        if (resp.logoUrl) {
          this.empresaData.logoUrl = resp.logoUrl;
        }
      },
      error: () => {
        this.toast.show("❌ Error al subir logo", "error");
      }
    });
  }
}
