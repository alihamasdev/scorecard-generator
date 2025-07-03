"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ComboBoxLabel, InputLabel } from "@/components/label-fields";
import type { BattingPlayer, BowlingPlayer, Team } from "@/components/types";

interface TeamFormProps {
	team: Team;
	setTeamAction: React.Dispatch<React.SetStateAction<Team>>;
}

export function TeamForm({ team, setTeamAction }: TeamFormProps) {
	const updatePlayer = <T extends "batter" | "bowler">(
		index: number,
		type: T,
		field: T extends "batter" ? keyof BattingPlayer : keyof BowlingPlayer,
		value: string | boolean
	) => {
		if (type === "batter") {
			setTeamAction((prev) => ({
				...prev,
				batters: prev.batters.map((player, i) => (i === index ? { ...player, [field]: value } : player))
			}));
		} else {
			setTeamAction((prev) => ({
				...prev,
				bowlers: prev.bowlers.map((player, i) => (i === index ? { ...player, [field]: value } : player))
			}));
		}
	};

	const addPlayer = (type: "batter" | "bowler") => {
		if (type === "batter") {
			setTeamAction((prev) => ({ ...prev, batters: [...prev.batters, { name: "", balls: "", runs: "", out: true }] }));
		} else {
			setTeamAction((prev) => ({
				...prev,
				bowlers: [...prev.bowlers, { name: "", overs: "1.0", runs: "", wickets: "" }]
			}));
		}
	};

	const removePlayer = (type: "batter" | "bowler", index: number) => {
		if (type === "batter") {
			setTeamAction((prev) => ({ ...prev, batters: prev.batters.filter((_player, idx) => index !== idx) }));
		} else {
			setTeamAction((prev) => ({ ...prev, bowlers: prev.bowlers.filter((_player, idx) => index !== idx) }));
		}
	};

	return (
		<div className="mt-4 flex flex-col gap-4">
			<div className="grid grid-cols-4 items-end gap-4">
				<InputLabel
					type="number"
					label="Score"
					value={team.score}
					onChange={(e) => setTeamAction((prev) => ({ ...prev, score: e.target.value }))}
				/>
				<InputLabel
					type="number"
					label="Wickets"
					value={team.wickets}
					onChange={(e) => setTeamAction((prev) => ({ ...prev, wickets: e.target.value }))}
				/>
				<InputLabel
					type="number"
					label="Overs"
					value={team.overs}
					onChange={(e) => setTeamAction((prev) => ({ ...prev, overs: e.target.value }))}
				/>
				<Toggle
					pressed={team.allOut}
					onPressedChange={(value) => setTeamAction((prev) => ({ ...prev, allOut: value }))}
				>
					All Out
				</Toggle>
			</div>

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-xl/9 font-bold">Batters</h2>
					<Button onClick={() => addPlayer("batter")}>
						<Plus />
						Add Batter
					</Button>
				</div>
				<Separator />
				{team.batters.map(({ name, balls, runs, out }, index) => (
					<div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_36px] items-end gap-4">
						<ComboBoxLabel
							label="Name"
							value={name}
							players={team.players}
							onSelect={(value) => updatePlayer(index, "batter", "name", value)}
						/>

						<InputLabel
							label="Runs"
							value={runs}
							onChange={(e) => updatePlayer(index, "batter", "runs", e.target.value)}
						/>
						<InputLabel
							label="Balls"
							value={balls}
							onChange={(e) => updatePlayer(index, "batter", "balls", e.target.value)}
						/>
						<Toggle pressed={out} onPressedChange={(value) => updatePlayer(index, "batter", "out", value)}>
							{out ? "Out" : "Not Out"}
						</Toggle>
						<Button size="icon" variant="secondary" onClick={() => removePlayer("batter", index)}>
							<X />
						</Button>
					</div>
				))}
			</div>

			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-xl/9 font-bold">Bowlers</h2>
					<Button onClick={() => addPlayer("bowler")}>
						<Plus />
						Add Bowler
					</Button>
				</div>
				<Separator />
				{team.bowlers.map(({ name, overs, runs, wickets }, index) => (
					<div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_36px] items-end gap-4">
						<ComboBoxLabel
							label="Name"
							value={name}
							players={team.players}
							onSelect={(value) => updatePlayer(index, "bowler", "name", value)}
						/>
						<InputLabel
							label="Overs"
							value={overs}
							onChange={(e) => updatePlayer(index, "bowler", "overs", e.target.value)}
						/>
						<InputLabel
							label="Runs"
							value={runs}
							onChange={(e) => updatePlayer(index, "bowler", "runs", e.target.value)}
						/>
						<InputLabel
							label="Wickets"
							value={wickets}
							onChange={(e) => updatePlayer(index, "bowler", "wickets", e.target.value)}
						/>
						<Button size="icon" variant="secondary" onClick={() => removePlayer("bowler", index)}>
							<X />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
