export interface databaseListItem {
    Database: string
}

export interface tableListItem {
    [key: string]: string
}

interface columnItem {
    Field: string,
    Type: string,
    Null: string,
    Key: string,
    Default: null | string | number,
    Extra: string
}

export interface rowItem {
    [key: string]: string | number | null
}

export interface tableItem {
    columns: columnItem[],
    rows: rowItem[]
}

export interface feedback {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}
