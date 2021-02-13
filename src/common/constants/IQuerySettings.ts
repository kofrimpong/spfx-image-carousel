import { IQueryFilter } from "../../components/QueryFilter/IQueryFilter";


export interface IQuerySettings {
	webUrl: string;
	listId: string;
	legend?:string;
	filters: IQueryFilter[];
	orderBy?: string;
	orderByDirection?: string;
	viewFields?: string[];
	itemLimit:number;
}