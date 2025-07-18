'use client';

import { useEffect, useState } from 'react';
import CardItem from './CardItem';  // Import CardItem component

const CardsList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Fetch the list of cards from your API
        fetch('https://cadworkbridge.fly.dev/api/cards/')
            .then((response) => response.json())
            .then((data) => setCards(data));  // Store the fetched data in state
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-semibold mb-6">Core Cards</h1>

            {/* Render CardItem for each card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <CardItem
                        key={card.id}
                        id={card.id}  // Pass card id to CardItem
                        title={card.title}
                        description={card.description}
                        image={card.image}  // Pass image URL to CardItem
                        youtubeLink={card.youtube_link}
                        pdfFile={card.pdf_file}
                        extraFile={card.extra_file}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardsList;
