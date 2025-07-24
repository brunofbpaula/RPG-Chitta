interface Props {
    sanity: number;
}

export default function SanityBar({ sanity }: Props) {
    
    return (
        <div className="relative h-4 w-60 b-4 bg-white rounded-md flex">
            <div 
                className="absolute h-4 w-40 bg-red-500 rounded-md flex justify-center"
                style={{ width: `${sanity}%`, fontSize: '10px', fontWeight: 'bold' }}
            >
                {sanity}%
            </div>
        </div>
    )
}