export interface CodaViewRowsResponseDto {
    items: Item[];
    href: string;
    nextSyncToken: string;
}

interface Item {
    id: string;
    type: string;
    href: string;
    name: string;
    index: number;
    createdAt: string;
    updatedAt: string;
    browserLink: string;
    values: { [key: string]: any };
}