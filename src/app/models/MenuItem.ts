export interface IMenuItem {
    icon?: string
    label?: string
    route?: string

    onClick?(): void;
}