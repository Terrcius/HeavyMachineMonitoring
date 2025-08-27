export enum MachineStatus {
  Operating = "Operating",
  Maintenance = "Maintenance",
  Stopped = "Stopped",
}

export interface Machine {
  id: string;
  name: string;
  location: string;
  status: string;
}
