import { FormacionAcademicaAdicional } from "./FormacionAcademicaAdicional";
import { Idioma } from "./Idioma";
import { Publicacion } from "./Publicacion";

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
  idiomas?: Idioma[];
  publicaciones?: Publicacion[];
};
