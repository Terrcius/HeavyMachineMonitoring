// Descrição: Página para exibir os detalhes de uma máquina.

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
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MachineService } from "../../services/machine.service";
import { Machine } from "../../models/machine.model";

@Component({
  selector: "app-machine-details",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <button
        (click)="back.emit()"
        class="mb-6 text-blue-600 hover:underline flex items-center"
      >
        <svg
          class="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Voltar para o Dashboard
      </button>

      @if (isLoading()) {
      <p class="text-center text-gray-500">Carregando detalhes...</p>
      } @else if (machine()) {
      <div class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-800 border-b pb-2">
          {{ machine()?.name }}
        </h2>
        <div>
          <h3 class="text-lg font-semibold text-gray-600">ID da Máquina</h3>
          <p class="text-gray-800 font-mono text-sm">{{ machine()?.id }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-600">Localização Atual</h3>
          <p class="text-gray-800">{{ machine()?.location }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-600">Status</h3>
          <p class="text-gray-800">
            <span
              class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full"
              [ngClass]="statusClass()"
            >
              {{ statusText() }}
            </span>
          </p>
        </div>
      </div>
      } @else {
      <p class="text-center text-red-500">
        Não foi possível carregar os detalhes da máquina.
      </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachineDetailsComponent {
  _machineId = signal<string | null>(null);
  @Input() set machineId(id: string | null) {
    this._machineId.set(id);
    this.loadMachineDetails();
  }
  @Output() back = new EventEmitter<void>();

  machine = signal<Machine | null>(null);
  isLoading = signal<boolean>(false);

  statusText = computed(() => {
    const currentMachine = this.machine();
    if (!currentMachine) return "";
    const statusMap: { [key: string]: string } = {
      Operating: "Operando",
      Maintenance: "Manutenção",
      Stopped: "Parada",
    };
    return statusMap[currentMachine.status] || "Desconhecido";
  });

  statusClass = computed(() => {
    const currentMachine = this.machine();
    if (!currentMachine) return "";
    switch (currentMachine.status) {
      case "Operating":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Stopped":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  });

  constructor(private machineService: MachineService) {}

  loadMachineDetails(): void {
    const id = this._machineId();
    if (!id) return;

    this.isLoading.set(true);
    this.machineService.getMachine(id).subscribe({
      next: (data) => {
        this.machine.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Erro ao buscar detalhes da máquina", err);
        this.isLoading.set(false);
      },
    });
  }
}
