"use client";

import { CompetitionMatches } from "@/components/ui/CompetitionMatches";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams<{ id: string }>();
  return <CompetitionMatches competitionId={id}/>;
}