export interface databaseListItem {
    Database: string
}

export interface tableListItem {
    [key: string]: string
}

export interface columnItem {
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

export interface param {
    start: number,
    offset: number
}

export interface feedback {
    fieldCount?: number,
    affectedRows?: number,
    insertId?: number,
    serverStatus?: number,
    warningCount?: number,
    message?: string,
    protocol41?: boolean,
    changedRows?: number
}

export interface dataItem {
    databases: databaseListItem[],
    tables: tableListItem[],
    columns: columnItem[],
    rows: rowItem[],
    feedback: feedback
}
