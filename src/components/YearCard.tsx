import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface YearCardProps {
  year: number;
  description: string;
  topicCount: number;
}

const YearCard = ({ year, description, topicCount }: YearCardProps) => {
  return (
    <Link
      to={`/ano/${year}`}
      className="group block rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
          {year}º
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{year}º Ano</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <span className="text-xs font-medium text-primary">{topicCount} temas disponíveis</span>
    </Link>
  );
};

export default YearCard;
