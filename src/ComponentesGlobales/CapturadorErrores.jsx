import { Component } from "react";
import { Container } from "react-bootstrap";

export class CapturadorErrores extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <h1>An error has occurred.</h1>
                    <p>Please try again later.</p>
                    <p>If the issue persists, please contact your system administrator.</p>
                    <p>Error details: {error.message}</p>
                    <p>Stack trace: {errorInfo.componentStack}</p>
                </Container>
            );
        }
        return this.props.children;
    }
}