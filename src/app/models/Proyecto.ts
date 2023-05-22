import { TipoProceso } from "./TipoProceso";

export type Proyecto = {
  codigoProyecto?: number;
  nombreProyecto?: string;
  fechaCreacionproyecto?: Date;
  descripcionProyecto?: string;
  estadoProyecto?: string;
  tipoProceso?:TipoProceso;
};
