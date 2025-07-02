"use client";

import { Fragment, useState } from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TeamStats } from "@/components/team-stats";
import { TeamTitleRow } from "@/components/team-title-row";
import type { CanvasSetting, MatchInfo, Team } from "@/components/types";

export default function Page() {
	const [matchInfo, setMatchInfo] = useState<MatchInfo>({ title: "Match 01", result: "Team 1 won by 0 wickets" });
	const [canvasSetting, setCanvasSetting] = useState<CanvasSetting>({ padding: 155, backgroundOpacity: 0.45 });
	const [team1, setTeam1] = useState<Team>({
		name: "Team 1",
		score: "0",
		wickets: "0",
		overs: "0",
		allOut: false,
		batters: [
			{ name: "Player 1", runs: "0", balls: "0", out: true },
			{ name: "Player 2", runs: "0", balls: "0", out: true },
			{ name: "Player 3", runs: "0", balls: "0", out: false },
			{ name: "Player 4", runs: "0", balls: "0", out: false }
		],
		bowlers: [
			{ name: "Player 1", wickets: "0", runs: "0", overs: "1.0" },
			{ name: "Player 2", wickets: "0", runs: "0", overs: "1.0" },
			{ name: "Player 3", wickets: "0", runs: "0", overs: "1.0" },
			{ name: "Player 4", wickets: "0", runs: "0", overs: "1.0" }
		]
	});

	const [team2, setTeam2] = useState<Team>({
		name: "Team 2",
		score: "0",
		wickets: "0",
		overs: "0",
		allOut: false,
		batters: [
			{ name: "Player 1", runs: "0", balls: "0", out: true },
			{ name: "Player 2", runs: "0", balls: "0", out: true },
			{ name: "Player 3", runs: "0", balls: "0", out: false },
			{ name: "Player 4", runs: "0", balls: "0", out: false }
		],
		bowlers: [
			{ name: "Player 1", wickets: "0", runs: "0", overs: "1.0" },
			{ name: "Player 2", wickets: "0", runs: "0", overs: "1.0" },
			{ name: "Player 3", wickets: "0", runs: "0", overs: "1.0" },
			{ name: "Player 4", wickets: "0", runs: "0", overs: "1.0" }
		]
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
							paddingInline: canvasSetting.padding
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
		</Fragment>
	);
}
