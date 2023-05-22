import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/Cargo';
import { CargoDocente } from 'src/app/models/CargoDocente';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { CargoDocenteService } from 'src/app/servicios/cargo-docente.service';
import { CargoService } from 'src/app/servicios/cargo.service';
import { RegistroService } from 'src/app/servicios/registro.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-actualizar-docente',
  templateUrl: './actualizar-docente.component.html',
  styleUrls: ['./actualizar-docente.component.css']
})
export class ActualizarDocenteComponent implements OnInit {

  //variable del model
  docNombres: any;
  docApellidos: any;
  docCedula: any;
  docTelefono: any;
  docCorreo: any;
  docCargo: any;
  docIdEspe: any;
  docSexo: any;
  docPuestoTrabajo: any;

  cargosAsignados: Cargo[] = [];

  comboSexo: any;
  comboPuestoTrabajo:any;

  //variables de validacion
  validadorCedula: any;
  cedulaI: any;
  idEspeI: any;
  validadorIdEspe: any;
  selectedId: any;
  mensajeConfirmacion: any
  validadorCargo!: boolean;

  listaDocentes: any;
  listaCargos!: Cargo[];
  nombreUsuario: any
  tipoUsuario: any;
  docCorreo2: any;
  s: any;
  formularioActDoc!: FormGroup;
  constructor(private fb: FormBuilder,
    private _usuario: UsuarioService,
    private cargoDocenteService: CargoDocenteService,
    private _docente: RegistroService,
    private _validaciones: ValidacionesService,
    private _scargo: CargoService,
    private router: Router) {

    this.validadorCedula = true;
    this.mensajeConfirmacion = false;
  }

  ngOnInit(): void {

    this.tipoUsuario = localStorage.getItem('usuario')
    if (this.tipoUsuario === "admin") {
      this.nombreUsuario = localStorage.getItem('usuarioAct');
      this.validadorCargo = false;
    } else {
      this.nombreUsuario = localStorage.getItem('usuario');
      this.validadorCargo = true;
    }

    this.cargarCargos();
    this.cargarDocentes();
    this.iniciarFormulario();
  }

  iniciarFormulario() {

    this.comboSexo =  ["FEMENINO", "MASCULINO", "OTRO"];
    this.comboPuestoTrabajo = ["TECNICO LABORATORIO", "TIEMPO COMPLETO", "TIEMPO PARCIAL"];
    this.formularioActDoc = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      id: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      //cargo:[''],
      sexo: ['',],
      puesto: ['', Validators.required],
    })
  }

  cargarDocentes() {

    this._usuario.obtenerUsuarioPorNombre(this.nombreUsuario).subscribe(respuesta => {

      this.procesarDocentes(respuesta);

    })
  }
  procesarDocentes(resp: any) {
    this.listaDocentes = resp.docenteResponse.docente[0]
    //console.log(this.listaDocentes);
    this.docNombres = this.listaDocentes.nombreDocente;
    this.docApellidos = this.listaDocentes.apellidoDocente
    this.docCedula = this.listaDocentes.cedulaDocente;
    this.docTelefono = this.listaDocentes.telefonoDocente;
    this.docCorreo = this.listaDocentes.correoDocente;
    this.docCargo = this.listaDocentes.codCargo
    this.docIdEspe = this.listaDocentes.idDocente
    this.docSexo = this.listaDocentes.sexo;
    this.docPuestoTrabajo = this.listaDocentes.puestoTrabajoDocente;
    this._scargo.obtenerCargosDocente(this.listaDocentes.codigoDocente).subscribe(cargosAsignados => {
      this.cargosAsignados = cargosAsignados;
      this.listaCargos.forEach(cargo => {
        this.cargosAsignados.forEach(cargoModel => {
          if (cargo.codCargo == cargoModel.codCargo)
            cargo.checked = true;
        })
      });
      //console.log(this.cargosAsignados);
    })

    //this.selectedId=this.docCargo.codCargo;
  }

  validadorDeCedula(cedula: String) {

    this.validadorCedula = this._validaciones.validadorDeCedula(cedula);

  }

  cargarCargos() {
    this._scargo.obtenerCargos().subscribe(respuesta => {
      this.procesarCargos(respuesta);

    })
  }
  procesarCargos(resp: any) {
    this.listaCargos = resp.cargoResponse.cargo;
    this.listaCargos.forEach(cargo => {
      cargo.checked = false;
    });
  }

  actualizarDocente() {

    var cargoDocenteListData: CargoDocente[] = [];
    this.cargosAsignados.forEach(data => {
      let cDocente: CargoDocente = {
        codigoCargoDocente: undefined,
        fechaActCargoDocente: undefined,
        codigoDocente: undefined,
        codCargo: data
      };
      cargoDocenteListData.push(cDocente);
    })

    var usuariodata = {
      codigoDocente: this.listaDocentes.codigoDocente,
      idDocente: this.formularioActDoc.value.id,
      nombreDocente: this.formularioActDoc.value.nombres,
      apellidoDocente: this.formularioActDoc.value.apellidos,
      cedulaDocente: this.formularioActDoc.value.cedula,
      telefonoDocente: this.formularioActDoc.value.telefono,
      correoDocente: this.formularioActDoc.value.correo,
      sexo: this.formularioActDoc.value.sexo,
      puestoTrabajoDocente: this.formularioActDoc.value.puesto,
      cargoDocenteList: cargoDocenteListData
    }
    this._usuario.actualizarDocente(usuariodata, this.listaDocentes.codigoDocente).subscribe(respuesta => {
      alert("Usuario actualizado con éxito!")
      location.reload();

    }, (error: any) => {
      alert("Ha ocurrido un problema, contactese con su adminitrador!")
      console.log(error)
    })

    //console.log("data" + usuariodata.codCargo.codCargo)

  }


  cancelarActualizar() {
    this.router.navigate(['./docentes']);
    return localStorage.removeItem('usuarioAct');
  }

  cambiarCheckCargo(cargo: Cargo) {
    cargo.checked = !cargo.checked;
    if (!cargo.checked)
      this.cargosAsignados = this.cargosAsignados.filter((item) => item.codCargo !== cargo.codCargo);
    else
      this.cargosAsignados.push(cargo);
  }

  asignarCargoPorPuesto(puestoDocenteM: string) {
    let OpcionSeleccionada: string;
    let OpcionDeseleccionada: string;
    if (puestoDocenteM == "TECNICO LABORATORIO"){//"TÉCNICO DE LABPORATORIO","TIEMPO COMPLETO","TIEMPO PARCIAL"
      OpcionSeleccionada = "Técnico de Laboratorio";
      OpcionDeseleccionada ="Docente";
    }else if (puestoDocenteM == "TIEMPO COMPLETO" || puestoDocenteM == "TIEMPO PARCIAL"){//"TÉCNICO DE LABPORATORIO","TIEMPO COMPLETO","TIEMPO PARCIAL"
      OpcionSeleccionada = "Docente";
      OpcionDeseleccionada ="Técnico de Laboratorio";
    }
    this.listaCargos.forEach(cargo => {
      if (cargo.nombreCargo == OpcionSeleccionada) {
        if(cargo.codCargo){
          let miCheckbox = document.getElementById(cargo.codCargo?.toString()) as HTMLInputElement;
            miCheckbox.checked = true;
        }
        cargo.checked = true;
        this.cargosAsignados.push(cargo);
      }
      if (cargo.nombreCargo == OpcionDeseleccionada){
        if(cargo.codCargo){
          let miCheckbox = document.getElementById(cargo.codCargo?.toString()) as HTMLInputElement;
            miCheckbox.checked = false;
        }
        cargo.checked = false;
        this.cargosAsignados = this.cargosAsignados.filter((item) => item.codCargo !== cargo.codCargo);
      }
    });
  }
}
