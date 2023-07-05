import { TipoProceso } from "src/app/models/TipoProceso";
import { TareaDocenteProyectoVinculacion } from "./TareaDocenteProyectoVinculacion";

export type ProyectoVinculacion = {
  id?: string;
  nombreProyecto?: string;
  nombreDirectorProyecto?: string;
  fechaCreacionproyecto?: Date;
  descripcionProyecto?: string;
  estadoProyecto?: string;
  tipoProceso?:TipoProceso;
  tipoFinanciamiento?:string;
  propiedadProyecto?:string;
  //variables para monitoreo
  listTareas?:TareaDocenteProyectoVinculacion[];
  claseCirculoPintar?:string;
};
