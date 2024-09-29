import { useState } from "react";

import styles from "./App.module.css"

function App() {
    const [content, setContent] = useState("");
    const [isLowerCase, setIsLowerCase] = useState(true);

    function changeHandler(value: string | null) {
        if (isLowerCase) {
            if (value == "slice") {
                if (content[content.length - 1]) {
                    setContent(oldValue => oldValue.slice(0, content.length - 1));
                }
                return;
            } else if (value == "clear") {
                setContent(oldValue => "");
            } else {
                setContent(oldValue => oldValue + value?.toLowerCase());
            }
        } else {
            if (value == "slice") {
                if (content[content.length - 1]) {
                    setContent(oldValue => oldValue.slice(0, content.length - 1));
                }
                return;
            } else if (value == "clear") {
                setContent(oldValue => "");
            } else {
                setContent(oldValue => oldValue + value?.toUpperCase());
            }
        }
    }

    function handleChange(event:React.ChangeEvent<HTMLTextAreaElement>){
        changeHandler(event.target.value)
    }

    function setNormalValue(event: React.MouseEvent<HTMLButtonElement>) {
        const button = event.target as HTMLButtonElement;
        const content = button.textContent;
        changeHandler(content);
    }

    function changeCase() {
        if (isLowerCase) {
            setIsLowerCase(false);
        } else {
            setIsLowerCase(true);
        }
    }

    function addSpace() {
        changeHandler(" ");
    }

    function addEnter() {
        changeHandler("\n");
    }

    function removeLetter() {
        changeHandler("slice");
    }

    function onClear() {
        changeHandler("clear");
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.row14}>
                    <button onClick={onClear} className={styles.lightgrey}>Clear</button>
                    <button onClick={setNormalValue}>1</button>
                    <button onClick={setNormalValue}>2</button>
                    <button onClick={setNormalValue}>3</button>
                    <button onClick={setNormalValue}>4</button>
                    <button onClick={setNormalValue}>5</button>
                    <button onClick={setNormalValue}>6</button>
                    <button onClick={setNormalValue}>7</button>
                    <button onClick={setNormalValue}>8</button>
                    <button onClick={setNormalValue}>9</button>
                    <button onClick={setNormalValue}>0</button>
                    <button onClick={setNormalValue}>-</button>
                    <button onClick={setNormalValue}>+</button>
                    <button onClick={removeLetter} className={styles.lightgrey}>backspace</button>
                </div>
                <div className={styles.row14}>
                    <button onClick={setNormalValue}>q</button>
                    <button onClick={setNormalValue}>w</button>
                    <button onClick={setNormalValue}>e</button>
                    <button onClick={setNormalValue}>r</button>
                    <button onClick={setNormalValue}>t</button>
                    <button onClick={setNormalValue}>y</button>
                    <button onClick={setNormalValue}>u</button>
                    <button onClick={setNormalValue}>i</button>
                    <button onClick={setNormalValue}>o</button>
                    <button onClick={setNormalValue}>p</button>
                    <button onClick={setNormalValue}>?</button>
                    <button onClick={setNormalValue}>!</button>
                    <button onClick={addEnter} className={styles.lightgrey}>enter</button>
                </div>
                <div className={styles.row14}>
                    <button onClick={changeCase} className={styles.lightgrey}>caps lock</button>
                    <button onClick={setNormalValue}>a</button>
                    <button onClick={setNormalValue}>s</button>
                    <button onClick={setNormalValue}>d</button>
                    <button onClick={setNormalValue}>f</button>
                    <button onClick={setNormalValue}>g</button>
                    <button onClick={setNormalValue}>h</button>
                    <button onClick={setNormalValue}>j</button>
                    <button onClick={setNormalValue}>k</button>
                    <button onClick={setNormalValue}>l</button>
                    <button onClick={setNormalValue}>:</button>
                    <button onClick={setNormalValue}>'</button>
                    <button onClick={setNormalValue}>\</button>
                </div>
                <div className={styles.row12}>
                    <button onClick={setNormalValue}>z</button>
                    <button onClick={setNormalValue}>x</button>
                    <button onClick={setNormalValue}>c</button>
                    <button onClick={setNormalValue}>v</button>
                    <button onClick={setNormalValue}>b</button>
                    <button onClick={setNormalValue}>n</button>
                    <button onClick={setNormalValue}>m</button>
                    <button onClick={setNormalValue}>,</button>
                    <button onClick={setNormalValue}>.</button>
                    <button onClick={setNormalValue}>/</button>
                </div>
                <div className={styles.row7}>
                    <button onClick={addSpace} className={styles.space}> </button>
                </div>
            </div>
            <textarea name="text" value={content} onChange={handleChange} />
        </>
    )
}

export default App
