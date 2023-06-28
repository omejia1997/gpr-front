import { TareaIndicador } from "src/app/models/TareaIndicador";
import { Series } from "./Series";
import { TareaVinculacion } from "../TareaVinculacion";

export type DashboardTareaVinculacion = {
    name?: string;
    value?: number;
    valueTotal?: number;
    tarea?: TareaVinculacion;
    series?:Series;
    tareaIndicadorList?:TareaIndicador[];
};
