"use client";

import { Fragment, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputLabel, SliderLabel } from "@/components/label-fields";
import { TeamForm } from "@/components/team-form";
import { TeamPlayersCard } from "@/components/team-players-card";
import { TeamStats } from "@/components/team-stats";
import { TeamTitleRow } from "@/components/team-title-row";
import type { CanvasSetting, MatchInfo, Team } from "@/components/types";

export default function Page() {
	const [matchInfo, setMatchInfo] = useState<MatchInfo>({ title: "Match 01", result: "Match result" });
	const [canvasSetting, setCanvasSetting] = useState<CanvasSetting>({ padding: 155, backgroundOpacity: 0.3 });
	const [team1, setTeam1] = useState<Team>({
		name: "Team 1",
		score: "0",
		wickets: "0",
		overs: "0",
		allOut: false,
		players: [],
		batters: [],
		bowlers: [],
	});

	const [team2, setTeam2] = useState<Team>({
		name: "Team 2",
		score: "0",
		wickets: "0",
		overs: "0",
		allOut: false,
		players: [],
		batters: [],
		bowlers: [],
	});

	return (
		<Fragment>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={100}>
					<section
						className="relative mx-auto flex max-w-full items-center justify-center overflow-hidden rounded-2xl"
						style={{
							backgroundImage: "url(/lords.jpg)",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
							aspectRatio: 16 / 9,
							objectFit: "cover",
							paddingInline: canvasSetting.padding,
						}}
					>
						<div className="relative z-1 grid aspect-video w-full grid-cols-2 grid-rows-[44px_60px_1fr_60px] gap-x-3 gap-y-2">
							<div className="bg-gradient-end col-span-2 mx-auto w-fit rounded-full px-8 text-lg/11 font-bold text-white uppercase">
								{matchInfo.title}
							</div>
							<TeamTitleRow name={team1.name} />
							<TeamTitleRow name={team2.name} />
							<TeamStats team1={team1} team2={team2} className="ml-10" />
							<TeamStats team1={team2} team2={team1} className="mr-10" />
							<div className="col-span-2 h-15 w-full rounded-full bg-white p-1">
								<p className="text-gradient-end text-center text-2xl/13 font-bold uppercase">{matchInfo.result}</p>
							</div>
						</div>
						<div className="absolute inset-0 z-0 bg-black" style={{ opacity: canvasSetting.backgroundOpacity }} />
					</section>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<div />
				</ResizablePanel>
			</ResizablePanelGroup>

			<section className="mt-5 mb-10 grid w-full grid-cols-2 gap-5">
				<Card>
					<CardHeader>
						<CardTitle>Match Info</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<InputLabel
							label="Title"
							value={matchInfo.title}
							onChange={(e) => setMatchInfo((prev) => ({ ...prev, title: e.target.value }))}
						/>
						<InputLabel
							label="Result"
							value={matchInfo.result}
							onChange={(e) => setMatchInfo((prev) => ({ ...prev, result: e.target.value }))}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Canvas Setting</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<SliderLabel
							label="Padding"
							min={20}
							max={300}
							step={5}
							value={[canvasSetting.padding]}
							onValueChange={(value) => setCanvasSetting((prev) => ({ ...prev, padding: value[0] }))}
						/>
						<SliderLabel
							label="Background Opacity"
							min={0}
							max={1}
							step={0.01}
							value={[canvasSetting.backgroundOpacity]}
							onValueChange={(value) => setCanvasSetting((prev) => ({ ...prev, backgroundOpacity: value[0] }))}
						/>
					</CardContent>
				</Card>

				<TeamPlayersCard title="Team 1" team={team1} setTeamAction={setTeam1} />
				<TeamPlayersCard title="Team 2" team={team2} setTeamAction={setTeam2} />

				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Stats</CardTitle>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="team1" className="col-span-2 w-full">
							<div className="flex w-full justify-center">
								<TabsList className="w-full">
									<TabsTrigger value="team1" className="capitalize">
										{team1.name || "Team 1"}
									</TabsTrigger>
									<TabsTrigger value="team2" className="capitalize">
										{team2.name || "Team 2"}
									</TabsTrigger>
								</TabsList>
							</div>
							<TabsContent value="team1">
								<TeamForm team={team1} setTeamAction={setTeam1} />
							</TabsContent>
							<TabsContent value="team2">
								<TeamForm team={team2} setTeamAction={setTeam2} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</section>
		</Fragment>
	);
}
