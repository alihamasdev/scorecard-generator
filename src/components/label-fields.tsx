"use client";

import { useId } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

export function InputLabel({ label, ...props }: React.ComponentProps<typeof Input> & { label: string }) {
	const id = useId();

	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} {...props} />
		</div>
	);
}

export function SliderLabel({ label, ...props }: React.ComponentProps<typeof Slider> & { label: string }) {
	const id = useId();

	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="flex items-center gap-x-5">
				<Slider id={id} {...props} />
				<p className="dark:bg-input/30 border-input flex h-9 min-w-10 items-center rounded-md border bg-transparent px-3 py-1 text-sm">
					{props.value}
				</p>
			</div>
		</div>
	);
}

interface ComboBoxLabel extends React.ComponentProps<typeof CommandItem> {
	label: string;
	players: string[];
}

export function ComboBoxLabel({ label, value, players, ...props }: ComboBoxLabel) {
	const id = useId();

	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn("w-full justify-between font-normal capitalize", !value && "text-muted-foreground")}
					>
						{value ? players.find((player) => player === value) : ""}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder="Search player..." className="h-9" />
						<CommandList>
							<CommandEmpty>No player found</CommandEmpty>
							<CommandGroup>
								{players.map((player) => (
									<CommandItem value={player} key={player} className="capitalize" {...props}>
										{player}
										<Check className={cn("ml-auto", player === value ? "opacity-100" : "opacity-0")} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
