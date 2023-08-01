import { AccionesMejoraDocente } from "./AccionesMejoraDocente";
import { DatosAsignatura } from "./DatosAsignatura";
import { DatosGenerales } from "./DatosGenerales";
import { EvaluacionDocente } from "./EvaluacionDocente";
import { TematicaCapacitacion } from "./TematicaCapacitacion";

export type InformeFinal = {
  datosGenerales?: DatosGenerales;
  antecedentes?: string[];
  objetivo?: string;
  datosAsignatura?: DatosAsignatura[];
  evaluacionDocente?:EvaluacionDocente;
  fortalezas?: string[];
  debilidades?: string[];
  apreciacionGlobalFortalezas?: string[];
  apreciacionGlobalDebilidades?: string[];
  accionesMejoraDocente?: AccionesMejoraDocente;
  tematicaCapacitaciones?:TematicaCapacitacion[];
  conclusiones?: string[];
  recomendaciones?: string[];
};
