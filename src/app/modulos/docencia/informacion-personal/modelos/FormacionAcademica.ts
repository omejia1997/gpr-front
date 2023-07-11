import { FormacionAcademicaAdicional } from "./FormacionAcademicaAdicional";

export type FormacionAcademica = {
  nivelInstruccion?: string;
  institucion?: string;
  tituloObtenido?: string;
  tiempoEstudio?: number;
  periodoEstudio?: string;
  numeroRegistroSenescyt?: string;
  fechaRegistroSenescyt?: Date;
  pais?: string;
  fechaGraduacion?: Date;
  formacionAcademicaAdicionales?: FormacionAcademicaAdicional[];
};
