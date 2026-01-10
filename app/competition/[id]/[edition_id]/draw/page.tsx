"use client";

import { CompetitionDraw } from "@/components/ui/CompetitionDraw";
import { useParams } from "next/navigation";

export default function Page() {
  const { id, edition_id } = useParams<{ id: string, edition_id: string }>();
  return <CompetitionDraw competitionId={id} competitionEditionId={edition_id} />;
}