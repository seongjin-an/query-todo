import React from "react";
import Mouse, {ICoord} from "./Mouse";

interface IOptions {

}

export interface IMouseComponentProps {
    mouse: ICoord
}

export interface IExternalProps {

}

const withMouse = ({}: IOptions = {}) =>
<TOriginalProps extends {}>(WrappedComponent: React.ComponentClass<TOriginalProps & IMouseComponentProps> | React.FunctionComponent<TOriginalProps & IMouseComponentProps>) => {
    type ResultProps = TOriginalProps & IExternalProps
    const IntermeidateComponent: React.FC<ResultProps> = (props) => {
        return (
            <Mouse render={(mouse) => <WrappedComponent {...props} mouse={mouse}/>}/>
        )
    }
    return IntermeidateComponent
}

export default withMouse