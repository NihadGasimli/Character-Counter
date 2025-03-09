import styles from "./header.module.css";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function Header() {

    const { mode, setMode } = useContext(AppContext);

    return (
        <>
            <div className={`${styles.container} ${mode === "light" ? styles.lightMode : null}`}>
                <header>
                    <div className={styles.logoAndText}>
                        <img src="./Logo.svg" className={styles.logo} />
                        <h1>Character Counter</h1>
                    </div>

                    <button className={styles.changeModeButton} onClick={() => { setMode(mode === "dark" ? "light" : "dark") }}><img className={styles.modeLogo} src={mode === "dark" ? "./light.svg" : "./dark.svg"} /></button>
                </header>
            </div >
        </>
    )
}