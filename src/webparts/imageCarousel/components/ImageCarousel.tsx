import * as React from 'react';
import styles from './ImageCarousel.module.scss';
import { IImageCarouselProps } from './IImageCarouselProps';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { IMandatoryFieldsStatus } from '../../../common/constants/IMandatoryFieldsStatus';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Placeholder } from '../../../components/placeholder';
import { Text } from '@microsoft/sp-core-library';
import { IContentQueryContext } from '../../../common/services/IContentQueryContext';
import { ReactCarousel } from '../../../components/ReactCarousel';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import * as strings from 'ImageCarouselWebPartStrings';


export interface IImageCarouselState {
  loading: boolean;
  queryContext: IContentQueryContext;
  error: string;
}

export default class ImageCarousel extends React.Component<IImageCarouselProps, IImageCarouselState> {
  
    /*************************************************************************************
     * Component's constructor
     * @param props
     * @param state
     *************************************************************************************/
    constructor(props: IImageCarouselProps) {
      super(props);
      this.state = { loading: true, queryContext: null, error: null };
  }




  /*************************************************************************************
   * Returns whether all mandatory fields are configured or not
   *************************************************************************************/
  private getMandatoryFieldsStatus(): IMandatoryFieldsStatus {
      const needsSiteUrl: boolean = isEmpty(this.props.siteUrl);
      const needsWebUrl: boolean = isEmpty(this.props.querySettings.webUrl);
      const needsListId: boolean = isEmpty(this.props.querySettings.listId);

      const result: IMandatoryFieldsStatus = {
          needsSiteUrl,
          needsWebUrl,
          needsListId,
          allConfigured: !needsSiteUrl &&
              !needsWebUrl &&
              !needsListId
      };

      return result;
  }

  /*************************************************************************************
   * Called once after initial rendering
   *************************************************************************************/
  public componentDidMount(): void {
      this.loadQueryContext();
  }


  /*************************************************************************************
   * Loads the items asynchronously and wraps them into a context object for handlebars
   *************************************************************************************/
  private loadQueryContext() {

      if (this.getMandatoryFieldsStatus().allConfigured) {

          // Stores the current call timestamp locally
          let currentCallTimeStamp = new Date().valueOf();

          // Fires the async call with its associated timestamp
          this.props.onLoadQueryContext(this.props.querySettings, currentCallTimeStamp).then((templateContext: IContentQueryContext) => {
              this.setState({ loading: false, queryContext: templateContext, error: null });

          })
              .catch((error) => {
                  this.setState({ loading: false, queryContext: null, error: Text.format(this.props.strings.errorLoadingQuery, error.message || error) });
              });
      }
      else {
          this.setState({ loading: false, queryContext: null, error: null });
      }
  }


  /*************************************************************************************
   * Renders the Content by Query WebPart
   *************************************************************************************/
  public render() {
      const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

      const loading: JSX.Element = this.state.loading ? <Spinner label={this.props.strings.loadingItems} /> : <div />;
      const error: JSX.Element = this.state.error ? <div className={styles.cqwpError}>{this.state.error}</div> : <div />;
      const mandatoryFieldsConfigured: IMandatoryFieldsStatus = this.getMandatoryFieldsStatus();
      const context = this.state.queryContext;
      const {
          needsSiteUrl,
          needsWebUrl,
          needsListId,
          allConfigured,
      } = mandatoryFieldsConfigured;
      if (!allConfigured) {
          return (
              <div className={styles.cqwp} style={{ backgroundColor: semanticColors.bodyBackground }}>

                  {loading}

                  {error}

                  {/* Shows the validation checklist if mandatory properties aren't all configured */}
                  {!allConfigured && !this.state.loading && !this.state.error &&
                      <Placeholder iconName='Edit'
                          iconText={strings.PlaceholderIconText}
                          description={this.props.strings.mandatoryProperties}
                          buttonLabel={strings.PlaceholderButtonLabel}
                          onConfigure={this._onConfigure} >
                          <div className={styles.cqwpValidations}>
                              <Icon
                                  iconName={needsSiteUrl ? 'Cancel' : 'CheckMark'}
                                  className={needsSiteUrl ? styles.incomplete : styles.complete}
                                  title={needsSiteUrl ? strings.IncompleteLabel : strings.CompleteLabel} /> {strings.SiteUrlChecklistLabel}<br />
                              <Icon
                                  iconName={needsWebUrl ? 'Cancel' : 'CheckMark'}
                                  className={needsWebUrl ? styles.incomplete : styles.complete}
                                  title={needsWebUrl ? strings.IncompleteLabel : strings.CompleteLabel}
                              /> {strings.WebUrlChecklistLabel}<br />
                              <Icon
                                  iconName={needsListId ? 'Cancel' : 'CheckMark'}
                                  className={needsListId ? styles.incomplete : styles.complete}
                                  title={needsListId ? strings.IncompleteLabel : strings.CompleteLabel}
                              /> {strings.ListIdChecklistLabel}<br />
                          </div>

                      </Placeholder>
                  }

              </div>
          );
      }
      const items = context ? context.items : [];
      if (items.length == 0) {
          if (this.props.displayMode == DisplayMode.Edit) {
              return (
                  <Placeholder iconName='Info'
                      iconText={strings.NoItemToDisplay}
                      description={strings.NoItemToDisplayDespcription}
                  />
              )
          }
          return null;
      }
      return (
          <ReactCarousel
              autoPlay={this.props.autoPlay}
              showArrows={this.props.showArrows}
              showIndicators={this.props.showIndicators}
              showThumbs={this.props.showThumbs}
              stopOnHover={this.props.stopOnHover}
              speed={this.props.speed}
              width="100%"
              items={items}
              height={this.props.height}
              webUrl={context.webUrl}
              legend={this.props.legend}
              centerSlidePercentage={this.props.centerSlidePercentage} />
      );
  }

  private _onConfigure = () => {
      // Context of the web part
      this.props.wpContext.propertyPane.open();
  }
}
