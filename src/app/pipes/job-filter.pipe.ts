import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobFilter',
  standalone: true
})
export class JobFilterPipe implements PipeTransform {
  transform(empleos: any[], filtro: string): any[] {
    if (!empleos) return [];
    if (!filtro.trim()) return empleos;

    const lower = filtro.toLowerCase();
    return empleos.filter(e =>
      e.titulo?.toLowerCase().includes(lower) ||
      e.descripcion?.toLowerCase().includes(lower) ||
      e.empresa?.nombre?.toLowerCase().includes(lower)
    );
  }
}
