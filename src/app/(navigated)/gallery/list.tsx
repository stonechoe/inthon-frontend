import React from "react";
import Image from "next/image";

interface Drawing {
  id: number;
  title: string;
  likes: number;
  imageUrl: string;
  description: string;
}

interface OverviewsProps {
  drawings: Drawing[];
}

const handleGalleryClick = (drawing: Drawing) => {
  const { id, imageUrl, title, likes, description } = drawing;

  // Pass values via query parameters (imageUrl passed as is)
  window.location.href = `/abstract?id=${id}&imageUrl=${imageUrl}&title=${encodeURIComponent(
    title
  )}&likes=${likes}&description=${description}`;
};

function Overviews({ drawings }: OverviewsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {drawings.map((drawing) => (
        <div
          key={drawing.id}
          className="border p-4 rounded-lg shadow-md"
          onClick={() => handleGalleryClick(drawing)}
        >
          <div className="relative w-full h-48">
            <Image
              src={drawing.imageUrl}
              alt="Gallery Drawing"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="mt-2 text-center">
            <h3 className="font-bold text-lg">{drawing.title}</h3>
            <div className="flex items-center justify-center mt-2">
              <span className="text-gray-500">💙 {drawing.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Overviews;
