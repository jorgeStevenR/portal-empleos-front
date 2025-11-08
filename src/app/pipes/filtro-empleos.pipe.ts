import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmpleos',
  standalone: true
})
export class FiltroEmpleosPipe implements PipeTransform {
  transform(empleos: any[], filtro: string): any[] {
    if (!empleos || !filtro) return empleos;

    const term = filtro.toLowerCase();
    return empleos.filter(
      (job) =>
        job.title?.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term) ||
        job.company?.name?.toLowerCase().includes(term)
    );
  }
}
