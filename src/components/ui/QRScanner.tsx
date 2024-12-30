import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

type QRScannerProps = {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: string) => void;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

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
  }, [onScanSuccess, onScanFailure]);

  return <div id="qr-reader" ref={scannerRef} className="rounded-lg shadow-md h-[320px] w-[320px]"></div>;
};

export default QRScanner;

// import React, { useEffect, useRef, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// type QRScannerProps = {
//   onScanSuccess: (decodedText: string) => void;
//   onScanFailure?: (error: string) => void;
// };

// const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure }) => {
//   const scannerRef = useRef<HTMLDivElement | null>(null);
//   const [isScanned, setIsScanned] = useState(false);
//   const [scannedText, setScannedText] = useState<string | null>(null);

//   useEffect(() => {
//     if (!scannerRef.current) return;

//     const html5QrcodeScanner = new Html5QrcodeScanner(
//       'qr-reader',
//       {
//         fps: 2, 
//         qrbox: { width: 220, height: 220 }, 
//       },
//       true
//     );

//     html5QrcodeScanner.render(
//       (decodedText) => {
//         setIsScanned(true);
//         setScannedText(decodedText);
//         onScanSuccess(decodedText);

//         setTimeout(() => {
//           setIsScanned(false);
//           setScannedText(null);
//         }, 3000);
//       },
//       (errorMessage) => {
//         if (onScanFailure) onScanFailure(errorMessage);
//       }
//     );

//     return () => {
//       html5QrcodeScanner.clear().catch((error) =>
//         console.error('Failed to clear QR scanner:', error)
//       );
//     };
//   }, [onScanSuccess, onScanFailure]);

//   return (
//     <div
//       className={`relative h-[320px] w-[320px] rounded-lg shadow-md ${
//         isScanned ? 'bg-green-500' : ''
//       }`}
//     >
//       <div id="qr-reader" ref={scannerRef} className={`${isScanned ? 'opacity-0' : ''}`}></div>
//       {isScanned && (
//         <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
//           {scannedText}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRScanner;


// import React, { useEffect, useRef, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// type QRScannerProps = {
//   onScanSuccess: (decodedText: string) => void;
//   onScanFailure?: (error: string) => void;
//   startScanLabel?: string;
//   stopScanLabel?: string;
// };

// const QRScanner: React.FC<QRScannerProps> = ({
//   onScanSuccess,
//   onScanFailure,
//   startScanLabel = 'Empezar a Scanear',
//   stopScanLabel = 'Detener Scanner',
// }) => {
//   const scannerRef = useRef<HTMLDivElement | null>(null);
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [isScanned, setIsScanned] = useState(false);
//   const [scannedText, setScannedText] = useState<string | null>(null);
//   const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

//   useEffect(() => {
//     if (!scannerRef.current || isCameraActive) {
//       return;
//     }

//     html5QrcodeScannerRef.current = new Html5QrcodeScanner(
//       'qr-reader',
//       {
//         fps: 2, // Frames per second
//         qrbox: { width: 220, height: 220 }, // Scanning box dimensions
//       },
//       false
//     );

//     return () => {
//       if (html5QrcodeScannerRef.current) {
//         html5QrcodeScannerRef.current.clear().catch((error) => {
//           console.error('Failed to clear QR scanner:', error);
//         });
//         html5QrcodeScannerRef.current = null;
//       }
//     };
//   }, [isCameraActive]);

//   const handleStartStop = () => {
//     if (isCameraActive) {
//       html5QrcodeScannerRef.current?.clear().catch((error) => {
//         console.error('Failed to stop QR scanner:', error);
//       });
//       setIsCameraActive(false);
//     } else {
//       html5QrcodeScannerRef.current?.render(
//         (decodedText) => {
//           setIsScanned(true);
//           setScannedText(decodedText);
//           onScanSuccess(decodedText);

//           setTimeout(() => {
//             setIsScanned(false);
//             setScannedText(null);
//           }, 3000);
//         },
//         (errorMessage) => {
//           if (onScanFailure) onScanFailure(errorMessage);
//         }
//       );
//       setIsCameraActive(true);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className={`relative h-[320px] w-[320px] rounded-lg shadow-md ${
//           isScanned ? 'bg-green-500' : ''
//         }`}
//       >
//         <div
//           id="qr-reader"
//           ref={scannerRef}
//           className={`${isScanned || !isCameraActive ? 'opacity-0' : ''}`}
//         ></div>
//         {isScanned && (
//           <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
//             {scannedText}
//           </div>
//         )}
//       </div>
//       <button
//         onClick={handleStartStop}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
//       >
//         {isCameraActive ? stopScanLabel : startScanLabel}
//       </button>
//     </div>
//   );
// };

// export default QRScanner;
