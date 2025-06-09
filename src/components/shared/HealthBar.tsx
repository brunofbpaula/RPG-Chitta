interface Props {
    health: number;
}

export default function HealthBar({ health }: Props) {
    
    return (
        <div className="relative h-4 w-60 b-4 bg-white rounded-md flex">
            <div 
                className="absolute h-4 w-40 bg-red-500 rounded-md flex justify-center"
                style={{ width: `${health}%`, fontSize: '10px', fontWeight: 'bold' }}
            >
                {health}%
            </div>
        </div>
    )
}