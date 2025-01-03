import React, { useEffect, useState } from 'react';

const InstallPWAButton: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Listen for the `beforeinstallprompt` event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault(); // Prevent the default mini-infobar
            setDeferredPrompt(e as BeforeInstallPromptEvent); // Save the event for later use
            setShowButton(true); // Show the install button
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Trigger the installation prompt
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        // Log the result of the user's choice
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Clear the deferred prompt after handling
        setDeferredPrompt(null);
        setShowButton(false);
    };

    return (
        <>
            {showButton && (
                <button
                    onClick={handleInstallClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
                >
                    Install App
                </button>
            )}
        </>
    );
};

export default InstallPWAButton;
