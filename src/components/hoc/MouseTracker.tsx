import React from "react";
import withMouse from "./withMouse";
import Cat from './Cat'

const MouseTracker: React.FC = () => {
    const MouseWithCat = withMouse()(Cat)
    return(
        <div>
            <h1>Move the mouse around</h1>
            <MouseWithCat />
        </div>
    )
}
export default MouseTracker