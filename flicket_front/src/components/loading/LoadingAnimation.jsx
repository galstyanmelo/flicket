// ** React Imports
import { RotatingLines } from "react-loader-spinner";

// ** Style Components
import { CenteredAnimationContainer } from "../../style/Loading";


export function LoadingAnimation({ width, height }) {
  return (
    <CenteredAnimationContainer width={width} height={height}>
      <RotatingLines
        strokeColor="#c23939"
        strokeWidth="5"
        animationDuration="0.75"
        width="70"
        visible={true}
      />
    </CenteredAnimationContainer>
  );
}
