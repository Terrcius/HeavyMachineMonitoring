import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Machine, MachineStatus } from "./models/machine.model";
import { MachineService } from "./services/machine.service";
import { Signal } from "@angular/core";

/**
 * Componente principal da aplicação.
 * @description Gerencia o estado da aplicação, a navegação entre as telas e a comunicação com o serviço.
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MachineService], // Fornece o serviço para o componente.
})
export class App {
  // Instância do serviço de simulação da API.
  private machineService: MachineService;
  private allMachines: Signal<Machine[]>;

  // Signals para gerenciar o estado da aplicação.
  public view = signal<"dashboard" | "add" | "details">("dashboard");
  public selectedMachineId = signal<string | null>(null);

  // Signals para o estado do formulário de cadastro.
  public machineName = signal<string>("");
  public machineLocation = signal<string>("");
  public machineStatus = signal<string>("");
  public successMessage = signal<string | null>(null);

  // Enum para o template.
  public statusOptions = Object.values(MachineStatus);

  // Signals para os dados e filtro.
  public filterTerm = signal<string>("");

  // Computed signal para a máquina selecionada.
  public selectedMachine = computed(() => {
    const id = this.selectedMachineId();
    return id ? this.machineService.getMachine(id) : null;
  });

  // Computed signal para filtrar a lista de máquinas.
  public filteredMachines = computed(() => {
    const machines = this.allMachines();
    const filter = this.filterTerm();
    if (!filter) {
      return machines;
    }
    return machines.filter((m) => m.status === filter);
  });

  // Computed signal para verificar a validade do formulário.
  public isFormInvalid = computed(
    () =>
      !this.machineName() || !this.machineLocation() || !this.machineStatus()
  );

  constructor(machineService: MachineService) {
    this.machineService = machineService;
  }

  /**
   * Navega para a view desejada e reinicia os estados, se necessário.
   * @param view A view para a qual navegar ('dashboard', 'add', 'details').
   * @param id O ID da máquina, se a navegação for para a página de detalhes.
   */
  public setView(
    view: "dashboard" | "add" | "details",
    id: string | null = null
  ) {
    this.view.set(view);
    this.selectedMachineId.set(id);
    if (view === "add") {
      this.resetForm();
    }
  }

  /**
   * Navega para a página de detalhes de uma máquina.
   * @param id O ID da máquina.
   */
  public viewDetails(id: string) {
    this.setView("details", id);
  }

  /**
   * Adiciona uma nova máquina.
   * @param event O evento de submissão do formulário.
   */
  public async addMachine(event: Event) {
    event.preventDefault();
    if (this.isFormInvalid()) return;

    try {
      const newMachine = {
        name: this.machineName(),
        location: this.machineLocation(),
        status: this.machineStatus() as MachineStatus,
      };
      await this.machineService.createMachine(newMachine);
      this.successMessage.set("Máquina cadastrada com sucesso!");
      this.resetForm();
    } catch (error) {
      console.error("Erro ao cadastrar máquina:", error);
      this.successMessage.set("Erro ao cadastrar a máquina.");
    }
  }

  // Métodos para atualizar os signals do formulário.
  public onNameChange(event: Event) {
    this.machineName.set((event.target as HTMLInputElement).value);
  }
  public onLocationChange(event: Event) {
    this.machineLocation.set((event.target as HTMLInputElement).value);
  }
  public onStatusChange(event: Event) {
    this.machineStatus.set((event.target as HTMLSelectElement).value);
  }
  public filterByStatus(event: Event) {
    this.filterTerm.set((event.target as HTMLSelectElement).value);
  }

  /**
   * Reseta os campos do formulário para os valores iniciais.
   */
  private resetForm() {
    this.machineName.set("");
    this.machineLocation.set("");
    this.machineStatus.set("");
    this.successMessage.set(null);
  }
}
