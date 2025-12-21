"use client";

import { useEffect, useState } from "react";
import { getCompetitionCurrentMatches } from "../../../app/helpers/api";
import { GameRowWeb } from "@/components/ui/GameRowWeb";

interface CompetitionMatchesProps {
  competitionId: string;
  results?: boolean;
}

export function CompetitionMatches({ competitionId, results }: CompetitionMatchesProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchList, setMatchList] = useState<Map<string, any[]>>(new Map());
  const [competitionEdition, setCompetitionEdition] = useState<any>(null);
  const [phase, setPhase] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>("rgba(0,0,0)");
  const [foreColor, setForeColor] = useState<string>("rgba(255,255,255)");

  useEffect(() => {
    if (!competitionId) return;

    let isMounted = true;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getCompetitionCurrentMatches(competitionId, results);

        const matches = response?.data ?? [];

        if (!matches.length) {
          if (isMounted) {
            setMatchList(new Map());
            setCompetitionEdition(null);
            setPhase('');
          }
          return;
        }

        const firstCompetition = matches[0]?.competitions?.[0] ?? null;
        const structuredMatches = buildMatchListStructure(matches);

        const _phase = structuredMatches.values().next().value?.pop().phase ?? null;
        setPhase(isNaN(Number(_phase)) ? String(_phase) : `${_phase}ª Jornada`);

        if (isMounted) {
          setCompetitionEdition(firstCompetition);
          setMatchList(structuredMatches);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Erro inesperado");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMatches();

    return () => { isMounted = false; };
  }, [competitionId, results]);

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

  useEffect(() => {
    if (!competitionEdition?.name) return;
    document.title = `Jogos | ${competitionEdition.competition?.name} - ${competitionEdition.name}`;
  }, [competitionEdition]);

  return (
    <div className="w-screen min-h-screen bg-black pt-25">
      {/* HEADER */}
      {competitionEdition && (
        <div
          className="fixed top-0 left-0 w-full flex flex-row items-center justify-between px-4 py-2 gap-4"
          style={{ backgroundColor: bgColor, color: foreColor, zIndex: 1000 }}
        >
          <img
            src={competitionEdition.competition?.logo}
            alt="Logo"
            style={{ width: '20%', objectFit: 'contain', borderRadius: '10%' }}
          />
          <div className="font-semibold text-lg items-end flex flex-col gap-2">
            <span>{competitionEdition.competition?.name} – {competitionEdition.name}</span>
            <span>{phase}</span>
          </div>
        </div>
      )}

      <div className="px-4">
        {/* LOADING */}
        {loading && <div className="flex justify-center items-center h-screen">A carregar jogos…</div>}

        {/* ERRO */}
        {!loading && error && (
          <div className="flex justify-center items-center h-screen text-red-400">{error}</div>
        )}

        {/* LISTAGEM */}
        {!loading && !error &&
          Array.from(matchList.keys()).map((key) =>
            Array.from(matchList.get(key) || []).length > 0 && (
              <div key={key} className="px-1 py-1">
                <div className="text-center text-sm opacity-80 mb-3 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                  {key && new Date(key).toLocaleDateString("pt-PT", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                  })}
                </div>

                {Array.from(matchList.get(key) || []).map((match: any) => (
                  <div key={match.id} className="mb-6">
                    <GameRowWeb match={match} />
                  </div>
                ))}
              </div>
            )
          )}

        {!loading && !error && matchList.keys().toArray().length === 0 && (
          <div className="flex justify-center items-center h-screen text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
            Nenhum jogo disponível.
          </div>
        )}
      </div>
    </div>
  );
}

// Helper
type Match = {
  date: string | Date;
  competitions: { matches: any[] }[];
};

function buildMatchListStructure(matches: Match[]): Map<string, any[]> {
  const map = new Map<string, any[]>();
  for (const match of matches) {
    const dateKey = new Date(match.date).toISOString().split("T")[0];
    if (!map.has(dateKey)) map.set(dateKey, []);
    const dailyMatches = map.get(dateKey)!;
    for (const competition of match.competitions) {
      dailyMatches.push(...competition.matches);
    }
  }
  return map;
}