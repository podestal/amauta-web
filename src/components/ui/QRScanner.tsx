// import React, { useEffect, useRef, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import useLanguageStore from '../../hooks/store/useLanguageStore';
// import Button from './Button';

// type QRScannerProps = {
//   onScanSuccess: (decodedText: string) => void;
//   onScanFailure?: (error: string) => void;
//   selectedStatus: string;
// };

// const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, selectedStatus }) => {
//   const scannerRef = useRef<HTMLDivElement | null>(null);
//   const [isScannerActive, setIsScannerActive] = useState(false);
//   const lan = useLanguageStore((s) => s.lan)

//   useEffect(() => {
//     if (!isScannerActive || !scannerRef.current) return;

//     const html5QrcodeScanner = new Html5QrcodeScanner(
//       'qr-reader',
//       {
//         fps: 10, 
//         qrbox: { width: 220, height: 220 },
//       },
//       false
//     );

//     html5QrcodeScanner.render(
//       (decodedText) => {
//         onScanSuccess(decodedText);
//       },
//       (errorMessage) => {
//         if (onScanFailure) onScanFailure(errorMessage);
//       }
//     );

//     return () => {
//       html5QrcodeScanner.clear().catch((error) => console.error('Failed to clear QR scanner:', error));
//     };
//   }, [isScannerActive, onScanSuccess, onScanFailure]);

//   const toggleScanner = () => {
//     setIsScannerActive((prev) => !prev);
//   };

//   return (
//     <div className="flex flex-col items-center my-8">
//       <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px] mb-6"></div>
//       <Button
//         onClick={toggleScanner}
//         disable={!selectedStatus || selectedStatus === '0'}
//         label= {isScannerActive ? `${lan === 'EN' ? 'Stop Scanner' : 'Apagar Scanner'}` : `${lan === 'EN' ? 'Start Scanner' : 'Encender Scanner'}`}
//       />
//     </div>
//   );
// };

// export default QRScanner;
// import React, { useEffect, useRef, useState } from 'react';
// import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
// import useLanguageStore from '../../hooks/store/useLanguageStore';
// import Button from './Button';

// type QRScannerProps = {
//   onScanSuccess: (decodedText: string) => void;
//   onScanFailure?: (error: string) => void;
//   selectedStatus: string;
// };

// const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, selectedStatus }) => {
//   const scannerRef = useRef<HTMLDivElement | null>(null);
//   const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
//   const [isScannerActive, setIsScannerActive] = useState(false);
//   const [isLocked, setIsLocked] = useState(false);
//   const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
//   const lan = useLanguageStore((s) => s.lan);

//   useEffect(() => {
//     if (!isScannerActive || !scannerRef.current) return;

//     const html5Qrcode = new Html5Qrcode('qr-reader');
//     html5QrcodeRef.current = html5Qrcode;

//     html5Qrcode
//       .start(
//         { facingMode: 'environment' }, // Access back camera
//         {
//           fps: 10,
//           qrbox: { width: 220, height: 220 },
//         },
//         (decodedText) => {
//           if (isLocked) return; // Prevent scanning if locked
//           setIsLocked(true); // Lock the scanner
//           setFeedbackMessage(lan === 'EN' ? 'QR Code Scanned Successfully!' : '¡Código QR escaneado con éxito!');

//           // Call the success handler
//           onScanSuccess(decodedText);

//           // Delay unlocking the scanner
//           setTimeout(() => {
//             setFeedbackMessage(null); // Clear feedback message
//             setIsLocked(false); // Unlock the scanner
//           }, 2000); // Adjust delay as needed (e.g., 2 seconds)
//         },
//         (errorMessage) => {
//           if (onScanFailure && !isLocked) onScanFailure(errorMessage);
//         }
//       )
//       .catch((error) => console.error('Failed to start QR scanner:', error));

//     return () => {
//       html5Qrcode
//         .stop()
//         .then(() => {
//           html5Qrcode.clear();
//           console.log('QR scanner stopped and cleared.');
//         })
//         .catch((error) => console.error('Failed to stop QR scanner:', error));
//     };
//   }, [isScannerActive, onScanSuccess, onScanFailure, isLocked, lan]);

//   const toggleScanner = () => {
//     if (isScannerActive) {
//       if (html5QrcodeRef.current) {
//         html5QrcodeRef.current
//           .stop()
//           .then(() => {
//             html5QrcodeRef.current?.clear();
//             console.log('Scanner stopped and camera released.');
//             setIsScannerActive(false);
//           })
//           .catch((error: any) => console.error('Failed to stop QR scanner:', error));
//       }
//     } else {
//       setIsScannerActive(true); // Activate the scanner
//     }
//   };

//   return (
//     <div className="flex flex-col items-center my-8">
//       <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px] mb-6"></div>
//       {feedbackMessage && (
//         <div className="text-green-600 font-semibold mb-4">
//           {feedbackMessage}
//         </div>
//       )}
//       <Button
//         onClick={toggleScanner}
//         disable={!selectedStatus || selectedStatus === '0'}
//         label={
//           isScannerActive
//             ? lan === 'EN'
//               ? 'Stop Scanner'
//               : 'Apagar Scanner'
//             : lan === 'EN'
//             ? 'Start Scanner'
//             : 'Encender Scanner'
//         }
//       />
//     </div>
//   );
// };

// export default QRScanner;

import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import useLanguageStore from '../../hooks/store/useLanguageStore';
import Button from './Button';

type QRScannerProps = {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: string) => void;
  selectedStatus: string;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, selectedStatus }) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const lan = useLanguageStore((s) => s.lan);

  useEffect(() => {
    if (!isScannerActive || !scannerRef.current) return;

    const html5Qrcode = new Html5Qrcode('qr-reader');
    html5QrcodeRef.current = html5Qrcode;

    html5Qrcode
      .start(
        { facingMode: 'environment' }, // Access back camera
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
        },
        (decodedText) => {
          if (isLocked) return; // Prevent scanning if locked
          setIsLocked(true); // Lock the scanner
          setFeedbackMessage(lan === 'EN' ? 'QR Code Scanned Successfully!' : '¡Código QR escaneado con éxito!');

          // Call the success handler
          onScanSuccess(decodedText);

          // Delay unlocking the scanner
          setTimeout(() => {
            setFeedbackMessage(null); // Clear feedback message
            setIsLocked(false); // Unlock the scanner
          }, 2000); // Adjust delay as needed (e.g., 2 seconds)
        },
        (errorMessage) => {
          if (onScanFailure && !isLocked) onScanFailure(errorMessage);
        }
      )
      .catch((error) => console.error('Failed to start QR scanner:', error));

    return () => {
      if (html5QrcodeRef.current) {
        const state = html5QrcodeRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
          html5QrcodeRef.current
            .stop()
            .then(() => {
              html5QrcodeRef.current?.clear();
              console.log('QR scanner stopped and cleared.');
            })
            .catch((error) => console.error('Failed to stop QR scanner:', error));
        }
      }
    };
  }, [isScannerActive, onScanSuccess, onScanFailure, isLocked, lan]);

  const toggleScanner = () => {
    if (isScannerActive) {
      if (html5QrcodeRef.current) {
        const state = html5QrcodeRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
          html5QrcodeRef.current
            .stop()
            .then(() => {
              html5QrcodeRef.current?.clear();
              console.log('Scanner stopped and camera released.');
              setIsScannerActive(false);
            })
            .catch((error: any) => console.error('Failed to stop QR scanner:', error));
        } else {
          console.warn('Scanner is not running, no need to stop.');
          setIsScannerActive(false);
        }
      } else {
        console.warn('No scanner instance found.');
        setIsScannerActive(false);
      }
    } else {
      setIsScannerActive(true); // Activate the scanner
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px] mb-6"></div>
      {feedbackMessage && (
        <div className="text-green-600 font-semibold mb-4">
          {feedbackMessage}
        </div>
      )}
      <Button
        onClick={toggleScanner}
        disable={selectedStatus === '0'}
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