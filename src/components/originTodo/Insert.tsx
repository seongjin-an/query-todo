import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './Insert.scss';

interface IProps{
    onInsert: (text: string) => void;
}

const TodoInsert: React.FC<IProps> = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const onClick = useCallback(
        () => {
            onInsert(value)
            setValue('')
        },
        [onInsert, value]
    )

    return (
        <form className="TodoInsert">
            <input
                placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="button" onClick={onClick}>
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;