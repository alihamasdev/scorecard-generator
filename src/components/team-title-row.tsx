export function TeamTitleRow({ name }: { name: string }) {
	return (
		<div className="relative w-full rounded-full bg-white p-1">
			<p className="text-gradient-end text-center text-2xl/13 font-bold uppercase">{name}</p>
		</div>
	);
}
