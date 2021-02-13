import { IQuerySettings } from "../../../common/constants/IQuerySettings";
import { IDynamicItem } from "../../../common/dataContracts/IDynamicItem";
import { IContentQueryStrings } from "../../../common/constants/IContentQueryStrings";
import { IReadonlyTheme }               from '@microsoft/sp-component-base';
import { IContentQueryContext } from "../../../common/services/IContentQueryContext";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IImageCarouselProps {
  onLoadQueryContext: (querySettings: IQuerySettings, callTimeStamp: number) => Promise<IContentQueryContext>;
  themeVariant: IReadonlyTheme;
  siteUrl: string;
  querySettings: IQuerySettings;
  wpContext: WebPartContext;
  strings: IContentQueryStrings;
  displayMode:DisplayMode;
  showThumbs?: boolean;
  autoPlay?:boolean;
  showArrows?:boolean;
  showIndicators?:boolean;
  stopOnHover?:boolean;
  onClickItem?:(elm:any)=>void;
  speed?:number;
  height:string;
  width:string;
  legend?:string;
}
