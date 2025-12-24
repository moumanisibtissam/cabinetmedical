import { Link } from "react-router";
import Button from "../ui/Button";

export function Reassurace() {
	return (
		<section className="py-24 w-full bg-secondary/30">
			<div className="container mx-auto px-6 text-center">
				<div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
					<h2 className="text-3xl md:text-4xl font-bold">Prêt à moderniser votre pratique ?</h2>
					<p className="text-xl text-muted-foreground">
						Rejoignez la nouvelle ère de la gestion médicale avec notre solution sur mesure.
					</p>
					<div className="flex justify-center pt-4">
						<Link to="/dashboard">
							<Button size="lg" className="px-12 py-6 text-lg shadow-2xl bg-primary hover:bg-primary/90">
								Accéder à l'application maintenant
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>

	);
}

export default Reassurace;