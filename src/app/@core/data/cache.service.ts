import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient) {
  }

  get(id): Observable<any> {
    const url = this.PREFIX_URL + 'WfFile!downloadMissiveAttach.action?id=' + id;
    return this.http.get(url, {responseType: 'blob'});
  }

  /*download(id) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.PREFIX_URL + 'WfFile!downloadMissiveAttach.action?id=' + id;
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }*/
}
