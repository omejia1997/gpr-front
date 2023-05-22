import { Cargo } from "./Cargo";
import { Docente } from "./Docente";

export type CargoDocente = {
    codigoCargoDocente?: number;
    fechaActCargoDocente?: Date;
    codigoDocente?: Docente;
    codCargo?: Cargo;
  };
  