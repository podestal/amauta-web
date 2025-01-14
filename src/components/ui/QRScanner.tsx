import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import useLanguageStore from '../../hooks/store/useLanguageStore';
import Button from './Button';

type QRScannerProps = {
  onScanSuccess: (decodedText: string, stopScanner: any, resumeScanner: any) => void;
  onScanFailure?: (error: string) => void;
  selectedStatus: string;
  errorMessage?: string;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, selectedStatus, errorMessage }) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const lan = useLanguageStore((s) => s.lan);

  const stopScanner = async () => {
    if (html5QrcodeRef.current) {
      const state = html5QrcodeRef.current.getState();
      if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
        try {
          await html5QrcodeRef.current.pause();
          console.log('Scanner stopped and cleared.');
        } catch (error) {
          console.error('Failed to stop QR scanner:', error);
        }
      } else {
        console.warn('Scanner is not running or paused. No need to stop.');
      }
    }
  };

  const resumeScanner = async () => {
    if (html5QrcodeRef.current) {
      const state = html5QrcodeRef.current.getState();
      if (state === Html5QrcodeScannerState.PAUSED) {
        try {
          await html5QrcodeRef.current.resume();
          console.log('Scanner resumed.');
        } catch (error) {
          console.error('Failed to resume QR scanner:', error);
        }
      } else {
        console.warn('Scanner is not paused. Cannot resume.');
      }
    }
  };

  useEffect(() => {
    if (!isScannerActive || !scannerRef.current || html5QrcodeRef.current) return;

    const html5Qrcode = new Html5Qrcode('qr-reader');
    html5QrcodeRef.current = html5Qrcode;

    html5Qrcode
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        async (decodedText) => {
          if (isLocked) return;
          setIsLocked(true);
          setFeedbackMessage(lan === 'EN' ? 'QR Code Scanned Successfully!' : '¡Código QR escaneado con éxito!');

          try {
            await onScanSuccess(decodedText, stopScanner, resumeScanner);
          } catch (error) {
            console.error('Error during QR code processing:', error);
          } finally {
            setFeedbackMessage(null);
            setIsLocked(false);
          }
        },
        (errorMessage) => {
          if (onScanFailure && !isLocked) onScanFailure(errorMessage);
        }
      )
      .catch((error) => console.error('Failed to start QR scanner:', error));

  }, [isScannerActive, onScanSuccess, onScanFailure, isLocked, lan]);

  const toggleScanner = () => {
    if (isScannerActive) {
      stopScanner().then(() => setIsScannerActive(false));
    } else {
      setIsScannerActive(true);
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px] mb-6"></div>
      {errorMessage ? (
        <div className="text-red-600 font-semibold mb-4">{errorMessage}</div>
      ) : (
        feedbackMessage && <div className="text-green-600 font-semibold mb-4">{feedbackMessage}</div>
      )}
      <Button
        onClick={toggleScanner}
        disable={!selectedStatus || selectedStatus === '0'}
        label={
          isScannerActive
            ? lan === 'EN'
              ? 'Stop Scanner'
              : 'Apagar Scanner'
            : lan === 'EN'
            ? 'Start Scanner'
            : 'Encender Scanner'
        }
      />
    </div>
  );
};

export default QRScanner;
