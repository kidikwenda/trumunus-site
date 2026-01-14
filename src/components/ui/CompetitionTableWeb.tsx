"use client";

import { useEffect, useState } from "react";

interface CompetitionMatchesProps {
  groups: any[];
}

export function CompetitionTableWeb({ groups }: CompetitionMatchesProps) {

  return (
    <div className="w-screen min-h-screen bg-black px-5">
      {groups?.length && groups?.map(
          (group:any, index:number) =>
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