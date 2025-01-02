import moment from 'moment';

interface ActionDates {
  preview_init_date?: string;
  preview_end_date?: string;
  init_date?: string;
  end_date?: string;
}

export enum ActionStatus {
  TO_START = 1,        // A iniciar
  IN_PROGRESS = 2,     // Em execução
  COMPLETED = 3,       // Executadas
  DELAYED_START = 4,   // Atrasadas a iniciar
  DELAYED_END = 5,     // Atrasadas a terminar
  ON_TIME = 6,         // No prazo
  LATE = 7            // Fora do prazo
}

export function getActionStatus(action: ActionDates): number {
  const today = moment();
  const previewInitDate = action.preview_init_date ? moment(action.preview_init_date, "DD/MM/YYYY") : null;
  const previewEndDate = action.preview_end_date ? moment(action.preview_end_date, "DD/MM/YYYY") : null;
  const initDate = action.init_date ? moment(action.init_date, "DD/MM/YYYY") : null;
  const endDate = action.end_date ? moment(action.end_date, "DD/MM/YYYY") : null;

  // Ação Finalizada (tem data de início e fim)
  if (initDate && endDate) {
    // Verifica se foi entregue no prazo
    if (previewEndDate) {
      return endDate.isSameOrBefore(previewEndDate) ? 
        ActionStatus.ON_TIME : 
        ActionStatus.LATE;
    }
    return ActionStatus.COMPLETED;
  }

  // Em execução (tem data de início mas não tem fim)
  if (initDate && !endDate) {
    // Verifica se está atrasada para terminar
    if (previewEndDate && today.isAfter(previewEndDate)) {
      return ActionStatus.DELAYED_END;
    }
    return ActionStatus.IN_PROGRESS;
  }

  // Não iniciada (não tem data de início)
  if (!initDate) {
    // Verifica se está atrasada para iniciar
    if (previewInitDate && today.isAfter(previewInitDate)) {
      return ActionStatus.DELAYED_START;
    }
    return ActionStatus.TO_START;
  }

  return ActionStatus.TO_START; // Status padrão
}