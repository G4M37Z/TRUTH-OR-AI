
import React from 'react';
import type { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <footer className="absolute bottom-0 left-0 right-0 p-8 text-center text-ivory/50 font-sans text-sm z-20">
            <p className="mb-2">Truth or AI — Where curiosity meets chaos.</p>
            <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
                <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-gold transition-colors">About</a>
                <a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-gold transition-colors">Privacy Policy</a>
                <a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-gold transition-colors">Terms of Use</a>
                <a href="#" onClick={(e) => handleNavClick(e, 'cookies')} className="hover:text-gold transition-colors">Cookies Policy</a>
                <a href="#" onClick={(e) => handleNavClick(e, 'hall')} className="hover:text-gold transition-colors">The Hall of Chaos</a>
            </div>
        </footer>
    );
};

export default Footer;
