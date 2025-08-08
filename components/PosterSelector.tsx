"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const templates = [
  {
    id: "template-1",
    name: "Classic Blue",
    src: "/templates/template1.jpg",
  },
  {
    id: "template-2",
    name: "Modern Dark",
    src: "/templates/template2.jpg",
  },
  {
    id: "template-3",
    name: "Minimal Light",
    src: "/templates/template3.jpg",
  },
];

export default function PosterSelector({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (id: string) => void;
}) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-white mb-4">
        Select a Poster Template
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelected(template.id)}
            className={clsx(
              "cursor-pointer border rounded-md overflow-hidden transition hover:scale-[1.015]",
              selected === template.id
                ? "border-blue-500 shadow-lg"
                : "border-neutral-700"
            )}
          >
            <Image
              src={template.src}
              alt={template.name}
              width={400}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="px-3 py-2 bg-neutral-900 text-sm text-white font-medium">
              {template.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
