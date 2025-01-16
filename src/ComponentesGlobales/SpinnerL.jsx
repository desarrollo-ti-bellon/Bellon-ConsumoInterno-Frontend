import Spinner from "react-bootstrap/Spinner";
export default function SpinnerL() {
    return (
        <>
            <div className="text-center loading-page d-flex flex-column justify-content-evenly">
                <div>
                    <Spinner animation="border" variant="primary" />
                    <h3 className="text-info pt-3 fw-normal">Preparándose...</h3>
                </div>
            </div>
        </>
    );
}
