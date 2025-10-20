import React, { useState, useCallback, useEffect } from 'react';
import { GameState, ChallengeType, Page } from './types';
import { getChallenge } from './services/geminiService';
import Footer from './components/Footer';
import Logo from './components/Logo';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingSpinner from './components/LoadingSpinner';
import { RobotIcon } from './components/icons';
import { AboutPage, PrivacyPage, TermsPage, CookiesPage, HallOfChaosPage } from './components/StaticPages';


const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('home');
    const [challengeType, setChallengeType] = useState<ChallengeType | null>(null);
    const [challengeText, setChallengeText] = useState<string>('');
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>('game');

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) - 0.5;
            const y = (clientY / window.innerHeight) - 0.5;

            // Apply different strengths for each layer
            document.documentElement.style.setProperty('--mouse-x-sm', `${x * -20}px`);
            document.documentElement.style.setProperty('--mouse-y-sm', `${y * -20}px`);
            document.documentElement.style.setProperty('--mouse-x-md', `${x * -40}px`);
            document.documentElement.style.setProperty('--mouse-y-md', `${y * -40}px`);
            document.documentElement.style.setProperty('--mouse-x-lg', `${x * -60}px`);
            document.documentElement.style.setProperty('--mouse-y-lg', `${y * -60}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handlePlayClick = () => {
        setGameState('choosing');
    };

    const handleChoice = useCallback(async (type: ChallengeType) => {
        setGameState('loading');
        setChallengeType(type);
        setSubmitted(false);
        setUserAnswer('');
        const text = await getChallenge(type);
        setChallengeText(text);
        setGameState('challenge');
    }, []);

    const handlePlayAgain = () => {
        setGameState('choosing');
        setChallengeType(null);
        setChallengeText('');
        setUserAnswer('');
        setSubmitted(false);
    };
    
    const handleSubmitToHall = () => {
        setSubmitted(true);
    };

    const renderGameContent = () => {
        switch (gameState) {
            case 'home':
                return (
                    <div className="text-center animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-serif text-ivory mb-4">
                            Dare to play with intelligence?
                        </h1>
                        <p className="text-lg md:text-xl text-ivory/80 mb-12 max-w-2xl mx-auto">
                            Face the AI that knows your truths… or dares you to reveal them.
                        </p>
                        <button
                            onClick={handlePlayClick}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-charcoal bg-ivory rounded-md transition-all duration-300 ease-in-out hover-animate-glow"
                        >
                            PLAY TRUTH OR AI <RobotIcon className="w-6 h-6" />
                        </button>
                    </div>
                );
            case 'choosing':
                return (
                    <div className="text-center animate-fade-in">
                        <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-10">Truth or Dare?</h2>
                        <div className="flex gap-6 justify-center">
                            <button
                                onClick={() => handleChoice('truth')}
                                className="px-10 py-3 text-xl font-semibold text-ivory border-2 border-gold rounded-md hover:bg-gold hover:text-charcoal transition-all duration-300"
                            >
                                Truth
                            </button>
                            <button
                                onClick={() => handleChoice('dare')}
                                className="px-10 py-3 text-xl font-semibold text-ivory border-2 border-gold rounded-md hover:bg-gold hover:text-charcoal transition-all duration-300"
                            >
                                Dare
                            </button>
                        </div>
                    </div>
                );
            case 'loading':
                return (
                    <div className="text-center animate-fade-in flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                );
            case 'challenge':
                return (
                    <div className="w-full max-w-3xl text-center animate-fade-in-up">
                        <p className="text-lg text-gold font-serif mb-4 capitalize">{challengeType}</p>
                        <blockquote className="text-3xl md:text-5xl font-serif text-ivory mb-8 leading-tight">
                            “{challengeText}”
                        </blockquote>
                        
                        {submitted ? (
                             <div className="text-center text-gold animate-fade-in">
                                <p className="mb-6">Your response echoes in the Hall of Chaos.</p>
                                <button onClick={handlePlayAgain} className="px-8 py-3 text-lg font-semibold text-ivory border-2 border-ivory/50 rounded-md hover:bg-ivory hover:text-charcoal transition-all duration-300">
                                    Play Again
                                </button>
                            </div>
                        ) : (
                            <div className="w-full animate-fade-in">
                                {challengeType === 'truth' && (
                                    <textarea
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="Confess your truth..."
                                        className="w-full max-w-xl mx-auto block bg-charcoal border-2 border-ivory/30 rounded-md p-4 mb-6 text-ivory focus:border-gold focus:ring-gold transition-colors"
                                        rows={3}
                                    />
                                )}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={handleSubmitToHall}
                                        className="px-8 py-3 text-lg font-semibold bg-gold text-charcoal rounded-md hover:opacity-90 transition-opacity duration-300"
                                    >
                                        {challengeType === 'truth' ? 'Submit to the Hall' : 'I did it!'}
                                    </button>
                                    <button onClick={handlePlayAgain} className="px-8 py-3 text-lg font-semibold text-ivory border-2 border-ivory/50 rounded-md hover:bg-ivory hover:text-charcoal transition-all duration-300">
                                        Ask Another
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
        }
    };
    
    const renderPage = () => {
        switch (currentPage) {
            case 'about':
                return <AboutPage onBack={() => setCurrentPage('game')} />;
            case 'privacy':
                return <PrivacyPage onBack={() => setCurrentPage('game')} />;
            case 'terms':
                return <TermsPage onBack={() => setCurrentPage('game')} />;
            case 'cookies':
                return <CookiesPage onBack={() => setCurrentPage('game')} />;
            case 'hall':
                return <HallOfChaosPage onBack={() => setCurrentPage('game')} />;
            case 'game':
            default:
                return (
                     <main className="z-10 flex flex-col items-center justify-center flex-grow w-full px-4">
                        {gameState === 'home' && <Logo />}
                        {renderGameContent()}
                     </main>
                );
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-between min-h-screen bg-charcoal p-4 overflow-hidden">
             <AnimatedBackground />
             {currentPage !== 'game' && <Logo />}
             {renderPage()}
             <Footer onNavigate={setCurrentPage} />
        </div>
    );
};

export default App;