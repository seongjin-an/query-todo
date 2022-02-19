export enum CountActionType{
    INCREASE, DECREASE
}
type PayloadType = number;
export interface CountAction{
    type: CountActionType;
    payload: PayloadType;
}
export interface CountState{
    count: number;
}
export const increaseAction = (type: CountActionType, payload:PayloadType): CountAction => {
    return {
        type,
        payload
    }
}
export const decreaseAction = (type: CountActionType, payload: PayloadType): CountAction => {
    return {
        type,
        payload
    }
}
export function counterReducer(state:CountState, action: CountAction){
    const { type, payload} = action;
    switch(type){
        case CountActionType.INCREASE:
            return{
                ...state,
                count: state.count + payload
            }
        case CountActionType.DECREASE:
            return{
                ...state,
                count: state.count - payload
            }
        default:
            return state;
    }
}
