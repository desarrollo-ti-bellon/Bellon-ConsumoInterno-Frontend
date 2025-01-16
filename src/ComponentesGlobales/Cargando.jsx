import { useEffect, useState } from "react";
import BannerL from "./BannerL";
import SpinnerL from "./SpinnerL";

export default function Cargando() {
    const [timer, setTimer] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setTimer(false);
        }, 500);
    }, []);
    return <>{timer ? <BannerL /> : <SpinnerL />}</>;
}