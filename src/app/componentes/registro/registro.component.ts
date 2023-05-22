import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/servicios/cargo.service';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  template: './confirmacion.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario!: FormGroup;
  listaCargos!: Cargo[];
  mensaje!: any;
  tituloMensajeVal: any;
  validadorCedula: any;
  cedulaI: any;
  idEspeI: any;
  validadorIdEspe: any;
  cargosAsignados: any[] = [];

  listaCatalogoDocente: any;

  idBannerM: any;
  nombreDocenteM: any;
  apellidosDocenteM: any;
  telefonoDocenteM: any;
  correoDocenteM: any;
  sexoDocenteM: any;
  puestoDocenteM: any;

  comboSexo: any;
  comboPuestoTrabajo: any;

  constructor(private fb: FormBuilder, private _docente: RegistroService, private _scargo: CargoService, private router: Router) {
    this.iniciarFormulario();
    this.cargarCargos();
    this.validadorCedula = true;
    this.validadorIdEspe = true;
    this.mensaje = "";
  }



  ngOnInit(): void {
  }
  iniciarFormulario() {

    this.comboSexo = ["FEMENINO", "MASCULINO", "OTRO"];
    this.comboPuestoTrabajo = ["TECNICO LABORATORIO", "TIEMPO COMPLETO", "TIEMPO PARCIAL"];
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      //cargo:['',Validators.required],
      sexo: ['',],
      puesto: ['',]
      //puesto:['',Validators.required],
    })

  }

  cargarCargos() {
    this._scargo.obtenerCargos().subscribe(respuesta => {
      console.log(respuesta)

      this.procesarCargos(respuesta);

    })
  }
  procesarCargos(resp: any) {
    this.listaCargos = resp.cargoResponse.cargo;
    this.listaCargos.forEach(cargo => {
      cargo.checked = false;
    });
    //console.log("Data booeam");
    //console.log(this.listaCargos);
  }

  guardar() {
    if (this.cargosAsignados.length == 0) {
      this.tituloMensajeVal = "Error"
      this.mensaje = "Debe seleccionar algún cargo ";
    } else {

      let data = {
        idDocente: this.formulario.value.id,
        nombreDocente: this.formulario.value.nombres,
        apellidoDocente: this.formulario.value.apellidos,
        cedulaDocente: this.formulario.value.cedula,
        telefonoDocente: this.formulario.value.telefono,
        correoDocente: this.formulario.value.correo,
        cargosAsignados: this.cargosAsignados,
        sexo: this.sexoDocenteM,
        puesto: this.formulario.value.puesto
      }

      //console.log(data)

      const uploaddata = new FormData();
      uploaddata.append('idDocente', data.idDocente);
      uploaddata.append('nombreDocente', data.nombreDocente);
      uploaddata.append('apellidoDocente', data.apellidoDocente);
      uploaddata.append('cedulaDocente', data.cedulaDocente);
      uploaddata.append('telefonoDocente', data.telefonoDocente);
      uploaddata.append('correoDocente', data.correoDocente);
      uploaddata.append('sexooDocente', data.sexo);
      uploaddata.append('puestoDocente', data.puesto);
      uploaddata.append('cargosAsignados', JSON.stringify(data.cargosAsignados));
      
      this._docente.registrarUsuario(uploaddata).subscribe((data: any) => {
        //console.log(data);
        if (data.metadata.code = "000") {
          this.tituloMensajeVal = "Usuario Creado Correctamente"
          this.mensaje = "Espere hasta que el administrador acepte su solicitud! ";
        } else {
          this.tituloMensajeVal = "Error"
          this.mensaje = "Ha ocurrido un error al crear el usuario, Contactese con su administrador!"
        }
      }, (error: any) => {
        this.tituloMensajeVal = "Error"
        this.mensaje = "Ha ocurrido un error al crear el usuario, Contactese con su administrador!"

      })
    }
  }

  cerrarModal() {
    this.router.navigate(['./login']);
  }


  validadorDeCedula(cedula: String) {


    let cedulaCorrecta = false;
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (cedula.length - 1); i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
        }
        suma = Math.round(suma);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          cedulaCorrecta = true;
        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          cedulaCorrecta = true;
        } else {
          cedulaCorrecta = false;
        }
      } else {
        cedulaCorrecta = false;
      }
    } else {
      cedulaCorrecta = false;
    }
    this.validadorCedula = cedulaCorrecta;


  }


  validarUsuarioRepetido(idespe: String) {
    this._docente.obtenerUsuarioPorIDEspe(idespe).subscribe(respuesta => {

      this.procesarDocentesID(respuesta, idespe);

    })

  }
  procesarDocentesID(resp: any, idEspe: String) {

    let listusuarios = resp.docenteResponse.docente

    if (listusuarios != null) {
      listusuarios.forEach((element: {
        idDocente: any
      }) => {
        if (idEspe = element.idDocente) {
          this.validadorIdEspe = false;
        } else {
          this.validadorIdEspe = true;

        }
      });
    } else {
      this.validadorIdEspe = true;
    }

  }


  cargardocentecedula(cedual: String) {
    this._docente.obtenerDocentePorCedula(cedual).subscribe(respuesta => {
      this.procesarDocenteCedula(respuesta);
    })
  }

  procesarDocenteCedula(resp: any) {
    this.listaCatalogoDocente = resp.docenteResponse.docente[0]
    this.idEspeI = this.listaCatalogoDocente.idDocente;
    this.nombreDocenteM = this.listaCatalogoDocente.nombreDocente;
    this.apellidosDocenteM = this.listaCatalogoDocente.apellidoDocente;
    this.telefonoDocenteM = this.listaCatalogoDocente.telefonoDocente;
    this.correoDocenteM = this.listaCatalogoDocente.correoDocente;
    this.sexoDocenteM = this.listaCatalogoDocente.sexo;
    this.puestoDocenteM = this.listaCatalogoDocente.puesto;
    this.asignarCargoPorPuesto(this.puestoDocenteM);
  }

  cambiarCheckCargo(cargo: Cargo) {
    cargo.checked = !cargo.checked;
    if (!cargo.checked)
      this.cargosAsignados = this.cargosAsignados.filter((item) => item !== cargo);
    else
      this.cargosAsignados.push(cargo);
  }

  asignarCargoPorPuesto(puestoDocenteM: string) {
    let OpcionSeleccionada: string;
    this.cargosAsignados = [];
    if (puestoDocenteM == "TECNICO LABORATORIO")//"TÉCNICO DE LABPORATORIO","TIEMPO COMPLETO","TIEMPO PARCIAL"
      OpcionSeleccionada = "Técnico de Laboratorio";
    else if (puestoDocenteM == "TIEMPO COMPLETO" || puestoDocenteM == "TIEMPO PARCIAL")//"TÉCNICO DE LABPORATORIO","TIEMPO COMPLETO","TIEMPO PARCIAL"
      OpcionSeleccionada = "Docente";
    this.listaCargos.forEach(cargo => {
      if (cargo.nombreCargo == OpcionSeleccionada) {
        if(cargo.codCargo){
          let miCheckbox = document.getElementById(cargo.codCargo?.toString()) as HTMLInputElement;
            miCheckbox.checked = true;
        }
        cargo.checked = true;
        this.cargosAsignados.push(cargo);
      }else{
        if(cargo.codCargo){
          let miCheckbox = document.getElementById(cargo.codCargo?.toString()) as HTMLInputElement;
            miCheckbox.checked = false;
        }
      }
    });
  }
}



