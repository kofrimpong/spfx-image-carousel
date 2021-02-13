import { IQueryFilter } from "../../components/QueryFilter/IQueryFilter";
import { IQueryFilterField } from "../../components/QueryFilter/IQueryFilterField";
import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";
import { ITag } from "office-ui-fabric-react/lib/Pickers";
import { IQueryFilterPanelStrings } from "./IQueryFilterPanelStrings";


export interface IPropertyPaneQueryFilterPanelProps {
    filters: IQueryFilter[];
    loadFields: () => Promise<IQueryFilterField[]>;
    onLoadTaxonomyPickerSuggestions: (field: IQueryFilterField, filterText: string, currentTerms: ITag[]) => Promise<ITag[]>;
    onLoadPeoplePickerSuggestions: (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) => Promise<IPersonaProps[]>;
    onPropertyChange: (propertyPath: string, newFilters: IQueryFilter[]) => void;
    trimEmptyFiltersOnChange?: boolean;
    disabled?: boolean;
    strings: IQueryFilterPanelStrings;
}