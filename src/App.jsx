import { useContext } from "react";
import styles from "./App.module.css"
import Header from "./components/Header"
import Main from "./components/Main"
import { AppContext } from "./context/AppContext";
export default function App() {

    const { mode, setMode } = useContext(AppContext);

    return (
        <>
            <div className={`${styles.container} ${mode === "light" ? styles.lightMode : null}`}>
                <div className={styles.main}>
                    <Header />
                    <Main />
                </div>
            </div>
        </>
    )
}