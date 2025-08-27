// Descrição: Página com o formulário para cadastrar uma nova máquina.

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
import { HttpClient, HttpParams, HttpClientModule } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { MachineService } from "../../services/machine.service";
import { MachineStatus } from "../../models/machine.model";

@Component({
  selector: "app-add-machine",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-700 mb-6">
        Cadastrar Nova Máquina
      </h2>
      <form [formGroup]="machineForm" (ngSubmit)="onSubmit()">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Nome da Máquina</label
            >
            <input
              type="text"
              id="name"
              formControlName="name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            @if (machineForm.get('name')?.invalid &&
            machineForm.get('name')?.touched) {
            <p class="mt-1 text-sm text-red-600">O nome é obrigatório.</p>
            }
          </div>

          <div>
            <label
              for="location"
              class="block text-sm font-medium text-gray-700"
              >Localização</label
            >
            <input
              type="text"
              id="location"
              formControlName="location"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            @if (machineForm.get('location')?.invalid &&
            machineForm.get('location')?.touched) {
            <p class="mt-1 text-sm text-red-600">
              A localização é obrigatória.
            </p>
            }
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700"
              >Status</label
            >
            <select
              id="status"
              formControlName="status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option [value]="status.Operating">Operando</option>
              <option [value]="status.Maintenance">Manutenção</option>
              <option [value]="status.Stopped">Parada</option>
            </select>
          </div>
        </div>

        <div class="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            (click)="cancel.emit()"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            [disabled]="machineForm.invalid"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salvar Máquina
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMachineComponent {
  @Output() machineAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  machineForm: FormGroup;
  status = MachineStatus;

  constructor(private fb: FormBuilder, private machineService: MachineService) {
    this.machineForm = this.fb.group({
      name: ["", Validators.required],
      location: ["", Validators.required],
      status: [MachineStatus.Stopped, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.machineForm.valid) {
      this.machineService.createMachine(this.machineForm.value).subscribe({
        next: () => {
          alert("Máquina cadastrada com sucesso!");
          this.machineAdded.emit();
        },
        error: (err) => {
          console.error("Erro ao cadastrar máquina", err);
          alert("Ocorreu um erro ao cadastrar a máquina. Tente novamente.");
        },
      });
    }
  }
}
