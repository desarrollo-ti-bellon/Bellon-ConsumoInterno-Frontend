

import Logo from "../Archivos/Logos/BellonLogoPrincipal.png";

export default function BannerL() {
    return (
        <>
            <div className="text-center loading-page d-flex flex-column justify-content-evenly">
                <div>
                    <div>
                        <img src={Logo} alt="" className="loading-page-logo" />
                    </div>
                </div>
            </div>
        </>
    );
}
