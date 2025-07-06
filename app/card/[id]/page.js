'use client';  // Add this directive at the top of the file to mark it as a client component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To access the dynamic route parameter (id)

const CardPage = () => {
    const { id } = useParams(); // Access the dynamic `id` from the URL
    const [card, setCard] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch card data based on the `id`
            fetch(`https://cadworkbridge.fly.dev/core_cards/${id}/`)
                .then((response) => response.json())
                .then((data) => setCard(data));  // Store the data in the state
        }
    }, [id]);

    if (!card) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-semibold mb-6">{card.title}</h1>
            <img
                src={`https://res.cloudinary.com/dszsesw4g/${card.image}`}
                alt={card.title}
                className="w-full h-[400px] object-cover"
            />
            <p className="mt-4">{card.description}</p>

            {/* Display additional links if available */}
            {card.youtube_link && (
                <a href={card.youtube_link} className="btn btn-danger mt-4" target="_blank">
                    Watch Video
                </a>
            )}
            {card.pdf_file && (
                <a href={card.pdf_file} className="btn btn-primary mt-4" target="_blank">
                    Download PDF
                </a>
            )}
            {card.extra_file && (
                <a href={card.extra_file} className="btn btn-secondary mt-4" target="_blank">
                    Extra File
                </a>
            )}
        </div>
    );
};

export default CardPage;
