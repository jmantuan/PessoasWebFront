import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/Pessoa';

@Injectable()
export class PessoaService {
  elementApiUrl = 'https://localhost:44321/api/pessoas';
  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.elementApiUrl);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.elementApiUrl}/${id}`)
  }

  createPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.elementApiUrl, pessoa);
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.elementApiUrl}/${id}`, pessoa);
  }

  deletePessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}/${id}`);
  }

}
