'use client'

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

type QrScannerProps = {
  onScan: (result: string) => void;
};

const QrScanner = ({ onScan }: QrScannerProps) => {

    useEffect(() => {
        let scanner: Html5QrcodeScanner | null = null;

        const onScanSuccess = (decodedText: string) => {
            if (scanner) {
                scanner.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode-scanner.", error);
                });
            }
            onScan(decodedText);
        };

        const onScanFailure = () => {
            // Kita bisa abaikan error "QR code not found"
            // console.warn(`Code scan error = ${error}`);
        };
        
        // Pastikan elemen ada di DOM
        const qrCodeElement = document.getElementById(qrcodeRegionId);
        if (qrCodeElement && !qrCodeElement.hasChildNodes()) {
             scanner = new Html5QrcodeScanner(
                qrcodeRegionId,
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    experimentalFeatures: {
                        useBarCodeDetectorIfSupported: true,
                    },
                    rememberLastUsedCamera: true,
                },
                false // verbose
            );
            scanner.render(onScanSuccess, onScanFailure);
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode-scanner.", error);
                });
            }
        };
    }, [onScan]);

    return <div id={qrcodeRegionId} style={{ width: '100%', maxWidth: '500px', margin: 'auto' }} />;
};

export default QrScanner; 