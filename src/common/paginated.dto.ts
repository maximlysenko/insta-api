export class PaginatedDto<DataType> {
    totalElements: number;
    data: DataType[];
}
