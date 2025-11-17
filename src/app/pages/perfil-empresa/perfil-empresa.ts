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

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {

    const id = this.auth.getCompanyId(); // ✔ YA FUNCIONA

    if (!id) {
      this.toast.show("❌ No se encontró el ID de la empresa.", "error");
      this.loading = false;
      return;
    }

    this.companyService.getById(id).subscribe({
      next: (data) => {
        this.empresaData = data;
        this.loading = false;
      },
      error: () => {
        this.toast.show("❌ Error cargando el perfil de empresa.", "error");
        this.loading = false;
      }
    });
  }
}
