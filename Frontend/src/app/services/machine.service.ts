//Descrição: Serviço para comunicação com a API backend.

import {
  Injectable,
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  effect,
  computed,
  Provider,
  APP_INITIALIZER,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpParams, HttpClientModule } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Machine, MachineStatus } from "../models/machine.model";

@Injectable()
export class MachineService {
  // ATENÇÃO: Verifique se a porta corresponde à do seu backend em execução.
  private apiUrl = "https://localhost:7251/api/machines";

  constructor(private http: HttpClient) {}

  getMachines(status?: string): Observable<Machine[]> {
    let params = new HttpParams();
    if (status && status !== "") {
      params = params.append("status", status);
    }
    return this.http.get<Machine[]>(this.apiUrl, { params });
  }

  getMachine(id: string): Observable<Machine> {
    return this.http.get<Machine>(`${this.apiUrl}/${id}`);
  }

  createMachine(
    machineData: Omit<Machine, "id" | "status"> & { status: string }
  ): Observable<Machine> {
    // A API espera um enum (int), então convertemos a string para o valor correspondente
    const payload = {
      ...machineData,
      status: Object.keys(MachineStatus).indexOf(machineData.status),
    };
    return this.http.post<Machine>(this.apiUrl, payload);
  }
}
