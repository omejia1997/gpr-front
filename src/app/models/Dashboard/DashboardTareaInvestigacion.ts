import { Tarea } from "../Tarea";
import { TareaDocenteDto } from "../dto/TareaDocenteDto";
import { Series } from "./Series";

export type DashboardTareaInvestigacion = {
    name?: string;
    value?: number;
    valueTotal?: number;
    tarea?: Tarea;
    series?:Series;
    tareaDocentes?:TareaDocenteDto[];
};
