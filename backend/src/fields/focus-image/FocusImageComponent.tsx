import React, { useState, useEffect } from "react";
import { useFormFields, useForm } from "payload/components/forms";
import { useConfig } from 'payload/components/utilities';
import "./FocusImage.scss";

type Props = { label: string, path: string, required: boolean };

export const FocusImageComponent: React.FC<Props> = ({ label, path, required }) => {
    const config = useConfig();
    const [imageUrl, setImageUrl]: [string, (value: string) => void] = useFormFields(([fields, dispatch]) => [
        fields[`url`].value as string, (value: string) => dispatch({ type: 'UPDATE', path: `url`, value: value })
    ]);

    const [x, setX]: [number, (value: number) => void] = useFormFields(([fields, dispatch]) => [
        fields[`focusX`].value as number, (value: number) => dispatch({ type: 'UPDATE', path: `focusX`, value: value })
    ]);
    const [y, setY]: [number, (value: number) => void] = useFormFields(([fields, dispatch]) => [
        fields[`focusY`].value as number, (value: number) => dispatch({ type: 'UPDATE', path: `focusY`, value: value })
    ]);

    const { setModified } = useForm();
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        if (!mouseDown) {
            window.removeEventListener('mouseup', handleMouseUp);
        }
    })

    const handleFocusChange = (e, drag = false) => {
        if (!e?.nativeEvent?.offsetY || !e?.nativeEvent?.offsetX) return;

        const focusOffset = [e.nativeEvent.offsetY, e.nativeEvent.offsetX];
        const imageSize = [e.target.clientHeight, e.target.clientWidth];
        const focusPointY = (((focusOffset[0]) / imageSize[0]) * 100).toFixed(3);
        const focusPointX = (((focusOffset[1]) / imageSize[1]) * 100).toFixed(3);

        setValues(Number(focusPointX), Number(focusPointY));
    }

    const handleMouseDown = (e) => {
        setMouseDown(true);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseUp = (e) => {
        setMouseDown(false);
    }

    const handleMouseMove = (e) => {
        if (mouseDown) {
            handleFocusChange(e);
        }
    }

    const setValues = (x: number, y: number) => {
        setX(x);
        setY(y);
        setModified(true);
    }


    return (
        <>
            {imageUrl &&
                <>
                    <div className="focus__heading">
                        <label className="field-label">Focus ({`X: ${x}%, Y: ${y}%`})</label>
                        <div className="focus__reset" onClick={() => setValues(50, 50)}>Reset Focus</div>
                    </div>
                    <figure className="focus__area">
                        <div className="focus__picker">
                            <img className="focus__picker__image" src={imageUrl as string} alt="" onClick={handleFocusChange} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} />
                            <span style={{ top: `${y}%`, left: `${x}%` }} className="focus__picker__indicator"></span>
                        </div>
                    </figure>
                </>
            }
        </>
    );
};