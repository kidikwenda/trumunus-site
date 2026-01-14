"use client";

import { useEffect, useState } from "react";
import {  getCompetitionEditionById } from "../../../app/helpers/api";

interface CompetitionMatchesProps {
  id: string;
}

export function CompetitionEditionHeader({ id }: CompetitionMatchesProps) {
  const [competitionEdition, setCompetitionEdition] = useState<any>(null);
  const [bgColor, setBgColor] = useState<string>("rgba(0,0,0)");
  const [foreColor, setForeColor] = useState<string>("rgba(255,255,255)");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchMatches = async () => {

      try {

        const edition = await getCompetitionEditionById(id);

        if (isMounted) {
          setCompetitionEdition(edition);

        }
      } catch (err: any) {
        if (isMounted) {
        }
      } finally {
      }
    };

    fetchMatches();

    return () => { isMounted = false; };
  }, [id]);

  useEffect(() => {
    if (!competitionEdition) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = competitionEdition?.competition?.logo;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.round(r / pixelCount);
      g = Math.round(g / pixelCount);
      b = Math.round(b / pixelCount);

      const darkenRGB = (r: number, g: number, b: number, percent: number) => {
        const factor = 1 - percent;
        return `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`;
      };

      const lightenRGB = (r: number, g: number, b: number, percent: number) => {
        return `rgb(${Math.round(r + (255 - r) * percent)}, 
                    ${Math.round(g + (255 - g) * percent)}, 
                    ${Math.round(b + (255 - b) * percent)})`;
      };

      setBgColor(darkenRGB(r, g, b, 0.2));
      setForeColor(lightenRGB(r, g, b, 0.7));
    };
  }, [competitionEdition]);

  return competitionEdition && (
    <div
      className="fixed top-0 left-0 w-full flex flex-row items-center justify-between px-4 py-2 gap-4"
      style={{ backgroundColor: bgColor, color: foreColor, zIndex: 1000, height: 100, overflow: "hidden" }}
    >
      <img
        src={competitionEdition.competition?.logo}
        alt="Logo"
        style={{ width: '20%', objectFit: 'contain', borderRadius: '10%' }}
      />
      <div className="font-semibold text-lg items-end flex flex-col gap-2">
        <span>{competitionEdition.competition?.name} – {competitionEdition.name}</span>
        <span>{'Sorteio'}</span>
      </div>
    </div>
  );
}