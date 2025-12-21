"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCompetitionClassification } from "../../helpers/api";

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [competitionEdition, setCompetitionEdition] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCompetitionById = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_TRUMUNUS_API_URL;
        if (!baseUrl) throw new Error("URL da API não configurada");

        const data = (await getCompetitionClassification(id)) as any;

        console.log(data, Array.from(data).length);

        setGroups(data);
        if (Array.from(data).length > 0) setCompetitionEdition(data[0].competitionEdition);

      } catch (err: any) {
        setError(err.message || "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionById();
  }, [id]);

  useEffect(() => {
    if (!competitionEdition?.name) return;

    document.title = `Classificação | ${competitionEdition?.competition?.name} - ${competitionEdition?.name}`;
  }, [competitionEdition]);

  return (
    <div
      className="w-screen min-h-screen overflow-x-hidden"
      style={{
        background: `
        linear-gradient(
          180deg,
          #0a0a0a 0%,
          #120c08 25%,
          #1a120c 50%,
          #120c08 75%,
          #0a0a0a 100%
        )
      `,
      }}
    >
      {competitionEdition && (
        <div className="w-full h-12 bg-black/70 gap-2 backdrop-blur-md flex items-center justify-center z-20 text-white">
          <img
            src={competitionEdition?.competition?.logo}
            alt={competitionEdition?.competition?.name}
            className="w-5 h-5 rounded-full object-contain bg-white"
          />
          <span>{competitionEdition?.competition?.name} - {competitionEdition?.name}</span>
        </div>)}

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
          <span className="text-sm tracking-wide opacity-80">
            A carregar classificação…
          </span>
        </div>
      )}

      {/* ERRO */}
      {!loading && error && (
        <div className="flex items-center justify-center min-h-screen text-red-400">
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* CONTEÚDO */}
      {!loading &&
        !error &&
        groups?.map(
          (group, index) =>
            group.competitionEditionGroupTeams.length > 0 && (
              <div key={index} className="relative z-10 px-4 py-6 text-white">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">
                  {group.name}
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 px-2 text-left w-10">Pos</th>
                        <th className="py-2 px-3 text-left w-[45%]">Equipa</th>
                        <th className="py-2 px-2">Pts</th>
                        <th className="py-2 px-2">J</th>
                        <th className="py-2 px-2">V</th>
                        <th className="py-2 px-2">E</th>
                        <th className="py-2 px-2">D</th>
                        <th className="py-2 px-2">GM</th>
                        <th className="py-2 px-2">GS</th>
                        <th className="py-2 px-2">DG</th>
                      </tr>
                    </thead>

                    <tbody>
                      {group.competitionEditionGroupTeams.map(
                        (team: any, teamIndex: number) => (
                          <tr
                            key={teamIndex}
                            className={`
                            ${teamIndex % 2 === 0 ? "bg-white/5" : "bg-white/10"}
                            border-b border-white/10
                          `}
                          >
                            <td className="py-2 px-2 text-center">
                              {team.position}
                            </td>

                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={team.logo}
                                  alt={team.name}
                                  className="w-5 h-5 rounded-full object-contain bg-white"
                                />
                                <span className="truncate font-medium">
                                  {team.name}
                                </span>
                              </div>
                            </td>

                            <td className="py-2 px-2 text-center font-semibold">
                              {team.points}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {team.countMatches}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {team.won}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {Number(team.countMatches) -
                                Number(team.won) -
                                Number(team.lost)}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {team.lost}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {team.scoredGoals}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {team.concededGoals}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {Number(team.scoredGoals) -
                                Number(team.concededGoals)}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )
        )}

      {/* SEM DADOS */}
      {!loading && !error && (!groups || groups.length === 0) && (
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-white/80 text-sm">
            Sem dados disponíveis.
          </span>
        </div>
      )}
    </div>
  );

}
