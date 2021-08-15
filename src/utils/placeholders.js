import {TextRow} from "react-placeholder/lib/placeholders";
import ReactPlaceholder from "react-placeholder";

const CustomTextPlaceHolder = ({labelHeight, labelWidth}) => {
  return (
    <>
      <TextRow showLoadingAnimation color={"#d2d2d2"} style={{height: labelHeight, width: labelWidth}}
               className='show-loading-animation mt-0'/>
    </>
  )
};

export const TextPlaceHolder = ({labelWidth, labelHeight, children, ...props}) => <ReactPlaceholder
  customPlaceholder={<CustomTextPlaceHolder labelHeight={labelHeight} labelWidth={labelWidth}/>}
  delay={200} {...props}>{children}</ReactPlaceholder>;
