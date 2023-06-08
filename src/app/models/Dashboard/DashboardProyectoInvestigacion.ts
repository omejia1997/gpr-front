import { Proyecto } from "../Proyecto";
import { DashboardTareaInvestigacion } from "./DashboardTareaInvestigacion";

export type DashboardProyectoInvestigacion = {
    name?: string;
    value?: number;
    valueTotal?: number;
    proyecto?: Proyecto;
    dasboardTareaInvestigacionList?:DashboardTareaInvestigacion[];
};
