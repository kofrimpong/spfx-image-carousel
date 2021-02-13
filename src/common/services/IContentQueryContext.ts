import { PageContext } from '@microsoft/sp-page-context';

export interface IContentQueryContext {
	pageContext: PageContext;
	webUrl: string;
	listId: string;
	legend:string;
	items: any[];
	accessDenied: boolean;
	webNotFound: boolean;
	callTimeStamp: number;
}