
const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} EasyBook. All rights reserved.</p>
            <div className="footer-links">
                <a href="#">Terms</a> | <a href="#">Privacy</a> | <a href="#">Contact</a>
            </div>
        </footer>
    )
}
export default Footer