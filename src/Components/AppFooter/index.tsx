import { Layout } from 'antd';
import "./AppFooter.scss";

const { Footer } = Layout

const AppFooter = () => {
    return (
        <Footer className='mcs-footer'>
            <div>
                <span className='footer-left'><b>Tasken @ Opus Solution</b></span>
                <div className='footer-right'>
                    <span>EN</span>
                    <span>Website</span>
                    <span>Terms</span>
                    <span>About</span>
                </div>
            </div>

        </Footer>)
}

export default AppFooter;