import React, { useState, useEffect, useContext } from "react";
import styles from "./LetterDensity.module.css"; // Import CSS Module
import { AppContext } from "../../context/AppContext";

const LetterDensity = ({ text = "" }) => { // Default value for text
    const [showAll, setShowAll] = useState(false);
    const [densityData, setDensityData] = useState([]);
    const { mode, setMode } = useContext(AppContext);


    useEffect(() => {
        const analyzeText = () => {
            if (!text) return []; // Ensure text is valid

            const lettersOnly = text.replace(/[^a-zA-Z]/g, "").toLowerCase();
            const totalLetters = lettersOnly.length;

            if (totalLetters === 0) return []; // Avoid division by zero

            const letterCount = {};
            for (let char of lettersOnly) {
                letterCount[char] = (letterCount[char] || 0) + 1;
            }

            return Object.entries(letterCount)
                .map(([letter, count]) => ({
                    letter,
                    count,
                    percentage: ((count / totalLetters) * 100).toFixed(2),
                }))
                .sort((a, b) => b.count - a.count);
        };

        setDensityData(analyzeText());
    }, [text]); // Recalculate when text changes

    const visibleData = showAll ? densityData : densityData.slice(0, 5);

    return (
        <div className={`${styles.container} ${mode === "light" ? styles.lightMode : null}`}>
            <div className={styles.letterList}>
                {visibleData.length > 0 ? (
                    visibleData.map(({ letter, count, percentage }) => (
                        <div key={letter} className={styles.letterItem}>
                            <span className={styles.letter}>{letter.toUpperCase()}</span>
                            <div className={styles.barContainer}>
                                <div className={styles.bar} style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className={styles.count}>{count}({percentage}%)</span>
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyMessage}>No characters found. Start typing to see letter density.</p>
                )}
            </div>

            {densityData.length > 5 && (
                <div className={styles.showMoreDiv}>
                    <button className={styles.showMoreBtn} onClick={() => setShowAll(!showAll)}>
                        {showAll ? `See Less` : `See More`}
                    </button>
                    <img src={showAll ? `./arrowLess.svg` : `./arrowMore.svg`} className={styles.arrow} />
                </div>

            )}
        </div>
    );
};

export default LetterDensity;
