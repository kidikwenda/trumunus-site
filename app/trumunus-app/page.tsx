"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const [deepLink, setDeepLink] = useState<string | null>(null);

  useEffect(() => {
    const paramLink = searchParams.get("link") || "trumunus://open";
    setDeepLink(paramLink);
  }, [searchParams]);

  useEffect(() => {
    if (!deepLink) return;

    try {
      const userAgent = navigator.userAgent || navigator.vendor;

      const androidLink ="https://play.google.com/store/apps/details?id=com.kidikwenda.trumunus";
      const iosLink = "https://apps.apple.com/app/idSEU_APP_ID";
      const webLink = window.location.origin;

      const isAndroid = /android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

      if (isAndroid) {
        window.location.href = deepLink;
        setTimeout(() => {
          window.location.href = androidLink;
        }, 2000);
      } else if (isIOS) {
        window.location.href = deepLink;
        setTimeout(() => {
          window.location.href = iosLink;
        }, 2000);
      } else {
        window.location.href = webLink;
      }
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