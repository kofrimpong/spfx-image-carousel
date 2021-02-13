import * as React from 'react';
import { IPlaceholderProps } from './IPlaceholderComponent';
import styles from './PlaceholderComponent.module.scss';
import { IPlaceholderState } from '.';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

/**
 * Placeholder component
 */
export class Placeholder extends React.Component<IPlaceholderProps, IPlaceholderState> {
  private _crntElm: HTMLDivElement = null;

  /**
   * Constructor
   */
  constructor(props: IPlaceholderProps) {
    super(props);

    this.state = {
      width: null
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._setZoneWidth();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IPlaceholderProps, prevState: IPlaceholderState): void {
    this._setZoneWidth();
  }

  /**
   * shouldComponentUpdate lifecycle hook
   * @param nextProps
   * @param nextState
   */
  public shouldComponentUpdate(nextProps: IPlaceholderProps, nextState: IPlaceholderState): boolean {
    /*
    * compare the props object for changes in primative values
    * Return/re-render, bexeting the function, if the props change
    */
    for (const property in nextProps) {
      if (property != '_onConfigure') {
        if (nextProps[property] != this.props[property]) {
          return true;
        }
      }
    }
    return this.state.width !== nextState.width || this.props.hideButton !== nextProps.hideButton;
  }

  /**
   * Execute the onConfigure function
   */
  private _handleBtnClick = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    this.props.onConfigure();
  }

  /**
   * Set the current zone width
   */
  private _setZoneWidth = () => {
    this.setState({
      width: this._crntElm.clientWidth
    });
  }

  /**
   * Stores the current element
   */
  private _linkElm = (e: HTMLDivElement) => {
    this._crntElm = e;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPlaceholderProps> {
    return (
      <div className={`${styles.placeholder} ${this.props.contentClassName ? this.props.contentClassName : ''}`} ref={this._linkElm}>
        <div className={styles.placeholderContainer}>
          <div className={styles.placeholderHead}>
            <div className={styles.placeholderHeadContainer}>
              {
                this.props.iconName && <Icon iconName={this.props.iconName} className={styles.placeholderIcon} />
              }
              <span className={`${styles.placeholderText} ${(this.state.width && this.state.width <= 380) ? styles.hide : ""}`}>{this.props.iconText}</span>
            </div>
          </div>
          <div className={styles.placeholderDescription}>
            <span className={styles.placeholderDescriptionText}>{this.props.description}</span>
          </div>
          {this.props.children}
          <div className={styles.placeholderDescription}>
            {
              (this.props.buttonLabel && !this.props.hideButton) &&
              <PrimaryButton
                text={this.props.buttonLabel}
                ariaLabel={this.props.buttonLabel}
                ariaDescription={this.props.description}
                onClick={this._handleBtnClick} />
            }
          </div>
        </div>
      </div>
    );
  }
}



