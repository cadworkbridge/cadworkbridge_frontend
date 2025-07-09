'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const CardPage = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://cadworkbridge.fly.dev/cards/${id}/`)
                .then((response) => response.json())
                .then((data) => setCard(data))
                .catch((error) => console.error('Failed to fetch card:', error));
        }
    }, [id]);

    if (!card) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-semibold mb-6">{card.title}</h1>

            {card.image && (
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[400px] object-cover rounded-lg shadow mb-6"
                    onError={(e) => (e.target.src = '/default-image.jpg')}
                />
            )}

            <p className="text-lg text-gray-700 mb-6">{card.description}</p>

            <div className="space-x-4">
                {card.youtube_link && (
                    <a
                        href={card.youtube_link}
                        className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Watch Video
                    </a>
                )}
                {card.pdf_file && (
                    <a
                        href={card.pdf_file}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download PDF
                    </a>
                )}
                {card.extra_file && (
                    <a
                        href={card.extra_file}
                        className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Extra File
                    </a>
                )}
            </div>
        </div>
    );
};

export default CardPage;
