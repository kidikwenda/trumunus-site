"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { matchImgBaseUrl } from "../../helpers/constants";
import { getMatchById } from "../../helpers/api";

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [match, setMatch] = useState<any | null>(null);
  const [finished, setFinished] = useState<boolean>(false);
  const [homeGoals, setHomeGoals] = useState<any[]>([]);
  const [awayGoals, setAwayGoals] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchMatchById = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_TRUMUNUS_API_URL;
        if (!baseUrl) throw new Error("URL da API não configurada");

        const data = (await getMatchById(id)) as any;

        setMatch(data);
        setFinished(data?.status == "FINISHED");

        const { HomeTeamScores, AwayTeamScores } = extractGoalScorers(data);
        setHomeGoals(HomeTeamScores);
        setAwayGoals(AwayTeamScores);

      } catch (err: any) {
        setError(err.message || "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchById();
  }, [id]);

  useEffect(() => {
    if (!match?.homeTeam?.name || !match?.awayTeam?.name) return;

    console.log(match)

    document.title = `${match.homeTeam.name} vs ${match.awayTeam.name} | ${match.competitionEdition?.competition?.name || "Trumunus"}`;
  }, [match]);

  const extractGoalScorers = (match: any) => {
    const homeTeamId = match.homeTeamId;
    const awayTeamId = match.awayTeamId;

    const HomeTeamScores: { player: string; minute: number }[] = [];
    const AwayTeamScores: { player: string; minute: number }[] = [];

    match.matchEvents?.forEach((event: any) => {
      const isGoal =
        event?.type?.code === "GOAL";

      if (!isGoal) return;

      const scorer = {
        player: event.player.name,
        minute: event.minute,
      };

      if (event.teamId == homeTeamId) {
        HomeTeamScores.push(scorer);
      }

      if (event.teamId == awayTeamId) {
        AwayTeamScores.push(scorer);
      }
    });

    return {
      HomeTeamScores,
      AwayTeamScores,
    };
  };


  return (
    <div
      className="w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${matchImgBaseUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/65" />

      {/* TERMINADO (TOPO FIXO) */}
      {finished ? (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="px-4 py-1 rounded-full
                           text-[11px] sm:text-xs uppercase tracking-widest
                           bg-red-600/20 text-red-400 font-semibold">
            Terminado
          </span>
        </div>
      ) : (
        match?.date && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <span className="px-4 py-1 rounded-full
                           text-[11px] sm:text-xs uppercase tracking-widest
                           bg-green-600/20 text-white font-semibold">
              {new Date(match?.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>)
      )}

      {/* CONTEÚDO CENTRAL */}
      <div className="relative z-10 flex items-center justify-center
                      gap-4 sm:gap-8 lg:gap-12 text-center w-full h-full text-white">

        {/* HOME TEAM */}
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          {match?.homeTeam?.logo && (
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28
                         rounded-full bg-white p-2 object-contain"
            />
          )}
          <span className="text-xs sm:text-sm lg:text-lg font-semibold max-w-[120px] sm:max-w-none">
            {match?.homeTeam?.name}
          </span>
          <ul className="space-y-1 text-[70%] sm:text-[70%]">
            {homeGoals.map((goal, index) => (
              <li key={index}>
                ⚽ {goal.player} — {goal.minute}'
              </li>
            ))}
          </ul>
        </div>

        {/* RESULTADO FIXO */}
        <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap">
          {finished && (
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {match?.homeTeamScore}
            </span>
          )}

          <span className="text-lg sm:text-xl lg:text-2xl font-bold opacity-80">
            VS
          </span>

          {finished && (
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {match?.awayTeamScore}
            </span>
          )}
        </div>

        {/* AWAY TEAM */}
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          {match?.awayTeam?.logo && (
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28
                         rounded-full bg-white p-2 object-contain"
            />
          )}
          <span className="text-xs sm:text-sm lg:text-lg font-semibold max-w-[120px] sm:max-w-none ">
            {match?.awayTeam?.name}
          </span>
          <ul className="space-y-1 text-[70%] sm:text-[70%]">
            {awayGoals.map((goal, index) => (
              <li key={index}>
                ⚽ {goal.player} — {goal.minute}'
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ESTÁDIO / LOCALIZAÇÃO (Fundo inferior) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <span className="flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full
                         text-[11px] sm:text-xs uppercase tracking-widest
                         bg-black/40 text-white font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400"
          >
            <path
              fillRule="evenodd"
              d="M12 2c-3.866 0-7 3.134-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate max-w-[180px] sm:max-w-xs">
            {match?.stadium?.name || "Estádio Desconhecido"}
          </span>
        </span>
      </div>
    </div>
  );
}
