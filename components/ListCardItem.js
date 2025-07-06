import Link from 'next/link';

const ListCardItem = ({ id, title, description, image, youtubeLink, pdfFile, extraFile }) => {
    const imageUrl = `https://res.cloudinary.com/dszsesw4g/${image}`; // Construct the full image URL

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
            {/* Corrected Link Usage */}
            <Link href={`/card/${id}`}>
                <img
                    src={imageUrl}  // Dynamically created image URL
                    alt={title}
                    className="w-full h-[200px] object-cover"
                    onError={(e) => e.target.src = '/default-image.jpg'} // Fallback image
                />
            </Link>

            {/* Card Body */}
            <div className="px-6 py-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-700 text-base">{description}</p>
            </div>

            {/* Card Footer Links */}
            <div className="px-6 py-4 flex justify-between items-center">
                {youtubeLink && (
                    <a href={youtubeLink} className="text-blue-500 hover:text-blue-700">
                        Watch Video
                    </a>
                )}
                {pdfFile && (
                    <a href={pdfFile} className="text-blue-500 hover:text-blue-700">
                        Download PDF
                    </a>
                )}
                {extraFile && (
                    <a href={extraFile} className="text-blue-500 hover:text-blue-700">
                        Extra File
                    </a>
                )}
            </div>
        </div>
    );
};

export default ListCardItem;
