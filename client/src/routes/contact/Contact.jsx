function Contact() {
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: '#f4f4f4',
        padding: "20px",
    };

    const formStyle = {
        backgroundColor: "rgba(255, 230, 0, 0.623)",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        width: "100%",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const headerStyle = {
        textAlign: "center",
        marginBottom: "20px",
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 style={headerStyle}>Contact Us</h2>
                <form>
                    <input type="text" placeholder="Name" style={inputStyle} />
                    <input type="email" placeholder="Email" style={inputStyle} />
                    <textarea placeholder="Message" rows="5" style={{...inputStyle, resize: "none"}} />
                    <button  style={buttonStyle}>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
