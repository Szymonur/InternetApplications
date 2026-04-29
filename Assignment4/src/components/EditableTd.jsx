import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useLayoutEffect,
} from "react";
import styles from "./StoneTable.module.css";

function EditableTd({
    value,
    id,
    field,
    type = "text",
    minNumber = 0,
    maxNumber = 100,
    updateField,
}) {
    const [isInInputMode, setInputMode] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef(null);

    const keyPressEndEdit = useCallback((event) => {
        if (event.key === "Escape" || event.key === "Enter") {
            setInputMode(false);
            inputRef.current.blur();
        }
    }, []);

    const adjustHeight = useCallback(() => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", keyPressEndEdit, false);

        return () => {
            document.removeEventListener("keydown", keyPressEndEdit, false);
        };
    }, [keyPressEndEdit]);

    useLayoutEffect(() => {
        adjustHeight();
    }, [inputValue, adjustHeight]);

    const handleClick = () => {
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <td onClick={handleClick}>
            {type === "text" && (
                <textarea
                    wrap="soft"
                    rows="1"
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleChange}
                    type={type}
                    className={isInInputMode ? styles.inputMode : styles.tdMode}
                    onBlur={() => {
                        setInputMode(false);
                        updateField(id, field, inputValue);
                    }}
                    onFocus={() => setInputMode(true)}
                />
            )}
            {type === "number" && (
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleChange}
                    min={minNumber}
                    max={maxNumber}
                    type="number"
                    className={isInInputMode ? styles.inputMode : styles.tdMode}
                    onBlur={(e) => {
                        setInputMode(false);
                        if (value && !isNaN(value)) {
                            setInputValue(
                                Math.min(
                                    maxNumber,
                                    Math.max(minNumber, inputValue),
                                ),
                            );
                            updateField(id, field, inputValue);
                        }
                    }}
                    onFocus={() => setInputMode(true)}
                />
            )}
        </td>
    );
}

export default EditableTd;
