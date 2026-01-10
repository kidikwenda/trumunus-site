"use client";

import { useEffect, useState } from "react";
import { getCompetitionEditionMatches, getClassificationByCompetitionEdition } from "../../../app/helpers/api";
import { GameRowWeb } from "@/components/ui/GameRowWeb";
import { CompetitionTableWeb } from "./CompetitionTableWeb";
import { CompetitionEditionHeader } from "./CompetitionEditionHeader";

interface CompetitionMatchesProps {
  competitionId: string;
  competitionEditionId: string;
}

export function CompetitionDraw({ competitionEditionId }: CompetitionMatchesProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchList, setMatchList] = useState<Map<string, any[]>>(new Map());
  const [table, setTable] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"tabela" | "jogos">("tabela");


  useEffect(() => {
    if (!competitionEditionId) return;

    let isMounted = true;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const matches = await getCompetitionEditionMatches(competitionEditionId);
        const __table = await getClassificationByCompetitionEdition(competitionEditionId);

        const structuredMatches = buildMatchListStructure(matches);

        if (isMounted) {
          setMatchList(structuredMatches);
          setTable(__table)

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
  }, [competitionEditionId]);


  return (
    <div className="w-screen min-h-screen bg-black pt-[110px] text-white">
      {/* HEADER */}
      <CompetitionEditionHeader id={competitionEditionId} />

      {/* TABS */}
      <div className="w-full flex border-b border-white/10 bg-black z-50">
        <button
          onClick={() => setActiveTab("tabela")}
          className={`flex-1 py-3 text-center text-sm font-semibold transition
      ${activeTab === "tabela"
              ? "text-white border-b-2 border-green-400"
              : "text-white/50"
            }`}
        >
          Tabela
        </button>

        <button
          onClick={() => setActiveTab("jogos")}
          className={`flex-1 py-3 text-center text-sm font-semibold transition
      ${activeTab === "jogos"
              ? "text-white border-b-2 border-green-400"
              : "text-white/50"
            }`}
        >
          Jogos
        </button>
      </div>
      {!loading && !error && activeTab === "jogos" && (
        <>
          {Array.from(matchList.keys()).map((key) =>
            Array.from(matchList.get(key) || []).length > 0 && (
              <div key={key} className="p-2">
                <div className="text-xs uppercase mb-3">
                  {new Date(key).toLocaleDateString("pt-PT", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                  })}
                </div>

                {Array.from(matchList.get(key) || []).map((match: any) => (
                  <div key={match.id} className="mb-4">
                    <i className="flex justify-center items-center opacity-70">{isNaN(match.phase) ? match.phase : `${match.phase}º jornada`}</i>
                    <GameRowWeb match={match} />
                  </div>
                ))}
              </div>
            )
          )}

          {matchList.size === 0 && (
            <div className="flex justify-center items-center h-[60vh] opacity-70">
              Nenhum jogo disponível.
            </div>
          )}
        </>
      )}

      {!loading && !error && activeTab === "tabela" && (
        <CompetitionTableWeb groups={table} />
      )}


      {/* LOADING */}
      {loading && <div className="flex justify-center items-center h-screen">A carregar jogos…</div>}

      {/* ERRO */}
      {!loading && error && (
        <div className="flex justify-center items-center h-screen text-red-400">{error}</div>
      )}


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