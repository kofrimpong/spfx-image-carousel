define([], function() {
  return {
    WebPartDescription: "Use this web part for querying items within a site and display them easily using HandleBars templates.",
    TemplateChecklistLabel: "Specify a template / template URL",
    ViewFieldsChecklistLabel: "Select view fields",
    ListIdChecklistLabel: "Select the source list",
    WebUrlChecklistLabel: "Select a web url",
    SiteUrlChecklistLabel: "Select a source site",
    PlaceholderButtonLabel: "Configure",
    PlaceholderIconText: "Configure content query",
    SourcePageDescription: "Specify where we should get the results from.",
    QueryPageDescription: "If needed, choose the sorting behavior, limit the results, or add filters in order to narrow the query down.",
    DisplayPageDescription: "Specify which fields should be available for rendering within the HandleBars template, and edit your handlebars template.",
    SliderPropertiesDescription: "Specify properties for the slider.",
    SourceGroupName: "Source",
    QueryGroupName: "Filter and sort",
    DisplayGroupName: "Layout",
    SliderProperties: "Slider Properties",
    SiteUrlFieldLabel: "Site",
    SiteUrlFieldPlaceholder: "Select the source site...",
    SiteUrlFieldLoadingLabel: "Loading available site collections...",
    SiteUrlFieldLoadingError: "An error occurred while loading site collections: {0}",
    WebUrlFieldLabel: "Web URL",
    WebUrlFieldPlaceholder: "Select the source web...",
    WebUrlFieldLoadingLabel: "Loading webs from selected site...",
    WebUrlFieldLoadingError: "An error occurred while loading webs: {0}",
    ListTitleFieldLabel: "List",
    ListTitleFieldPlaceholder: "Select the source list...",
    ListTitleFieldLoadingLabel: "Loading lists from specified web...",
    ListTitleFieldLoadingError: "An error occurred while loading lists: {0}",
    OrderByFieldLabel: "Sort by",
    OrderByFieldLoadingLabel: "Loading fields from specified list...",
    OrderByFieldLoadingError: "An error occurred while loading fields: {0}",
    ConfigureItemSelectorLabel: "Configure item selector",
    ClearItemSelectorLabel: "Clear item selector",
    ConfigureItemSelectorDescriptionLabel: "By clicking on the 'Configure item selector' button, the ID field in the View Fields list will be forcibly selected.",
    ClearItemSelectorDescriptionLabel: "By clicking on the 'Clear item selector' button, the ID field in the View Fields list will be forcibly removed, if you did not select it explicitly.",
    LimitEnabledFieldLabel: "Limit the number of items to display",
    ItemLimitPlaceholder: "Enter a limit from 1 to 999",
    ErrorItemLimit: "Value must be a number between 1 to 999",
    RecursiveEnabledFieldLabel: "Search within folders",
    TemplateUrlFieldLabel: "Template URL",
    TemplateUrlPlaceholder: "Enter a valid HandleBars .htm file url",
    ExternalScriptsLabel: "External scripts",
    ExternalScriptsPlaceholder: "https://mysite.com/SiteAssets/library1.js\nhttps://mysite.com/SiteAssets/library2.js\nhttps://mysite.com/SiteAssets/mylogic.js\n...",
    ErrorTemplateExtension: "The template must be a valid .htm or .html file",
    ErrorTemplateResolve: "Unable to resolve the specified template: {0}",
    ErrorWebAccessDenied: "You do not have access to the previously configured web url '{0}'. Either leave the properties as is or select another web url.",
    ErrorWebNotFound: "The previously configured web url '{0}' is not found anymore. Either leave the properties as is or select another web url.",
    ErrorProcessingTemplate: "An error occurred while processing the handlebars template: {0}",
    ShowItemsAscending: "Show items in ascending order",
    ShowItemsDescending: "Show items in descending order",
    DynamicallyGeneratedTemplate: "Dynamically generated template",
    IncompleteLabel: 'Incomplete',
    CompleteLabel: 'Complete',
    queryFilterPanelStrings: {
      filtersLabel: "Filters",
      addFilterLabel: "Add filter",
      loadingFieldsLabel: "Loading fields from specified list...",
      loadingFieldsErrorLabel: "An error occured while loading fields: {0}",
      queryFilterStrings: {
        fieldLabel: "Field",
        fieldSelectLabel: "Select a field...",
        operatorLabel: "Operator",
        operatorEqualLabel: 'Equals',
        operatorNotEqualLabel: 'Does not equal',
        operatorGreaterLabel: 'Is greater than',
        operatorGreaterEqualLabel: 'Is greater or equal to',
        operatorLessLabel: 'Is less than',
        operatorLessEqualLabel: 'Is less or equal to',
        operatorContainsLabel: 'Contains',
        operatorBeginsWithLabel: 'Begins with',
        operatorContainsAnyLabel: 'Contains Any',
        operatorContainsAllLabel: 'Contains All',
        operatorIsNullLabel: 'Is Null',
        operatorIsNotNullLabel: 'Is Not Null',
        valueLabel: 'Value',
        andLabel: 'And',
        orLabel: 'Or',
        peoplePickerSuggestionHeader: 'Suggested People',
        peoplePickerNoResults: 'No results found',
        peoplePickerLoading: 'Loading users',
        peoplePickerMe: 'Me',
        taxonomyPickerSuggestionHeader: 'Suggested Terms',
        taxonomyPickerNoResults: 'No results found',
        taxonomyPickerLoading: 'Loading terms',
        datePickerLocale: 'en',
        datePickerFormat: 'MMM Do YYYY, hh:mm a',
        datePickerExpressionError: 'Expression must respect the following format: [Today] or [Today] +/- [digit]',
        datePickerDatePlaceholder: 'Select a date...',
        datePickerExpressionPlaceholder: 'Or enter a valid expression...',
        datePickerIncludeTime: 'Include time in query',
        datePickerStrings: {
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          goToToday: 'Go to today'
        }
      }
    },
    viewFieldsChecklistStrings: {
      label: 'View Fields',
      loading: 'Loading fields from specified list...',
      errorFormat: 'An error occurred while loading fields: {0}'
    },
    templateTextStrings: {
      dialogTitle: "Edit template content",
      dialogSubText: "Edit your handlebars template in this dialog. Note that the inline template specified within this dialog will be ignored if a template url is specified.",
      dialogButtonLabel: "Template",
      dialogButtonText: "Edit template content",
      dialogTextBoxPlaceholder: "Edit your handlebars template here...",
      saveButtonText: 'Save',
      cancelButtonText: 'Cancel'
    },
    contentQueryStrings: {
      loadingItems: 'Processing query',
      mandatoryProperties: 'Configure the following mandatory properties in order to display results:',
      errorLoadingQuery: 'An error occurred while processing the query: {0}',
      errorLoadingTemplate: 'An error occurred while loading the template:  {0}',
      errorProcessingTemplate: 'An error occurred while processing the handlebars template: {0}'
    },
    AutoPlayFieldLabel: "Auto Play",
    ShowThumbsFieldLabel: "Show Thumbs",
    ShowIndicatosFieldLabel: "Show Indicators",
    ShowArrowsFieldLabel: "Show Arrows",
    StopOnHoverFieldLabel: "Stop on hover",
    PopUpFieldLabel: "Render as PopUp",
    SpeedFieldLabel: "Speed",
    InPixel: "{0} in pixel",
    InPercentage:"In percentage",
    WidthFieldLabel: "Width",
    HeightFieldLabel: "Height",
    LegendFieldLabel: "Legend Field",
    LegendFieldLoadingLabel: "Loading fields from selected list...",
    LegendFieldPlaceholder: "Select the source field...",
    NoItemToDisplay:"No items to display",
    NoItemToDisplayDespcription:"In view mode, this area will be empty",
    CenterSlidePercentageFieldLabel:"Center Slide Percentage"
  }
});