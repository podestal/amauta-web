import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import useLanguageStore from '../../hooks/store/useLanguageStore';

type QRScannerProps = {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: string) => void;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const lan = useLanguageStore((s) => s.lan)

  useEffect(() => {
    if (!isScannerActive || !scannerRef.current) return;

    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10, 
        qrbox: { width: 220, height: 220 },
      },
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        if (onScanFailure) onScanFailure(errorMessage);
      }
    );

    return () => {
      html5QrcodeScanner.clear().catch((error) => console.error('Failed to clear QR scanner:', error));
    };
  }, [isScannerActive, onScanSuccess, onScanFailure]);

  const toggleScanner = () => {
    setIsScannerActive((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px]"></div>
      <button
        onClick={toggleScanner}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isScannerActive ? `${lan === 'EN' ? 'Stop Scanner' : 'Apagar Scanner'}` : `${lan === 'EN' ? 'Start Scanner' : 'Encender Scanner'}`}
      </button>
    </div>
  );
};

export default QRScanner;
