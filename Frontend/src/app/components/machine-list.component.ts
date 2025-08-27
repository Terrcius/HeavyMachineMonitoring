// Descrição: Componente que renderiza a lista de máquinas.

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
import { Machine } from "../models/machine.model";

@Component({
  selector: "app-machine-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Localização
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          @for (machine of machines; track machine.id) {
          <tr class="hover:bg-gray-50 transition-colors">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ machine.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ machine.location }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                [ngClass]="getStatusClass(machine.status)"
              >
                {{ getStatusText(machine.status) }}
              </span>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <button
                (click)="viewDetails.emit(machine.id)"
                class="text-blue-600 hover:text-blue-800"
              >
                Ver Detalhes
              </button>
            </td>
          </tr>
          } @empty {
          <tr>
            <td colspan="4" class="px-6 py-4 text-center text-gray-500">
              Nenhuma máquina encontrada.
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MachineListComponent {
  @Input() machines: Machine[] = [];
  @Output() viewDetails = new EventEmitter<string>();

  getStatusClass(status: string): string {
    switch (status) {
      case "Operating":
        return "bg-green-100 text-green-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Stopped":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      Operating: "Operando",
      Maintenance: "Manutenção",
      Stopped: "Parada",
    };
    return statusMap[status] || "Desconhecido";
  }
}
