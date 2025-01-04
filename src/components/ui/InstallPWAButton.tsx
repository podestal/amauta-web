import { useEffect, useState } from 'react';
import useLanguageStore from '../../hooks/store/useLanguageStore';
import Button from './Button';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const lan = useLanguageStore((s) => s.lan);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
    } else {
      alert(
        lan === 'EN'
          ? 'Install prompt is not available.'
          : 'El aviso de instalación no está disponible.'
      );
    }
  };

  return (
    <Button
      onClick={handleInstallClick}
      label={lan === 'EN' ? 'Install App' : 'Instalar App'}
    />
  );
};

export default InstallPWAButton;
