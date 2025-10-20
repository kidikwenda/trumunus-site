"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RedirectPage() {
  const { link } = useParams<{ link: string }>();
  const [deepLink, setDeepLink] = useState<string | null>(null);

  useEffect(() => {
    // monta o deep link usando o parâmetro de rota
    const paramLink = Buffer.from(link, 'base64').toString('utf8') || "trumunus://open";
    console.clear()
    console.log(paramLink)
    setDeepLink(paramLink);
  }, [link]);

  useEffect(() => {
    if (!deepLink) return;

    try {
      const userAgent = navigator.userAgent || navigator.vendor;

      const androidLink = "https://play.google.com/store/apps/details?id=com.kidikwenda.trumunus";
      const iosLink = "https://apps.apple.com/app/idSEU_APP_ID";
      const webLink = window.location.origin;

      const isAndroid = /android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

      // if (isAndroid) {
      //   window.location.href = deepLink;
      //   setTimeout(() => {
      //     window.location.href = androidLink;
      //   }, 2000);
      // } else if (isIOS) {
      //   window.location.href = deepLink;
      //   setTimeout(() => {
      //     window.location.href = iosLink;
      //   }, 2000);
      // } else {
      //   window.location.href = webLink;
      // }
    } catch (error) {
      console.error("Erro no redirecionamento:", error);
    }
  }, [deepLink]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0E21]">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}