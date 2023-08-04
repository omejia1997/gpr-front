import { Docente } from "../Docente";
import { InformeFinal } from "../InformeFinal/InformeFinal";
import { TareaDocencia } from "../TareaDocencia";

export type TareaDocenteDocenciaDTO = {
  id?: string;
  tareaDocencia?:TareaDocencia;
  docenteAsignado?:Docente;
  estadoTareaDocente?: string;
  informeFinal?:InformeFinal;
  fechaEntrega?:Date;
  fechaModificacion?:Date;
  // rendimientoGeneralTodasMaterias?:number;
  // promedioDesviacionestandarGeneral?:number;
  //Variables para barChart
  nombreCompletoDocente?: string;
  seriesBar?:SeriesBar[];
};

interface SeriesBar {
  name?: string;
  value?: number;
}
