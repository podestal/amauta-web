import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import useLanguageStore from '../../hooks/store/useLanguageStore';
import Button from './Button';

type QRScannerProps = {
  onScanSuccess: (decodedText: string, pauseScanner: any, resumeScanner: any, stopScanner: any) => void;
  onScanFailure?: (error: string) => void;
  errorMessage?: string;
  leftEarly?: boolean;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, errorMessage, leftEarly }) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const lan = useLanguageStore((s) => s.lan);
  const [isLoading, setIsLoading] = useState(false)

  const stopScanner = async () => {
    if (!html5QrcodeRef.current) return
    setIsLoading(true)
    try {
      await html5QrcodeRef.current.stop();
      await html5QrcodeRef.current.clear();
      html5QrcodeRef.current = null;
      setIsScannerActive(false);
      console.log('Scanner stopped and cleared.');
    } catch (error) {
      console.error('Failed to stop QR scanner:', error);
    } finally {
      setIsLoading(false)  
    }
  }

  const pauseScanner = async () => {
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


  const startScanner = async () => {
    if (!scannerRef.current) return;
    if (html5QrcodeRef.current) return; 

    setIsLoading(true)
    const html5Qrcode = new Html5Qrcode('qr-reader');
    html5QrcodeRef.current = html5Qrcode;

    try {
      await html5Qrcode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 180, height: 180 } },
        async (decodedText) => {
          if (isLocked) return;
          setIsLocked(true);
          try {
            await onScanSuccess(decodedText, pauseScanner, resumeScanner, stopScanner);
          } catch (error) {
            console.error('Error during QR code processing:', error);
          } finally {
            setIsLocked(false);
          }
        },
        (errorMessage) => {
          if (onScanFailure && !isLocked) {
            onScanFailure(errorMessage);
          }
        }
      );
      setIsScannerActive(true);
    } catch (error) {
      console.error('Failed to start QR scanner:', error);
    } finally {
      setIsLoading(false)
    }
  };

  const toggleScanner = () => {
    if (isScannerActive) {
      stopScanner().then(() => setIsScannerActive(false));
    } else {
      setIsScannerActive(true)
      startScanner()
    }
  };

  useEffect(() => {

    if (isScannerActive) {
      stopScanner()
    }
  }, [leftEarly, isScannerActive])

  return (
    <div className='w-full'>
      <div className='w-full flex justify-center items-center'>
        {errorMessage && <div className="text-red-600 font-semibold mb-4 absolute top-10 text-center">{errorMessage}</div>}
      </div>
      <div className="flex flex-col h-[220px] items-center my-8 relative">
        <>
        <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[220px] w-[220px] mb-12"></div>
        <div className='relative z-40'>
          <Button
            onClick={toggleScanner}
            loading={isLoading}
            minWidth
            // disable={!selectedStatus || selectedStatus === '0'}
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
        </>
      </div>
    </div>
  );
};

export default QRScanner;
