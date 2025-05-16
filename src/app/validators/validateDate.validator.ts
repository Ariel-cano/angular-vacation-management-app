import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function startBeforeEndValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (!start || !end) return null; // не валидируем, если дата не выбрана

    const startDate = new Date(start);
    const endDate = new Date(end);

    return startDate < endDate ? null : { startAfterEnd: true };
  };
}
