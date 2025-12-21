type Props = {
    match: any;
};

export function GameRowWeb({ match }: Props) {

    const renderStatus = () => {
        const score = `${match.homeTeamScore}-${match.awayTeamScore}`;

        switch (match.status) {
            case "RUNNING":
                return (
                    <div className="text-red-500 text-lg font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                        {score}
                    </div>
                );

            case "FINISHED":
                return (
                    <div className="flex flex-col items-center leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                        {/* ESTADO */}
                        <span className="text-[11px] text-red-500 font-medium">
                            Terminado
                        </span>
                        {/* SCORE */}
                        <span className="text-lg font-bold">
                            {score}
                        </span>
                    </div>

                );

            case "POSTPONED":
                return (
                    <div className="text-sm text-orange-400 ">
                        Adiado
                    </div>
                );

            case "SUSPENDED":
                return (
                    <div className="text-sm font-semibold text-gray-400 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                        Suspenso
                    </div>
                );

            case "SCHEDULED":
            default:
                return (
                    <div className="text-lg leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                        {new Date(match.date).toLocaleTimeString("pt-PT", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                );
        }
    };

    return (
        <div className="flex items-center justify-between bg-[#222] px-4 py-3 rounded-md mb-3 cursor-pointer hover:opacity-90 border border-gray-700">
            {/* HOME */}
            <div className="flex items-center gap-2 flex-1 justify-end ">
                <span className="text-xs text-right leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                    {match.homeTeamName}
                </span>
                {match.homeTeam?.logo && (
                    <img
                        src={match.homeTeam.logo}
                        alt=""
                        className="w-6 h-6 rounded-full"
                    />
                )}
            </div>

            {/* SCORE / STATUS */}
            <div className="flex flex-col items-center mx-4 w-16">
                {renderStatus()}
            </div>

            {/* AWAY */}
            <div className="flex items-center gap-2 flex-1 justify-start">
                {match.awayTeam?.logo && (
                    <img
                        src={match.awayTeam.logo}
                        alt=""
                        className="w-6 h-6 rounded-full"
                    />
                )}
                <span className="text-xs text-white">
                    {match.awayTeamName}
                </span>
            </div>
        </div>
    );
}