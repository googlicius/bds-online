export interface  Block{
    block_id: number;
    name: string;
    label: string;
    seq: number;
    description?: string;
    attributes: Attribute[];
}

export interface Attribute{
    attr_id?: number;
    name?: string;
    label: string;
    type: string;
    block_id?: number;
    allow_null?: boolean;
    seq: number;
    is_custom?: boolean;
}

export interface InputType{
    name: string;
    options?: any[];
}