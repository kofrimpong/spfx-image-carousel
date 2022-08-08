import * as React from 'react';
// import { Carousel as ResponseCarousel } from "react-responsive-carousel";
import styles from '../webparts/imageCarousel/components/ImageCarousel.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
//@ts-ignore
const ResponseCarousel = React.lazy(() => import('react-responsive-carousel')
    .then(({ Carousel }) => ({ default: Carousel })));

export interface IReactCarouselProps {
    autoPlay: boolean
    showArrows: boolean
    showIndicators: boolean
    showThumbs: boolean
    stopOnHover: boolean
    speed: number
    width?: string
    height?: string
    items: any[]
    webUrl: string
    legend?: string
    showStatus?: boolean;
    centerSlidePercentage?: number;
}

export const ReactCarousel: React.FC<IReactCarouselProps> = (props) => {
    const getUrl = (elm) => {
        const listName = elm.FileDirRef.substring(elm.FileDirRef.lastIndexOf('/') + 1);
        return `${props.webUrl}/${listName}/${elm.FileLeafRef}`
    }
    if (props.items.length) {
        return (
            <React.Suspense fallback={<div>LOADING...</div>}>
                <ResponseCarousel
                    infiniteLoop={true}
                    swipeable={true}
                    autoPlay={props.autoPlay}
                    showArrows={props.showArrows}
                    showIndicators={props.showIndicators}
                    showThumbs={props.showThumbs}
                    stopOnHover={props.stopOnHover}
                    interval={props.speed}
                    centerSlidePercentage={props.centerSlidePercentage}
                    centerMode={parseInt(''+props.centerSlidePercentage) != 100}
                    width={props.width}>
                    {props.items.map((elm, index) =>
                        <div key={index} style={{ height: props.height }}>
                            <img src={getUrl(elm)} />
                            {props.legend && <p className={`legend ${styles.legend}`}>{elm[props.legend]}</p>}
                        </div>
                    )}
                </ResponseCarousel>
            </React.Suspense>
        );
    }
    return null;
}