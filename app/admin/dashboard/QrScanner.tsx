'use client'

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

interface QrScannerProps {
    onScanSuccess: (decodedText: string, decodedResult: unknown) => void;
    onScanFailure: (error: string) => void;
}

const QrScanner = ({ onScanSuccess, onScanFailure }: QrScannerProps) => {
    const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        if (!scanner) {
            const qrScanner = new Html5QrcodeScanner(
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
            qrScanner.render(onScanSuccess, onScanFailure);
            setScanner(qrScanner);
        }

        return () => {
            scanner?.clear().catch(error => {
                console.error("Failed to clear html5-qrcode-scanner.", error);
            });
        };
    }, [onScanSuccess, onScanFailure, scanner]);

    return <div id={qrcodeRegionId} />;
};

export default QrScanner; 