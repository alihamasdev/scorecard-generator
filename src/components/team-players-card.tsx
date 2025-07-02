"use client";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputLabel, TagsInputList } from "@/components/ui/tags-input";
import { InputLabel } from "@/components/label-fields";
import type { Team } from "@/components/types";

interface TeamPlayersCardProps {
	title: string;
	team: Team;
	setTeamAction: React.Dispatch<React.SetStateAction<Team>>;
}

export function TeamPlayersCard({ title, team, setTeamAction }: TeamPlayersCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<InputLabel
					label="Name"
					value={team.name}
					className="capitalize"
					onChange={(e) => setTeamAction((prev) => ({ ...prev, name: e.target.value }))}
				/>

				<TagsInput
					max={11}
					value={team.players}
					onValueChange={(players) => setTeamAction((prev) => ({ ...prev, players }))}
					onInvalid={(value) =>
						team.players.length >= 11
							? toast.error("Up to 11 players are allowed")
							: team.players.includes(value)
								? toast.error(`${value} already exists`)
								: toast.error(`${value} is not a valid player`)
					}
				>
					<TagsInputLabel>Players</TagsInputLabel>
					<TagsInputInput className="capitalize" placeholder="Add players..." />
					<TagsInputList className="border-none">
						{team.players.map((player) => (
							<TagsInputItem key={player} value={player} className="capitalize">
								{player}
							</TagsInputItem>
						))}
					</TagsInputList>
				</TagsInput>
			</CardContent>
		</Card>
	);
}
