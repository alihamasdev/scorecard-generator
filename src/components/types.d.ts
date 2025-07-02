export interface Team {
	name: string;
	score: string;
	wickets: string;
	overs: string;
	allOut: boolean;
	players: string[];
	batters: BattingPlayer[];
	bowlers: BowlingPlayer[];
}

export interface BattingPlayer {
	name: string;
	runs: string;
	balls: string;
	out: boolean;
}

export interface BowlingPlayer {
	name: string;
	wickets: string;
	runs: string;
	overs: string;
}

export interface MatchInfo {
	title: string;
	result: string;
}

export interface CanvasSetting {
	padding: number;
	backgroundOpacity: number;
}
