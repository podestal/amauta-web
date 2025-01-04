import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import useLanguageStore from '../../hooks/store/useLanguageStore';
import Button from './Button';

type QRScannerProps = {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: string) => void;
  selectedStatus: string;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, selectedStatus }) => {
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
    <div className="flex flex-col items-center my-8">
      <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px] mb-6"></div>
      <Button
        onClick={toggleScanner}
        disable={!selectedStatus || selectedStatus === '0'}
        label= {isScannerActive ? `${lan === 'EN' ? 'Stop Scanner' : 'Apagar Scanner'}` : `${lan === 'EN' ? 'Start Scanner' : 'Encender Scanner'}`}
      />
    </div>
  );
};

export default QRScanner;
