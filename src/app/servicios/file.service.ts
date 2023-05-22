import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UploadFilesService {


  //baseUrl="https://gpr-mec-espe.azurewebsites.net"
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
   
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(){
    return this.http.get(`${this.baseUrl}/files`);
  }

  getFileModel(codigoTareaDocente:number){
    return this.http.get(`${this.baseUrl}/fileDocenteTarea/${codigoTareaDocente}`);
  }

  getFileGuia(codigoTarea:any){
    return this.http.get(`${this.baseUrl}/fileTarea/${codigoTarea}`);
  }

  deleteFile(filename: string){
    return this.http.get(`${this.baseUrl}/delete/${filename}`);
  }

}