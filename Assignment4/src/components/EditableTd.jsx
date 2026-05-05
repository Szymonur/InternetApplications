import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useLayoutEffect,
} from "react";
import styles from "./StoneTable.module.css";
import { FaPlusCircle } from "react-icons/fa";

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
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState([]);

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const keyPressEndEdit = useCallback((event) => {
        if (event.key === "Escape" || event.key === "Enter") {
            setInputMode(false);
            inputRef.current?.blur();
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (selectedImage) {
            URL.revokeObjectURL(selectedImage);
        }

        const newImageUrl = URL.createObjectURL(file);
        setSelectedImage(newImageUrl);

        updateField(id, field, newImageUrl);
        event.target.value = "";
    };

    const removeImage = (urlToRemove) => {
        URL.revokeObjectURL(urlToRemove);
    };
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

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleClick = () => {
        inputRef.current?.focus();
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const currentImageSrc = value || selectedImage;

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
                        const numericValue = parseFloat(inputValue);
                        if (!isNaN(numericValue)) {
                            const clampedValue = Math.min(
                                maxNumber,
                                Math.max(minNumber, numericValue),
                            );
                            setInputValue(clampedValue);
                            updateField(id, field, clampedValue);
                        } else {
                            setInputValue(value);
                        }
                    }}
                    onFocus={() => setInputMode(true)}
                />
            )}
            {type === "image" && (
                <div className={styles.imageCellContainer}>
                    {/* Ukryty input typu file */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {currentImageSrc.length > 0 ? (
                        <div
                            className={styles.imagePreviewWrapper}
                            onClick={triggerFileSelect}
                        >
                            <img
                                src={currentImageSrc}
                                alt="Kamień"
                                className={styles.tableImage}
                                title="Kliknij, aby zmienić zdjęcie"
                            />
                        </div>
                    ) : (
                        <FaPlusCircle
                            onClick={triggerFileSelect}
                            className="icon"
                        />
                    )}
                </div>
            )}
        </td>
    );
}

export default EditableTd;
