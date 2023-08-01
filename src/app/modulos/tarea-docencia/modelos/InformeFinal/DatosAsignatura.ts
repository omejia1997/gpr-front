import { DesviacionEstandar } from "./DesviacionEstandar";
import { EstudiantesAprobados } from "./EstudiantesAprobados";
import { EstudiantesMatriculados } from "./EstudiantesMatriculados";
import { EstudiantesReprobados } from "./EstudiantesReprobados";
import { EstudiantesRetirados } from "./EstudiantesRetirados";
import { PromedioRendimientoAcademico } from "./PromedioRendimientoAcademico";
import { TutoriaEstudiantesPromedioMenor14 } from "./TutoriaEstudiantesPromedioMenor14";
import { TutoriaEstudiantesPromedioMenor14Asistieron } from "./TutoriaEstudiantesPromedioMenor14Asistieron";

export type DatosAsignatura = {
  carrera?: string;
  asignatura?: string;
  componente?: string;
  nrc?: string;
  estudiantesMatriculados?: EstudiantesMatriculados;
  estudiantesRetirados?: EstudiantesRetirados;
  estudiantesReprobados?: EstudiantesReprobados;
  estudiantesAprobados?: EstudiantesAprobados;
  promedioRendimientoAcademico?:PromedioRendimientoAcademico;
  desviacionEstandar?: DesviacionEstandar;
  promedioFinalRendimientoAcademico?: number;
  promedioFinalDesviacionEstandar?: number;
  tutoriaEstudiantesPromedioMenor14?:TutoriaEstudiantesPromedioMenor14;
  tutoriaEstudiantesPromedioMenor14Asistieron?:TutoriaEstudiantesPromedioMenor14Asistieron;
  tutoriaEstudiantesPromedioMenor14AsistieronNoAprobaron?:number;
};
