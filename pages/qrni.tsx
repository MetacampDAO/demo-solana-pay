import QRCodeStyling from "@solana/qr-code-styling";
import React, { useEffect, useMemo, useRef, useState } from "react";

const QrNonInteractive = () => {
  const [QRCode, setQRCode] = useState<QRCodeStyling>();

  const generateQrCode = () => {
    const qrCode = new QRCodeStyling({
      type: "svg",
      data: `solana:DQUhSTCqyMYgFL7f3cA2vBimGWB5B8UTw9C92oV6ipFR?amount=0.01&label=metacamp&message=thank you!`,
      image:
        "https://uploads-ssl.webflow.com/628b99344f25667e77da83cf/62c3a8d3be46ba64d97c2f28_metcamp-256-logo.png",
      dotsOptions: {
        color: "black",
        type: "extra-rounded",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      backgroundOptions: {
        color: "none",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });
    setQRCode(qrCode);
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && QRCode) {
      ref.current.firstChild && ref.current.removeChild(ref.current.firstChild);
      QRCode.append(ref.current);
    }
  }, [ref, QRCode]);

  useMemo(() => {
    if (typeof window !== "undefined") {
      generateQrCode();
    }
  }, [typeof window]);

  return <div>{QRCode && <div ref={ref} />}</div>;
};

export default QrNonInteractive;
