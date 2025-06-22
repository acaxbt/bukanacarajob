'use client'

import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const QrScanner = () => {
    const router = useRouter();

    useEffect(() => {
        let scanner: Html5QrcodeScanner | null = null;

        const onScanSuccess = (decodedText: string) => {
            // On success, navigate to the dashboard with the scanned data as a query param
            router.push(`/admin/dashboard?scannedData=${decodedText}`);
        };

        const onScanFailure = (error: string) => {
            // For this app, we can ignore "no QR code found" errors.
            // console.warn(`Code scan error = ${error}`);
        };

        // Ensure the element is in the DOM
        const qrCodeElement = document.getElementById(qrcodeRegionId);
        if (qrCodeElement && !scanner) {
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
            scanner?.clear().catch(error => {
                console.error("Failed to clear html5-qrcode-scanner.", error);
            });
        };
    }, [router]);

    return <div id={qrcodeRegionId} />;
};

export default QrScanner; 