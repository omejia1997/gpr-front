import { Cargo } from "./Cargo";
import { CargoDocente } from "./CargoDocente";
import { TareaDocente } from "./TareaDocente";

export type Docente = {
  codigoDocente?: number;
  idDocente?: string;
  nombreDocente?: string;
  apellidoDocente?: string;
  cedulaDocente?: string;
  telefonoDocente?: string;
  correoDocente?: string;
  //codCargo?:Cargo;
  numLogueo?: number;
  tareaDocenteList?: TareaDocente[];
  cantidadTarea?: number;
  cargaHoraria?: number;
  claseEstiloProgress?: string;
  cargoDocenteList?:CargoDocente[];
  checked?:boolean;
};
