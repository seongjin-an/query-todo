import React, {MouseEvent, useState} from "react";
export interface ICoord{
    x: number;
    y: number;
}
interface IProps{
    render: (coord: ICoord) => JSX.Element;
}
const Mouse: React.FC<IProps> = ({render}) => {
    const [mouse, setMouse] = useState<ICoord>({x: 0, y:0})
    const handleMouseMove = (event: MouseEvent) => {
        setMouse({x: event.clientX, y: event.clientY})
    }
    return(
        <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
            {render(mouse)}
        </div>
    )
}

export default Mouse