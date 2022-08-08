import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version,Text } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneField,
  IPropertyPaneToggleProps,
  IPropertyPaneTextFieldProps,
  PropertyPaneToggle,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { update, isEmpty, get } from '@microsoft/sp-lodash-subset';
import { IQueryFilter } from '../../components/QueryFilter/IQueryFilter';
import { ContentQueryService } from '../../common/services/ContentQueryService';
import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { IQuerySettings } from '../../common/constants/IQuerySettings';
import { IContentQueryContext } from '../../common/services/IContentQueryContext';
import { IContentQueryStrings } from '../../common/constants/IContentQueryStrings';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IQueryFilterField } from '../../components/QueryFilter/IQueryFilterField';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ITag } from 'office-ui-fabric-react/lib/Pickers';
import { PropertyPaneQueryFilterPanel } from '../../controls/PropertyPaneQueryFilterPanel/PropertyPaneQueryFilterPanel';
import { ContentQueryConstants } from '../imageCarousel/constants/ContentQueryConstants';

import * as strings from 'ImageCarouselWebPartStrings';
import ImageCarousel from './components/ImageCarousel';
import { IImageCarouselProps } from './components/IImageCarouselProps';

export interface IImageCarouselWebPartProps {
  siteUrl: string;
  webUrl: string;
  listId: string;
  showThumbs: boolean;
  autoPlay: boolean;
  showArrows: boolean;
  showIndicators: boolean;
  stopOnHover: boolean;
  speed: number;
  height: string;
  width: string;
  legend: string;
  filters: IQueryFilter[];
  centerSlidePercentage:number;
}

export default class ImageCarouselWebPart extends BaseClientSideWebPart <IImageCarouselWebPartProps> {

  private readonly logSource = "ContentQueryWebPart.ts";


  /***************************************************************************
   * Service used to perform REST calls
   ***************************************************************************/
  private ContentQueryService: ContentQueryService;

  /***************************************************************************
  * Support for theme variants
  ***************************************************************************/
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  /***************************************************************************
   * Custom ToolPart Property Panes
   ***************************************************************************/
  private siteUrlDropdown: PropertyPaneAsyncDropdown;
  private webUrlDropdown: PropertyPaneAsyncDropdown;
  private listTitleDropdown: PropertyPaneAsyncDropdown;
  private autoPlayToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private showIndicatorsToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private showArrowsToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private showThumbsToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private stopOnHoverToggle: IPropertyPaneField<IPropertyPaneToggleProps>;
  private speedTextField: IPropertyPaneField<IPropertyPaneTextFieldProps>;
  private popupWidthTextField: IPropertyPaneField<IPropertyPaneTextFieldProps>;
  private popupHeightTextField: IPropertyPaneField<IPropertyPaneTextFieldProps>;
  private legendDropDown: PropertyPaneAsyncDropdown;
  private filtersPanel: PropertyPaneQueryFilterPanel;
  private centerSlidePercentageTextField : IPropertyPaneField<IPropertyPaneTextFieldProps>;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return new Promise<void>((resolve) => {
      this.ContentQueryService = new ContentQueryService(this.context, this.context.spHttpClient);
      this.properties.webUrl = this.properties.siteUrl || this.properties.webUrl ? this.properties.webUrl : this.context.pageContext.web.absoluteUrl.toLocaleLowerCase().trim();
      this.properties.siteUrl = this.properties.siteUrl ? this.properties.siteUrl : this.context.pageContext.site.absoluteUrl.toLowerCase().trim();

      this.properties.speed = this.properties.speed || 3000;
      this.properties.height = this.properties.height || '400px';
      this.properties.width = this.properties.width || '100%';
      this.properties.centerSlidePercentage = this.properties.centerSlidePercentage || 100;

      resolve();
    });
  }

  private loadQueryContext(querySettings: IQuerySettings, callTimeStamp: number): Promise<IContentQueryContext> {
    return this.ContentQueryService.getContentQueryContext(querySettings, callTimeStamp);
  }

  public render(): void {
    let querySettings: IQuerySettings = {
      webUrl: this.properties.webUrl,
      listId: this.properties.listId,
      legend: this.properties.legend,
      filters: this.properties.filters,
      itemLimit:0
    };

    const element: React.ReactElement<IImageCarouselProps> = React.createElement(ImageCarousel,
      {
        onLoadQueryContext: this.loadQueryContext.bind(this),
        siteUrl: this.properties.siteUrl,
        querySettings: querySettings,
        wpContext: this.context,
        strings: strings.contentQueryStrings as IContentQueryStrings,
        themeVariant: this._themeVariant,
        autoPlay: this.properties.autoPlay,
        showIndicators: this.properties.showIndicators,
        stopOnHover: this.properties.stopOnHover,
        showThumbs: this.properties.showThumbs,
        showArrows: this.properties.showArrows,
        speed: parseInt('' + this.properties.speed),
        height: this.properties.height,
        width: this.properties.width,
        legend: this.properties.legend,
        displayMode:this.displayMode,
        centerSlidePercentage:this.properties.centerSlidePercentage
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /***************************************************************************
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   ***************************************************************************/
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let firstCascadingLevelDisabled = !this.properties.siteUrl;
    let secondCascadingLevelDisabled = !this.properties.siteUrl || !this.properties.webUrl;
    let thirdCascadingLevelDisabled = !this.properties.siteUrl || !this.properties.webUrl || !this.properties.listId;

    // Creates a custom PropertyPaneAsyncDropdown for the siteUrl property
    this.siteUrlDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertySiteUrl, {
      label: strings.SiteUrlFieldLabel,
      loadingLabel: strings.SiteUrlFieldLoadingLabel,
      errorLabelFormat: strings.SiteUrlFieldLoadingError,
      loadOptions: this.loadSiteUrlOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.siteUrl || ""
    });

    // Creates a custom PropertyPaneAsyncDropdown for the webUrl property
    this.webUrlDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertyWebUrl, {
      label: strings.WebUrlFieldLabel,
      loadingLabel: strings.WebUrlFieldLoadingLabel,
      errorLabelFormat: strings.WebUrlFieldLoadingError,
      loadOptions: this.loadWebUrlOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.webUrl || "",
      disabled: firstCascadingLevelDisabled
    });

    // Creates a custom PropertyPaneAsyncDropdown for the listId property
    this.listTitleDropdown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertyListId, {
      label: strings.ListTitleFieldLabel,
      loadingLabel: strings.ListTitleFieldLoadingLabel,
      errorLabelFormat: strings.ListTitleFieldLoadingError,
      loadOptions: this.loadListTitleOptions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.listId || "",
      disabled: secondCascadingLevelDisabled
    });

    // Creates a custom PropertyPaneQueryFilterPanel for the filters property
    this.filtersPanel = new PropertyPaneQueryFilterPanel(ContentQueryConstants.propertyFilters, {
      filters: this.properties.filters,
      loadFields: this.loadFilterFields.bind(this),
      onLoadTaxonomyPickerSuggestions: this.loadTaxonomyPickerSuggestions.bind(this),
      onLoadPeoplePickerSuggestions: this.loadPeoplePickerSuggestions.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      trimEmptyFiltersOnChange: true,
      disabled: thirdCascadingLevelDisabled,
      strings: strings.queryFilterPanelStrings
    });

    this.autoPlayToggle = PropertyPaneToggle(ContentQueryConstants.propertyAutoPlay, {
      label: strings.AutoPlayFieldLabel,
      offText: 'Off',
      onText: 'On'
    });

    this.showThumbsToggle = PropertyPaneToggle(ContentQueryConstants.propertyShowThumbs, {
      label: strings.ShowThumbsFieldLabel,
      offText: 'Off',
      onText: 'On'
    });

    this.showArrowsToggle = PropertyPaneToggle(ContentQueryConstants.propertyArrows, {
      label: strings.ShowArrowsFieldLabel,
      offText: 'Off',
      onText: 'On'
    });

    this.showIndicatorsToggle = PropertyPaneToggle(ContentQueryConstants.propertyShowIndicators, {
      label: strings.ShowIndicatosFieldLabel,
      offText: 'Off',
      onText: 'On'
    });

    this.stopOnHoverToggle = PropertyPaneToggle(ContentQueryConstants.propertyStopOnHover, {
      label: strings.StopOnHoverFieldLabel,
      offText: 'Off',
      onText: 'On'
    });

    this.speedTextField = PropertyPaneTextField(ContentQueryConstants.propertySpped, {
      label: strings.SpeedFieldLabel
    });

    this.popupHeightTextField = PropertyPaneTextField(ContentQueryConstants.propertyHeight, {
      label: strings.HeightFieldLabel,
      placeholder: Text.format(strings.InPixel, 'Height')
    });

    this.popupWidthTextField = PropertyPaneTextField(ContentQueryConstants.propertyWidth, {
      label: strings.WidthFieldLabel,
      placeholder: Text.format(strings.InPixel, 'Width')
    });

    this.centerSlidePercentageTextField = PropertyPaneTextField(ContentQueryConstants.propertyCenterSlidePercentage, {
      label: strings.CenterSlidePercentageFieldLabel,
      placeholder: strings.InPercentage
    });

    this.legendDropDown = new PropertyPaneAsyncDropdown(ContentQueryConstants.propertyLegend, {
      label: strings.LegendFieldLabel,
      loadingLabel: strings.LegendFieldLoadingLabel,
      errorLabelFormat: strings.WebUrlFieldLoadingError,
      loadOptions: this.loadViewFieldsItems.bind(this),
      onPropertyChange: this.onCustomPropertyPaneChange.bind(this),
      selectedKey: this.properties.legend || "",
      disabled: thirdCascadingLevelDisabled
    });

    return {
      pages: [
        {
          header: { description: strings.WebPartDescription },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.SourceGroupName,
              groupFields: [
                PropertyPaneLabel(ContentQueryConstants.propertySiteUrl, {
                  text: strings.SourcePageDescription
                }),
                this.siteUrlDropdown,
                this.webUrlDropdown,
                this.listTitleDropdown,
                this.filtersPanel
              ]
            },
            {
              groupName: strings.SliderProperties,
              groupFields: [
                PropertyPaneLabel(ContentQueryConstants.propertySliderProperties, {
                  text: strings.SliderPropertiesDescription
                }),
                this.legendDropDown,
                this.speedTextField,
                this.autoPlayToggle,
                this.showArrowsToggle,
                this.showIndicatorsToggle,
                this.showThumbsToggle,
                this.stopOnHoverToggle,
                this.popupHeightTextField,
                this.popupWidthTextField,
                this.centerSlidePercentageTextField
              ]
            }
          ]
        }
      ]
    };
  }

  
  /***************************************************************************
   * Loads the dropdown options for the webUrl property
   ***************************************************************************/
  private loadSiteUrlOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getSiteUrlOptions();
  }

  /***************************************************************************
   * Loads the dropdown options for the webUrl property
   ***************************************************************************/
  private loadWebUrlOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getWebUrlOptions(this.properties.siteUrl);
  }

  /***************************************************************************
   * Loads the dropdown options for the listTitle property
   ***************************************************************************/
  private loadListTitleOptions(): Promise<IDropdownOption[]> {
    return this.ContentQueryService.getPictureListTitleOptions(this.properties.webUrl);
  }

  /***************************************************************************
   * Loads the dropdown options for the listTitle property
   ***************************************************************************/
  private loadFilterFields():Promise<IQueryFilterField[]> {
    return this.ContentQueryService.getFilterFields(this.properties.webUrl, this.properties.listId);
  }

  /***************************************************************************
  * Loads the checklist items for the viewFields property
  ***************************************************************************/
 private loadViewFieldsItems(): Promise<IDropdownOption[]> {
  return this.ContentQueryService.getViewFieldsDropdownOptionsItems(this.properties.webUrl, this.properties.listId);
}


  /***************************************************************************
   * Returns the user suggestions based on the user entered picker input
   * @param filterText : The filter specified by the user in the people picker
   * @param currentPersonas : The IPersonaProps already selected in the people picker
   * @param limitResults : The results limit if any
   ***************************************************************************/
  private loadPeoplePickerSuggestions(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number):Promise<IPersonaProps[]> {
    return this.ContentQueryService.getPeoplePickerSuggestions(this.properties.webUrl, filterText, currentPersonas, limitResults);
  }

  /***************************************************************************
   * Returns the taxonomy suggestions based on the user entered picker input
   * @param field : The taxonomy field from which to load the terms from
   * @param filterText : The filter specified by the user in the people picker
   * @param currentPersonas : The IPersonaProps already selected in the people picker
   * @param limitResults : The results limit if any
   ***************************************************************************/
  private loadTaxonomyPickerSuggestions(field: IQueryFilterField, filterText: string, currentTerms: ITag[]):Promise<ITag[]> {
    return this.ContentQueryService.getTaxonomyPickerSuggestions(this.properties.webUrl, this.properties.listId, field, filterText, currentTerms);
  }

  /***************************************************************************
   * When a custom property pane updates
   ***************************************************************************/
  private onCustomPropertyPaneChange(propertyPath: string, newValue: any): void {
    const oldValue = get(this.properties, propertyPath);

    // Stores the new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // Resets dependent property panes if needed
    this.resetDependentPropertyPanes(propertyPath);

    // Refreshes the web part manually because custom fields don't update since sp-webpart-base@1.1.1
    // https://github.com/SharePoint/sp-dev-docs/issues/594
    if (!this.disableReactivePropertyChanges)
      this.render();
  }


 /***************************************************************************
   * Resets dependent property panes if needed
   ***************************************************************************/
  private resetDependentPropertyPanes(propertyPath: string): void {
    if(propertyPath == ContentQueryConstants.propertySiteUrl) {
      this.resetWebUrlPropertyPane();
      this.resetListTitlePropertyPane();
      this.resetFiltersPropertyPane();
    }
    else if(propertyPath == ContentQueryConstants.propertyWebUrl) {
      this.resetListTitlePropertyPane();
      this.resetFiltersPropertyPane();
    }
    else if (propertyPath == ContentQueryConstants.propertyListId) {
      this.resetFiltersPropertyPane();
    }
  }

  /***************************************************************************
   * Resets the Filters property pane and re-renders it
   ***************************************************************************/
  private resetFiltersPropertyPane() {

    this.properties.filters = null;
    this.ContentQueryService.clearCachedFilterFields();
    update(this.properties, ContentQueryConstants.propertyFilters, (): any => { return this.properties.filters; });
    this.filtersPanel.properties.filters = null;
    this.filtersPanel.properties.disabled = isEmpty(this.properties.webUrl) || isEmpty(this.properties.listId);
    this.filtersPanel.render();
  }

  /***************************************************************************
   * Resets the List Title property pane and re-renders it
   ***************************************************************************/
  private resetWebUrlPropertyPane() {

    this.properties.webUrl = "";
    this.ContentQueryService.clearCachedWebUrlOptions();
    update(this.properties, ContentQueryConstants.propertyWebUrl, (): any => { return this.properties.webUrl; });
    this.webUrlDropdown.properties.selectedKey = "";
    this.webUrlDropdown.properties.disabled = isEmpty(this.properties.siteUrl);
    this.webUrlDropdown.render();
  }

  /***************************************************************************
   * Resets the List Title property pane and re-renders it
   ***************************************************************************/
  private resetListTitlePropertyPane() {

    this.properties.listId = null;
    this.ContentQueryService.clearCachedListTitleOptions();
    update(this.properties, ContentQueryConstants.propertyListId, (): any => { return this.properties.listId; });
    this.listTitleDropdown.properties.selectedKey = "";
    this.listTitleDropdown.properties.disabled = isEmpty(this.properties.webUrl);
    this.listTitleDropdown.render();
  }



}
