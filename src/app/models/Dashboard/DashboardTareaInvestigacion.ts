import { Tarea } from "../Tarea";
import { TareaIndicador } from "../TareaIndicador";
import { Series } from "./Series";

export type DashboardTareaInvestigacion = {
    name?: string;
    value?: number;
    valueTotal?: number;
    tarea?: Tarea;
    series?:Series;
    tareaIndicadorList?:TareaIndicador;
};
