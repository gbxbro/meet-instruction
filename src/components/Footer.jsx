import { ReactComponent as LogoIcon } from "../assets/images/icons/logo.svg";
import { Container } from "@mui/material";

const Footer = ({isShowDrawer}) => {
    return (
        <footer className={`footer ${isShowDrawer ? 'footer_indent' : ''}`}>
            <Container className="footer__container">
                <div className="footer__inner">
                    <a className="footer__link footer__link_logo" href="/">
                        <LogoIcon className="footer__icon footer__icon_logo" />
                    </a>
                    <div className="footer__copyright">
                        <span>© 2021 – 2023 ООО “Центр”</span>
                        <span>Все права защищены</span>
                        <a className="footer__link" href="/">
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>
                <div className="footer__contacts">
                    <a className="footer__link" href="tel:+78432100480">
                        +7 (843) 210-0480
                    </a>
                    <a
                        className="footer__link"
                        href="mailto:market@mintconf.ru"
                    >
                        market@mintconf.ru
                    </a>
                </div>
                <div className="footer__apps">
                    <a
                        className="footer__link footer__link_app"
                        href="https://apps.apple.com/ru/app/id1555719113"
                    />
                    <a
                        className="footer__link footer__link_app"
                        href="https://play.google.com/store/apps/details?id=ru.cg.mint"
                    />
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
