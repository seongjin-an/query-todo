import React, {Reducer, useReducer, useState} from "react";
import {CountAction, CountActionType, counterReducer, CountState, decreaseAction, increaseAction} from "./counter";

const Counter:React.FC = () => {
    // const [number, setNumber] = useState<number>(0)
    function init(initialCount: number){
        return {count: initialCount}
    }
    const [state, dispatch] = useReducer<Reducer<CountState, CountAction>, number>(counterReducer, 0, init)
    return(
        <>
            <h1>{state.count}</h1>
            <div>
                <button onClick={() => dispatch({type: CountActionType.DECREASE, payload: 2})}>-2</button>
                <button onClick={() => dispatch(increaseAction(CountActionType.INCREASE, 1))}>+1</button>
            </div>
        </>
    )
}
export default Counter