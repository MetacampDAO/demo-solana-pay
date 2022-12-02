import QRCodeStyling from "@solana/qr-code-styling";
import React, { useEffect, useMemo, useRef, useState } from "react";

const QrInteractive = (props: any) => {
  const [QRCode, setQRCode] = useState<QRCodeStyling>();

  const generateQrCode = () => {
    const qrCode = new QRCodeStyling({
      type: "svg",
      data: `solana:${encodeURIComponent(
        `${process.env.PORT}/api/interactive`
      )}`,
      image: props.data.icon,
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

export async function getServerSideProps({ req, res }: any) {
  // Fetch data from external API
  const response = await fetch(`${process.env.PORT}/api/interactive`);
  const data = await response.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default QrInteractive;
