// Descrição: Página do dashboard que exibe a lista de máquinas.

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
import { MachineStatus, Machine } from "../../models/machine.model";
import { MachineService } from "../../services/machine.service";
import { MachineListComponent } from "../../components/machine-list.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, MachineListComponent],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-700">Dashboard de Máquinas</h2>
        <div class="flex items-center space-x-2">
          <label for="statusFilter" class="text-sm font-medium text-gray-600"
            >Filtrar por Status:</label
          >
          <select
            id="statusFilter"
            #filter
            (change)="onFilterChange(filter.value)"
            class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option [value]="status.Operating">Operando</option>
            <option [value]="status.Maintenance">Manutenção</option>
            <option [value]="status.Stopped">Parada</option>
          </select>
        </div>
      </div>
      @if (isLoading()) {
      <p class="text-center text-gray-500">Carregando máquinas...</p>
      } @else if (error()) {
      <p class="text-center text-red-500">{{ error() }}</p>
      } @else {
      <app-machine-list
        [machines]="machines()"
        (viewDetails)="viewDetails.emit($event)"
      ></app-machine-list>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Output() viewDetails = new EventEmitter<string>();

  machines = signal<Machine[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  statusFilter = signal<string>("");
  status = MachineStatus;

  constructor(private machineService: MachineService) {
    effect(() => {
      this.loadMachines(this.statusFilter());
    });
  }

  loadMachines(filter: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.machineService.getMachines(filter).subscribe({
      next: (data) => {
        this.machines.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Erro ao buscar máquinas", err);
        this.error.set(
          "Falha ao carregar máquinas. Verifique se o backend está rodando."
        );
        this.isLoading.set(false);
      },
    });
  }

  onFilterChange(value: string): void {
    this.statusFilter.set(value);
  }
}
