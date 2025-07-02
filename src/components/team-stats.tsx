import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { type Team } from "@/components/types";

interface TeamStatsProps extends React.ComponentProps<"div"> {
	team1: Team;
	team2: Team;
}

export function TeamStats({ team1, team2, className, ...props }: TeamStatsProps) {
	const team1Color = "#D2D628";
	const team2Color = "#80B2D0";

	return (
		<div className={cn("grid h-full grid-rows-2 overflow-hidden rounded-lg bg-white", className)} {...props}>
			<div className="overflow-hidden text-black">
				<StatsHeader
					icon="bat"
					backgroundColor={team1Color}
					title={team1.allOut ? team1.score : `${team1.score}-${team1.wickets}`}
				/>
				<div className="grid">
					{team1.batters
						// .sort((a, b) => Number(a.runs) - Number(b.runs))
						.map(({ name, balls, runs, out }, idx) => (
							<div key={`${name}-${idx}`} className="grid grid-cols-[1fr_60px_50px] border-b border-black/50">
								<p className="text-gradient-end border-r border-black/50 px-2 py-1 text-left font-medium uppercase">
									{name}
								</p>
								<p className="text-gradient-end grid place-items-center border-r border-black/50 text-right font-bold">
									{runs}
									{!out && "*"}
								</p>
								<p className="text-gradient-end/80 grid place-items-center text-right">{balls}</p>
							</div>
						))}
				</div>
			</div>

			<div className="overflow-hidden text-black">
				<StatsHeader icon="ball" title={team1.overs} backgroundColor={team2Color} />
				<div className="grid">
					{team2.bowlers.map(({ name, wickets, runs, overs }, idx) => (
						<div key={`${name}-${idx}`} className="grid grid-cols-[1fr_60px_50px] border-b border-black/50">
							<p className="text-gradient-end border-r border-black/50 px-2 py-1 text-left font-medium uppercase">
								{name}
							</p>
							<p className="text-gradient-end grid place-items-center border-r border-black/50 text-right font-bold">{`${wickets}-${runs}`}</p>
							<p className="text-gradient-end/80 grid place-items-center text-right">{overs}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function StatsHeader({
	backgroundColor,
	title,
	icon
}: {
	backgroundColor: string;
	title: string;
	icon: "bat" | "ball";
}) {
	return (
		<div className="from-gradient-start to-gradient-end relative ml-5 flex h-10 items-center bg-linear-to-r">
			<Avatar
				className="absolute top-1/2 -left-5 size-10 -translate-y-1/2 border-2 border-white p-2"
				style={{ backgroundColor }}
			>
				<AvatarImage src={`${icon}.svg`} />
			</Avatar>
			<p className="w-full text-center text-2xl font-bold text-white">{title}</p>
		</div>
	);
}
