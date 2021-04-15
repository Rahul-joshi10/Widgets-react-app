import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) { //contains() belongs to all DOM elements. It allows us to check if a dom element is contained inside of other.
                return;
            }

            setOpen(false);

        };
        document.body.addEventListener('click', onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener('click', onBodyClick, { capture: true });
        }

    }, [])

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) { //Hides the selected option
            return null;
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                { option.label}
            </div >
        );
    })

    // console.log(ref.current);

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div
                        className={`menu ${open ? 'visible transition' : ''}`}
                    >
                        {renderedOptions}
                    </div>
                </div>
            </div>
            <h2 style={{ color: `${selected.value}` }}>{`Text language is ${selected.value}`}</h2>
        </div>
    );
}

export default Dropdown;