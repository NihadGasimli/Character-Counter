import { useContext, useEffect, useRef, useState } from "react";
import styles from "./body.module.css";
import { AppContext } from "../../context/AppContext";
import LetterDensity from "../LetterDensity";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export default function Main() {
    const [text, setText] = useState(null);
    const [totalCharacters, setTotalCharacters] = useState(null);
    const [wordCount, setWordCount] = useState(null);
    const [sentenceCount, setSentenceCount] = useState(null);
    const [limitChecked, setLimitChecked] = useState(false);
    const [spacesChecked, setSpacesChecked] = useState(false);
    const [limit, setLimit] = useState(null);
    const [limitError, setLimitError] = useState(false);

    const { mode, setMode } = useContext(AppContext);

    useEffect(() => {
        if (text) {
            if (spacesChecked) {
                setTotalCharacters(text?.split(" ").join("").length)
            }
            else {
                setTotalCharacters(text?.length)
            }
        }
        else {
            setTotalCharacters(null);
        }
    }, [text, spacesChecked, limitChecked])


    useEffect(() => {
        if (text) {
            setWordCount(text?.trim()
                .replace(/[.,!?;:(){}\[\]"'<>@#$%^&*+=_]/g, "") // Remove punctuation
                .split(/\s+/)
                .filter((word) => word.length > 0).length)
        }
        else {
            setWordCount(null)
        }
    }, [text, limitChecked]);


    useEffect(() => {
        if (text) {
            setSentenceCount(text?.split(/[.!?]+/).filter(sentence => sentence.trim() !== "").length)
        } else {
            setSentenceCount(null)
        }
    }, [text, limitChecked])


    useEffect(() => {
        if (limitChecked && limit) {
            if (totalCharacters > Number(limit)) {
                setLimitError(true);
            }
            else {
                setLimitError(false)
            }
        }
        else {
            setLimitError(false)
        }
    }, [text, limitChecked, spacesChecked, totalCharacters, limit])

    return (
        <>
            <div className={`${styles.container} ${mode === "light" ? styles.lightMode : null}`}>
                <h1>Analyze your text in real-time.</h1>
                <textarea onChange={(e) => { setText(e.target.value) }} placeholder="Start typing here...(or paste your text)" className={limitError ? `${styles.textArea} ${styles.errorTextArea}` : styles.textArea}></textarea>
                <div className={styles.errorDiv} style={{ display: `${limitError ? "flex" : "none"}` }}>
                    <img src="./error-circle.svg" className={styles.errorLogo} />
                    <p className={styles.limitError}>{limitError ? ` Limit reached! Your text exceeds ${limit} characters.` : null}</p>
                </div>
                <div className={styles.parametersDiv}>
                    <div className={styles.checkboxes}>
                        <div className={styles.spacesCheckbox}>
                            <input type="checkbox" className={styles.checkbox} checked={spacesChecked} onChange={(e) => { setSpacesChecked(e.target.checked) }} />
                            <p>Exclude Spaces</p>
                        </div>
                        <div className={styles.limitCheckbox}>
                            <input type="checkbox" className={styles.checkbox} checked={limitChecked} onChange={(e) => { setLimitChecked(e.target.checked) }} />
                            <p>Set charecter limit</p>
                            <input onChange={(e) => { setLimit(e.target.value) }} type="number" className={styles.limitInput} style={{ visibility: `${limitChecked ? "visible" : "hidden"}` }} />
                        </div>
                    </div>
                    <p className={styles.readingTimeText}>Approx. reading time: 0 minute</p>
                </div>

                <div className={styles.cards}>
                    <div className={styles.totalCard}>
                        <h3 className={styles.count}>{totalCharacters ? totalCharacters : "00"}</h3>
                        <p>Total Characters <span>{spacesChecked ? "(no space)" : null}</span></p>
                    </div>

                    <div className={styles.wordCard}>
                        <h3 className={styles.count}>{wordCount ? wordCount : "00"}</h3>
                        <p>Word Count</p>
                    </div>

                    <div className={styles.sentenceCard}>
                        <h3 className={styles.count}>{sentenceCount ? sentenceCount : "00"}</h3>
                        <p>Sentence Count</p>
                    </div>
                </div>

                <div className={styles.letterDensityDiv}>
                    <h2>Letter Density</h2>
                    <LetterDensity text={text} />
                </div>
            </div>
        </>
    )
}