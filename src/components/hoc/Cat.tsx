import React from "react";
import {IMouseComponentProps} from "./withMouse";
import {ICoord} from "./Mouse";

interface IProps {

}
const Cat: React.FC<IProps & IMouseComponentProps> = (props) => {
    const { mouse } = props
    return(
        <div
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: "pink",
                position: "absolute",
                left: mouse.x,
                top: mouse.y
            }}
        />
    )
}

export default Cat