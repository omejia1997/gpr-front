import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/Docente';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { v4 as uuidv4 } from 'uuid';
import { ModalExperienciaProfesionalComponent } from '../../../components/modal-experiencia-profesional/modal-experiencia-profesional.component';
import { ModalFormacionAcademicaComponent } from '../../../components/modal-formacion-academica/modal-formacion-academica.component';
import { ModalIdiomaHabladoComponent } from '../../../components/modal-idioma-hablado/modal-idioma-hablado.component';
import { ModalPublicacionRealizadaComponent } from '../../../components/modal-publicacion-realizada/modal-publicacion-realizada.component';
import { ContactoEmergencia } from '../../../modelos/ContactoEmergencia';
import { Discapacidad } from '../../../modelos/Discapacidad';
import { DocenteInformacion } from '../../../modelos/DocenteInformacion';
import { Domicilio } from '../../../modelos/Domicilio';
import { ExperienciaProfesional } from '../../../modelos/ExperienciaProfesional';
import { FormacionAcademica } from '../../../modelos/FormacionAcademica';
import { FormacionAcademicaAdicional } from '../../../modelos/FormacionAcademicaAdicional';
import { Idioma } from '../../../modelos/Idioma';
import { InformacionBancaria } from '../../../modelos/InformacionBancaria';
import { Publicacion } from '../../../modelos/Publicacion';
import { DocenteInformacionService } from '../../../servicios/DocenteInformacion.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ver-docente-informacion',
  templateUrl: './ver-docente-informacion.component.html',
  styleUrls: ['./ver-docente-informacion.component.css']
})
export class VerDocenteInformacionComponent implements OnInit {
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
  imagenSeleccionada: any;
  imagenURL: any;
  provinciaIds!: string[];
  cantonIds!: string[];
  cantonIdsContacto!: string[];
  @ViewChild('tabContent', { static: false }) tabContentRef!: ElementRef;


  constructor(
    private router: Router,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private docenteInformacionService: DocenteInformacionService,
    private dialog: MatDialog
  ) {
    this.geTerritorioEcuatoriano$ =
      this.docenteInformacionService.getTerritorioEcuatoriano();
    this.gruposEtnicos$ = this.docenteInformacionService.loadGruposEtnicos();
    this.paises$ = this.docenteInformacionService.loadPaises();
    this.formacionAcademica.formacionAcademicaAdicionales = [];
    this.formacionAcademica.idiomas = [];
    this.formacionAcademica.publicaciones = [];
    this.docente.experienciaProfesionales = [];
    this.imagenURL= "https://icon-library.com/images/user-image-icon/user-image-icon-19.jpg";//foto por defualt
  }

  ngOnInit() {
    this.cargarDatosDocente();
    this.cargarTerritorioEcuatoriano();
    this.cargarGruposEtnicos();
    this.cargarPaises();
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
      if(data){
        this.docente = data;
        if(this.docente.imagenUser?.urlImagen)
          this.imagenURL = this.docente.imagenUser?.urlImagen;
        if(this.docente.discapacidad)
          this.discapacidad = this.docente.discapacidad;
        if(this.docente.domicilio){
          this.domicilio = this.docente.domicilio;
          this.cargarDomicilioCantones();
          this.cargarDomicilioParroquia();
        }
        if(this.docente.contactoEmergencia)
          this.contactoEmergencia = this.docente.contactoEmergencia;
        if(this.docente.contactoEmergencia && this.docente.contactoEmergencia.domicilio){
          this.domicilioContacto = this.docente.contactoEmergencia.domicilio;
          this.cargarCantonContacto();
          this.cargarParroquiaContacto();
        }
        if(this.docente.informacionBancaria)
          this.informacionBancaria = this.docente.informacionBancaria;
        if(this.docente.formacionAcademica){
          this.formacionAcademica = this.docente.formacionAcademica;
        }
      }
    });
  }

  cargarDomicilioCantones() {
    if (this.domicilio.provincia) {
      this.cantones = Object.values(
        this.provincias[this.domicilio.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIds = Object.keys(this.cantones);
    }
  }

  cargarDomicilioParroquia() {
    if (this.domicilio.canton) {
      this.parroquias = Object.entries(
        this.cantones[this.domicilio.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
    }
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

  cargarCantonContacto() {
    if (this.domicilioContacto.provincia) {
      this.cantonesContacto = Object.values(
        this.provincias[this.domicilioContacto.provincia].cantones
      ).sort((a: any, b: any) => a.canton.localeCompare(b.canton));

      this.cantonIdsContacto = Object.keys(this.cantonesContacto);
    }
  }

  cargarParroquiaContacto() {
    if (this.domicilioContacto.canton) {
      this.parroquiasContacto = Object.entries(
        this.cantonesContacto[this.domicilioContacto.canton].parroquias
      )
        .map(([id, nombre]) => ({ id, nombre }))
        .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
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

  generarPDF() {
    const doc = new jspdf();

    const tabContent = this.tabContentRef.nativeElement as HTMLElement; // Realizar casting explícito
    if (tabContent) {
      const tabPanes = tabContent.getElementsByClassName('tab-pane');
      const promises = [];

      for (let i = 0; i < tabPanes.length; i++) {
        const tabPane = tabPanes[i] as HTMLElement; // Realizar casting explícito
        const contenido = tabPane;

        if (contenido && contenido.innerHTML.trim() !== '') {
          if (i > 0) {
            doc.addPage();
          }

          // Capturar el contenido visual de cada pestaña utilizando html2canvas
          const promise = html2canvas(tabPane).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            doc.addImage(imgData, 'JPEG', 10, 10, doc.internal.pageSize.getWidth() - 20, 0);
          });

          promises.push(promise);
        }
      }

      // Esperar a que se completen todas las promesas antes de guardar el PDF
      Promise.all(promises).then(() => {
        doc.save('contenido.pdf');
      });
    }
  }

}
