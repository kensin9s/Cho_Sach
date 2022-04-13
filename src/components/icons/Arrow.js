import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Arrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      width={props.width}
      height={props.height}
      {...props}>
      <Path
        d="M17.0156 8.01562V9.98438H4.82812L10.4062 15.6094L9 17.0156L0.984375 9L9 0.984375L10.4062 2.39062L4.82812 8.01562H17.0156Z" 
        fill="#212529"
      />
    </Svg>
  );
}

export default Arrow;
