import './ErrorPage.css'; // Import a CSS file for styling

function ErrorPage() {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-title">404</h1>
                <p className="error-message">Oops! The page you’re looking for doesn’t exist.</p>
                <a href="/" className="error-link">Back to Home</a>
            </div>
        </div>
    );
}

export default ErrorPage;
