
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
];

function SimpleAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const color = AVATAR_COLORS[name.length % AVATAR_COLORS.length];
  return (
    <span
      className={`inline-flex justify-center items-center rounded-full h-14 w-14 md:h-16 md:w-16 ${color} font-bold shadow ring-2 ring-white text-xl md:text-2xl`}
    >
      {initials}
    </span>
  );
}

interface BlogPostHeroProps {
  title: string;
  author: string;
  category: string;
  views?: number;
  date?: string;
  excerpt?: string | null;
}

const HERO_IMAGE = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80";

const BlogPostHero: React.FC<BlogPostHeroProps> = ({
  title,
  author,
  category,
  views,
  date,
  excerpt,
}) => (
  <section className="relative w-full mb-10">
    {/* Cover: Image (NON modifiable pour la démo, ni cliquable, image douce) */}
    <div className="w-full h-60 md:h-80 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center mb-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 border">
      <img
        src={HERO_IMAGE}
        alt=""
        className="w-full h-full object-cover object-center animate-fade-in"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white/20 to-white/95"></div>
    </div>
    {/* Contenu flottant */}
    <div className="max-w-2xl mx-auto px-3 md:px-0 -mt-20 relative z-10 animate-fade-in">
      <div className="flex flex-col gap-3 items-center w-full">
        {/* Avatar & meta */}
        <div className="flex items-center gap-4">
          <SimpleAvatar name={author} />
          <div>
            <div className="font-semibold text-gray-900 text-lg">{author}</div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {date ??
                new Date().toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </div>
          </div>
          <Badge className="bg-red-100 text-red-800 border-red-200 px-3 text-sm ml-6">
            {category}
          </Badge>
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50 px-3 text-sm ml-0">
            {views?.toLocaleString() ?? 0} vues
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-center leading-tight tracking-tight mt-4">
          {title}
        </h1>
        {excerpt && (
          <blockquote className="mx-auto max-w-xl italic relative text-base text-blue-800 bg-blue-50 pl-6 pr-3 py-3 mb-3 border-l-4 border-blue-300 rounded overflow-hidden">
            <span className="block">{excerpt}</span>
            <span className="absolute left-1 top-2 text-2xl text-blue-200 opacity-40 select-none">
              “
            </span>
          </blockquote>
        )}
      </div>
    </div>
  </section>
);

export default BlogPostHero;
