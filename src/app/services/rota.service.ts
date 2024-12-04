import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rota } from '../models/rota.model';
import { RotaViagemResponse } from '../models/rotaViagemResponse.model';

@Injectable({
  providedIn: 'root'
})
export class RotaService {
  private apiUrl = 'https://localhost:7264/api/RotaViagem';
  constructor(private http: HttpClient) {}

  getRotas(): Observable<any[]> {
    return this.http.get<Rota[]>(this.apiUrl);
  }

  incluirRota(rota: Rota): Observable<Rota> {
    console.log(rota)
    return this.http.post<Rota>(`${this.apiUrl}/criar-rota`, rota);
  }

  alterarRota(id: number, rota: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atualizar-rota/${id}`, rota);
  }

  excluirRota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar-rota/${id}`);
  }

  consultarMelhorRota(origem: string, destino: string): Observable<RotaViagemResponse> {
    return this.http.get<any>(`${this.apiUrl}/pesquisar-rota/${origem}/${destino}`);;
  }
}
