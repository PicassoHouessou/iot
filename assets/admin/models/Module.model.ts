export interface Module {
    id: string;
    name: string;
    description: string;
    type: ModuleType
}

export interface ModuleEdit {
    id: string;
    name: string;
    description: string,
    type: string
}

export interface ModuleStatus {
    id: string;
    name: string;
    description: string
}

export interface ModuleType {
    id: string;
    name: string;
    description: string
    unitOfMeasure: string;
    unitDescription: string;
    minValue: number;
    maxValue: number;
}

export interface ModuleHistory {

    id: string;
    module: Module;
    $status: ModuleStatus;
    value: number;
    createdAt: string;
}