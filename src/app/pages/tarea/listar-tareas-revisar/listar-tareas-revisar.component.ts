import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, AbstractControl } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { TareasRealizadas } from 'src/app/models/TareasRealizadas';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listar-tareas-revisar',
  templateUrl: './listar-tareas-revisar.html',
  styleUrls: ['./listar-tareas-revisar.component.css']
})

export class ListarTareasRevisarComponent implements OnInit {
  //getTareasDocente$: Observable<TareaDocente[]>;
  //tareasDocente: TareaDocente[] = [];
  @ViewChild (MatPaginator) paginator!: MatPaginator;
  tareasDocente: any[] | undefined = [];
  cedulaDocenteRevisor: any;
  dataTable: any | null;//[] = [];
  data: any;
  name = 'ExcelDatos.xlsx';
  blockedDocument: boolean = false;
  getTareasDocente$: Observable<TareasRealizadas[]>;

  //sum:number=0;

  //
  displayedColumns: string[] = ['id', 'revisor', 'proceso', 'proyecto', 'tarea', 'tipoTarea', 'tareaIndicadors', 'prioridad', 'peso', 'fechaInicio', 'fechaVencimiento', 'responsable', 'pdf'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource: any;

  readonly formControl: AbstractControl;
  //

  constructor(
    private tareaService: TareaService,
    private router: Router,
    formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.getTareasDocente$ = this.tareaService.obtenerTodasTareasRevisar();
    //this.getTareasDocente$ = this.tareaService.obtenerTodasTareasRevisar();
    //
    /*this.tareaService.tareasDocente$.subscribe((res) => {
      this.tareasDocente = res;
      console.log(this.tareasDocente);


    });*/
    // if (localStorage.getItem('dataTable') != null) {
    //   this.data = localStorage.getItem('dataTable');
    //   this.dataTable = JSON.parse(this.data);
    //   this.dataSource = new MatTableDataSource(this.dataTable);
    // }

    this.getTareas();

    //this.getTareas();



    this.formControl = formBuilder.group({
      id: '',
      revisor: '',
      proceso: '',
      proyecto: '',
      tarea: '',
      tipoTarea: '',
      prioridad: '',
      peso: '',
      fechaInicio: '',
      fechaVencimiento: '',
      responsable: ''
    })
    this.formControl.valueChanges.subscribe(value => {
      const filter = {
        ...value, revisor: value.revisor.trim().toLowerCase(), proceso: value.proceso.trim().toLowerCase(),
        proyecto: value.proyecto.trim().toLowerCase(), tarea: value.tarea.trim().toLowerCase(),
        tipoTarea: value.tipoTarea.trim().toLowerCase(), prioridad: value.prioridad.trim().toLowerCase(),
        peso: value.peso.trim().toLowerCase(), responsable: value.responsable.trim().toLowerCase()
      } as string;
      this.dataSource.filter = filter;
    });
  }


  getTodasTareas(){

  }
  ngOnInit(): void {
  }

  convertirDataPdf() {
    this.blockedDocument = true;
    /*
    var doc = new jspdf('landscape', 'pt', 'a4');
    var margin =10;
    var scale = (doc.internal.pageSize.width-margin*2)/document.body.scrollWidth;
    const DATA = document.getElementById('dataPdf');
    if(DATA)
      doc.html(DATA,{
        x:margin,
        y:margin,
        html2canvas:{
          scale:scale,
        },
        callback:function(doc){
          doc.output('dataurlnewwindow',{filename:'dataPdf.pdf'})
        }
      })
    */

    const DATA = document.getElementById('dataPdf');
    const doc = new jspdf('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    if (DATA) {
      html2canvas(DATA, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${formatDate(new Date(), 'yyyy/MM/dd', 'en')}_reporteTarea.pdf`);
        this.blockedDocument = false;
      });
    }
    /*var data = document.getElementById("dataPdf");
    if(data)
      html2canvas(data).then(canvas=>{
        var imgWidth = 208;
        var imgHeigth = canvas.height * imgWidth / canvas.width;
        let pdf = new jspdf('p','mm','a4');
        var position =0;
        pdf.save('Data.pdf');
      })*/

  }

  exportToExcel(): void {
    let element = document.getElementById('dataPdf');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSX.writeFile(book, this.name);
  }
  actualizarDatos() {
    this.getTareas();
  }

  getTareas() {
    this.blockedDocument = true;
    //localStorage.removeItem('dataTable');
    this.getTareasDocente$.subscribe({
      next: (data) => {
        this.tareasDocente = data;
        var cont = 0;
        this.dataTable=[];
        this.tareasDocente.forEach(tareaDocent => {
          cont++;
          let objetoTarea = {
            "id": cont,
            "revisor": tareaDocent.nombreDocenteRevisor,
            "proceso": tareaDocent.tipoProceso,
            "proyecto": tareaDocent.nombreProyecto,
            "tarea": tareaDocent.nombreTarea,
            "tipoTarea": tareaDocent.tipoTarea,
            "prioridad": tareaDocent.prioridadTarea,
            "peso": tareaDocent.pesoTarea,
            "fechaInicio": tareaDocent.fechaCreaciontarea,
            "fechaVencimiento": tareaDocent.fechaEntregaTarea,
            "responsable": tareaDocent.responsable,
            "tareaIndicadors": tareaDocent.tareaIndicadors,
            "nombreArchivo": tareaDocent.nombreArchivo,
            "urlArchivo": tareaDocent.urlArchivo
          }
          this.dataTable.push(objetoTarea);
        });
        //localStorage.setItem('dataTable', JSON.stringify(this.dataTable));
        this.dataSource = new MatTableDataSource(this.dataTable);
        this.dataSource.filterPredicate = ((data, filter) => {
          const a = !filter.id || data.id === filter.id;
          const b = !filter.revisor || data.revisor.toLowerCase().includes(filter.revisor);
          const c = !filter.proceso || data.proceso.toLowerCase().includes(filter.proceso);
          const d = !filter.proyecto || data.proyecto.toLowerCase().includes(filter.proyecto);
          const e = !filter.tarea || data.tarea.toLowerCase().includes(filter.tarea);
          const f = !filter.prioridad || data.prioridad.toLowerCase().includes(filter.prioridad);
          const g = !filter.peso || data.peso.toLowerCase().includes(filter.peso);
          const h = !filter.fechaInicio || data.revisor.fechaInicio().includes(filter.fechaInicio);
          const i = !filter.fechaVencimiento || data.fechaVencimiento.toLowerCase().includes(filter.fechaVencimiento);
          const j = !filter.responsable || data.responsable.toLowerCase().includes(filter.responsable);
          const k = !filter.tipoTarea || data.tipoTarea.toLowerCase().includes(filter.tipoTarea);
          return a && b && c && d && e && f && g && h && i && j && k;
        }) as (PeriodicElement: any, string: any) => boolean;

        this.dataSource.paginator = this.paginator;
        this.blockedDocument = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Datos Cargados con éxito'
        });
        // setTimeout(() => {
        //   this.blockedDocument = false;
        //   this.router.navigate(["listar-tareas-revisar"])
        // }, 2000);

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message ?? ' Error al actualizar la Tabla'
        });
        this.blockedDocument = false;
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }
}
