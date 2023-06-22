import { TipoProceso } from "src/app/models/TipoProceso";

export type ProyectoVinculacion = {
  id?: string;
  nombreProyecto?: string;
  fechaCreacionproyecto?: Date;
  descripcionProyecto?: string;
  estadoProyecto?: string;
  tipoProceso?:TipoProceso;
  tipoFinanciamiento?:string;
  propiedadProyecto?:string;
  claseCirculoPintar?:string;
};
