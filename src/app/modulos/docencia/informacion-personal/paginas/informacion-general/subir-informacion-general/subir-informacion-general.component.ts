import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DocenteInformacion } from '../../../modelos/DocenteInformacion';
import { Discapacidad } from '../../../modelos/Discapacidad';
import { Domicilio } from '../../../modelos/Domicilio';
import { ContactoEmergencia } from '../../../modelos/ContactoEmergencia';
import { InformacionBancaria } from '../../../modelos/InformacionBancaria';
import { FormacionAcademica } from '../../../modelos/FormacionAcademica';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Docente } from 'src/app/models/Docente';
import { Observable } from 'rxjs';
import { DocenteInformacionService } from '../../../servicios/DocenteInformacion.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormacionAcademicaComponent } from '../../../components/modal-formacion-academica/modal-formacion-academica.component';
import { FormacionAcademicaAdicional } from '../../../modelos/FormacionAcademicaAdicional';
import { ModalExperienciaProfesionalComponent } from '../../../components/modal-experiencia-profesional/modal-experiencia-profesional.component';
import { ModalIdiomaHabladoComponent } from '../../../components/modal-idioma-hablado/modal-idioma-hablado.component';
import { ModalPublicacionRealizadaComponent } from '../../../components/modal-publicacion-realizada/modal-publicacion-realizada.component';
import { v4 as uuidv4 } from 'uuid';
import { Idioma } from '../../../modelos/Idioma';
import { Publicacion } from '../../../modelos/Publicacion';
import { ExperienciaProfesional } from '../../../modelos/ExperienciaProfesional';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subir-informacion-general',
  templateUrl: './subir-informacion-general.component.html',
  styleUrls: ['./subir-informacion-general.component.css'],
})
export class SubirInformacionGeneralComponent implements OnInit {
  blockedDocument: boolean = false;
  docente: DocenteInformacion = {};
  discapacidad: Discapacidad = {};
  domicilio: Domicilio = {};
  domicilioContacto: Domicilio = {};
  contactoEmergencia: ContactoEmergencia = {};
  informacionBancaria: InformacionBancaria = {};
  formacionAcademica: FormacionAcademica = {};
  nombreUsuario: any = localStorage.getItem('usuario');
  datosDocente: Docente = {};
  comboTipoDocumento: string[] = ['CÉDULA', 'PASAPORTE'];
  checkInformacionDocente: boolean = true;
  checkNumeroDocumento: boolean = true;
  checkDiscapacidadEspecial: boolean = true;
  checkEnfermedadCatastrofica: boolean = true;
  numeroDocumento: string = '';
  getNacionalidades$: Observable<any>;
  nacionalidades: string[] = [];
  geTerritorioEcuatoriano$: Observable<any>;
  gruposEtnicos$: Observable<any>;
  gruposEtnicos: string[] = [];
  provincias: any;
  cantones: any;
  parroquias!: any[];
  cantonesContacto: any;
  parroquiasContacto!: any[];
  paises$: Observable<any>;
  paises: string[] = [];
  pipe = new DatePipe('en-US');

  // provinciaSeleccionada!: string;
  // cantonSeleccionado!: string;
  // parroquiaSeleccionada!: string;

  provinciaIds!: string[];
  cantonIds!: string[];
  // provinciaIdsContacto!: string[];
  cantonIdsContacto!: string[];

  comboEstadoCivil: string[] = [
    'CASADO (A)',
    'DIVORCIADO (A)',
    'SOLTERO (A)',
    'UNIÓN LIBRE',
    'VIUDO (A)',
  ];
  comboEtnia: string[] = [
    'AFROECUATORIANO/AFRODESCENDIENTE',
    'BLANCO/A',
    'INDÍGENA',
    'MESTIZO/A',
    'MONTUBIO/A',
    'MULATO/A',
    'NEGRO/A',
    'OTRO/A',
  ];
  comboOpcionesCerradas: string[] = ['NO', 'SI'];
  comboTipoDiscapacidad: string[] = [
    'AUDITIVA',
    'FÍSICA',
    'INTELECTUAL',
    'VISUAL',
  ];
  comboTipoEnfermedadCatastrofica: string[] = [
    'Aneurisma tóraco-abdominal',
    'Insuficiencia renal crónica',
    'Malformaciones arterio venosas cerebrales',
    'Secuelas e quemaduras graves',
    'Síndrome de klippel trenaunay',
    'Todo tipo de cáncer',
    'Todo tipo de malformaciones congénitas de corazón',
    'Trasplante de órganos: riñón, hígado, medula ósea',
  ];
  comboParentesco: string[] = [
    'ABUELO (A)',
    'AMIGO (A)',
    'CONVIVIENTE',
    'CÓNYUGE',
    'CUÑADO (A)',
    'HIJO (A)',
    'HERMANO (A)',
    'MADRE',
    'NIETO (A)',
    'PADRE',
    'SUEGRO (A)',
  ];
  comboTipoInstitucionFinanciera: string[] = [
    'BANCO',
    'COOPERATIVA',
    'COOPERATIVA DE AHORRO Y CRÉDITO',
    'MUTUALISTA',
  ];
  comboTipoCuenta: string[] = ['AHORROS', 'CORRIENTE'];
  comboNivelInstruccion: string[] = [
    'BACHILLERATO',
    'CUARTO NIVEL - DIPLOMADO',
    'CUARTO NIVEL - ESPECIALIDAD',
    'CUARTO NIVEL - MAESTRIA',
    'CUARTO NIVEL-DOCTORADO',
    'EDUCACIÓN BÁSICA',
    'ESTUDIANTE UNIVERSITARIO',
    'PRIMARIA',
    'SECUNDARIA',
    'SIN INSTRUCCIÓN',
    'TÉCNICO SUPERIOR',
    'TECNOLOGÍA',
    'TECNOLOGÍA',
  ];
  comboPeriodoInstruccion: string[] = ['AÑOS', 'SEMESTRES'];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private docenteInformacionService: DocenteInformacionService,
    private dialog: MatDialog
  ) {
    this.getNacionalidades$ =
      this.docenteInformacionService.loadNacionalidades();
    this.geTerritorioEcuatoriano$ =
      this.docenteInformacionService.getTerritorioEcuatoriano();
    this.gruposEtnicos$ = this.docenteInformacionService.loadGruposEtnicos();
    this.paises$ = this.docenteInformacionService.loadPaises();
    this.formacionAcademica.formacionAcademicaAdicionales = [];
    this.formacionAcademica.idiomas = [];
    this.formacionAcademica.publicaciones = [];
    this.docente.experienciaProfesionales = [];
  }

  ngOnInit() {
    this.cargarDatosDocente();
    this.cargarNacionalidades();
    this.cargarTerritorioEcuatoriano();
    this.cargarGruposEtnicos();
    this.cargarPaises();
  }

  cargarNacionalidades() {
    this.getNacionalidades$.subscribe((data) => {
      this.nacionalidades = data.nacionalidades;
    });
  }

  cargarTerritorioEcuatoriano() {
    this.geTerritorioEcuatoriano$.subscribe((data) => {
      this.provincias = Object.values(data);
      this.provinciaIds = Object.keys(this.provincias);
    });
  }

  cargarGruposEtnicos() {
    this.gruposEtnicos$.subscribe((data) => {
      this.gruposEtnicos = data.gruposEtnicos;
    });
  }

  cargarPaises() {
    this.paises$.subscribe((data) => {
      this.paises = data.paises;
    });
  }

  cargarDatosDocente() {
    this.usuarioService
      .obtenerUsuarioPorNombre(this.nombreUsuario)
      .subscribe((respuesta) => {
        this.procesarDocente(respuesta);
      });
  }

  procesarDocente(resp: any) {
    this.datosDocente = resp.docenteResponse.docente[0];
    this.docente.nombreCompleto =
      this.datosDocente.apellidoDocente + ' ' + this.datosDocente.nombreDocente;
    this.docente.genero = this.datosDocente.sexo;
    this.docente.correoPrincipal = this.datosDocente.correoDocente;
    this.docente.idEspe = this.datosDocente.idDocente;
    this.docenteInformacionService.obtenerDocentePorIdEspe(this.docente.idEspe).subscribe((data) => {
      //console.log(data);
      if(data){
        this.docente = data;
        // if(this.docente.fechaNacimiento)
        //   this.docente.fechaNacimiento = this.pipe.transform(this.docente.fechaNacimiento,'yyyy-MM-dd','UTC');
        if(this.docente.discapacidad)
          this.discapacidad = this.docente.discapacidad;
        if(this.docente.domicilio)
          this.domicilio = this.docente.domicilio;
        if(this.docente.contactoEmergencia)
          this.contactoEmergencia = this.docente.contactoEmergencia;
        if(this.docente.contactoEmergencia && this.docente.contactoEmergencia.domicilio)
          this.domicilioContacto = this.docente.contactoEmergencia.domicilio;
        if(this.docente.informacionBancaria)
          this.informacionBancaria = this.docente.informacionBancaria;
        if(this.docente.formacionAcademica)
          this.formacionAcademica = this.docente.formacionAcademica;
      }
    });
  }

  onProvinciaChange() {
    if (this.domicilio.provincia) {
      this.cantones = Object.values(
        this.provincias[this.domicilio.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIds = Object.keys(this.cantones);
      this.domicilio.canton = '';
      this.parroquias = [];
      this.domicilio.parroquia = '';
    }
  }

  onCantonChange() {
    if (this.domicilio.canton) {
      this.parroquias = Object.entries(
        this.cantones[this.domicilio.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      this.domicilio.parroquia = '';
    }
  }

  onProvinciaContactoChange() {
    if (this.domicilioContacto.provincia) {
      this.cantonesContacto = Object.values(
        this.provincias[this.domicilioContacto.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIdsContacto = Object.keys(this.cantonesContacto);
      this.domicilioContacto.canton = '';
      this.parroquiasContacto = [];
      this.domicilioContacto.parroquia = '';
    }
  }

  onCantonContactoChange() {
    if (this.domicilioContacto.canton) {
      this.parroquiasContacto = Object.entries(
        this.cantonesContacto[this.domicilioContacto.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      this.domicilioContacto.parroquia = '';
    }
  }

  detectarCambioTipoDocumento() {
    if (this.docente.tipoDocumento == 'PASAPORTE') {
      this.checkNumeroDocumento = false;
      this.docente.numeroDocumento = this.numeroDocumento;
    } else {
      this.checkNumeroDocumento = true;
      this.docente.numeroDocumento = this.datosDocente.cedulaDocente;
    }
  }

  detectarCambioInputDiscapacidad() {
    if (this.discapacidad.discapacidadEspecial == 'SI') {
      this.checkDiscapacidadEspecial = false;
    } else {
      this.checkDiscapacidadEspecial = true;
      this.discapacidad.tipoDiscapacidad = '';
      this.discapacidad.porcentajeDiscapacidad = undefined;
      this.discapacidad.numeroCarnet = '';
    }
  }

  detectarCambioInputEnfermedadCatastrofica() {
    if (this.discapacidad.enfermedadCatastrofica == 'SI') {
      this.checkEnfermedadCatastrofica = false;
    } else {
      this.checkEnfermedadCatastrofica = true;
      this.discapacidad.tipoEnfermedadCatastrofica = '';
    }
  }

  save() {
    console.log(this.discapacidad)
    this.docente.discapacidad = this.discapacidad;
    this.docente.domicilio = this.domicilio;
    this.docente.contactoEmergencia = this.contactoEmergencia;
    this.docente.contactoEmergencia.domicilio = this.domicilioContacto;
    this.docente.informacionBancaria = this.informacionBancaria;
    this.docente.formacionAcademica = this.formacionAcademica;
    // console.log('data', this.docente);
    this.blockedDocument = true;
    this.docenteInformacionService.guardarInformacion(this.docente)
    .subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos Actualizados con éxito'
        });
        setTimeout(() => {
          this.blockedDocument = false;
          this.router.navigate(["/subir-informacion-general"])
        }, 2000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al actualizar la información'
        });
        this.blockedDocument = false;
      },
      complete: () => {
      },
    })
  }

  openModalFormacionAcademicaAdicional() {
    const dialogRef = this.dialog.open(ModalFormacionAcademicaComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.codigoFormacionAdicional = uuidv4();
        this.formacionAcademica.formacionAcademicaAdicionales?.push(formValue);
      }
    });
  }

  editarFormacionAdicional(formacionAcademica: FormacionAcademicaAdicional) {
    const dialogRef = this.dialog.open(ModalFormacionAcademicaComponent, {
      width: '450px',
      data: formacionAcademica,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.formacionAcademica.formacionAcademicaAdicionales =
          this.formacionAcademica.formacionAcademicaAdicionales?.filter(
            (item) =>
              item.codigoFormacionAdicional !==
              formacionAcademica.codigoFormacionAdicional
          );
        this.formacionAcademica.formacionAcademicaAdicionales?.push(formValue);
      }
    });
  }

  eliminarFormacionAdicional(formacionAcademica: FormacionAcademicaAdicional) {
    this.formacionAcademica.formacionAcademicaAdicionales =
      this.formacionAcademica.formacionAcademicaAdicionales?.filter(
        (item) =>
          item.codigoFormacionAdicional !==
          formacionAcademica.codigoFormacionAdicional
      );
  }

  openModalIdiomas() {
    const dialogRef = this.dialog.open(ModalIdiomaHabladoComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.codigoIdioma = uuidv4();
        this.formacionAcademica.idiomas?.push(formValue);
      }
    });
  }

  editarIdiomaIngresado(idioma: Idioma) {
    const dialogRef = this.dialog.open(ModalIdiomaHabladoComponent, {
      width: '450px',
      data: idioma,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.formacionAcademica.idiomas =
          this.formacionAcademica.idiomas?.filter(
            (item) => item.codigoIdioma !== idioma.codigoIdioma
          );
        this.formacionAcademica.idiomas?.push(formValue);
      }
    });
  }

  eliminarIdiomaIngresado(idioma: Idioma) {
    this.formacionAcademica.idiomas = this.formacionAcademica.idiomas?.filter(
      (item) => item.codigoIdioma !== idioma.codigoIdioma
    );
  }

  openModalPublicaciones() {
    const dialogRef = this.dialog.open(ModalPublicacionRealizadaComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.idPublicacion = uuidv4();
        this.formacionAcademica.publicaciones?.push(formValue);
      }
    });
  }

  editarPublicacionIngresada(publicacion: Publicacion) {
    const dialogRef = this.dialog.open(ModalPublicacionRealizadaComponent, {
      width: '450px',
      data: publicacion,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.formacionAcademica.publicaciones =
          this.formacionAcademica.publicaciones?.filter(
            (item) => item.idPublicacion !== publicacion.idPublicacion
          );
        this.formacionAcademica.publicaciones?.push(formValue);
      }
    });
  }

  eliminarPublicacionIngresada(publicacion: Publicacion) {
    this.formacionAcademica.publicaciones =
      this.formacionAcademica.publicaciones?.filter(
        (item) => item.idPublicacion !== publicacion.idPublicacion
      );
  }

  openModalExperienciaProfesional() {
    const dialogRef = this.dialog.open(ModalExperienciaProfesionalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        formValue.codigoExperiencia = uuidv4();
        this.docente.experienciaProfesionales?.push(formValue);
      }
    });
  }

  editarExperienciaIngresada(experiencia: ExperienciaProfesional) {
    const dialogRef = this.dialog.open(ModalExperienciaProfesionalComponent, {
      width: '450px',
      data: experiencia,
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.docente.experienciaProfesionales =
          this.docente.experienciaProfesionales?.filter(
            (item) => item.codigoExperiencia !== experiencia.codigoExperiencia
          );
        this.docente.experienciaProfesionales?.push(formValue);
      }
    });
  }

  eliminarExperienciaIngresada(experiencia: ExperienciaProfesional) {
    this.docente.experienciaProfesionales =
      this.docente.experienciaProfesionales?.filter(
        (item) => item.codigoExperiencia !== experiencia.codigoExperiencia
      );
  }
}
