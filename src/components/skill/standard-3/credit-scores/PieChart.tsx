interface PieChartProps {
  categories: {
    title: string;
    percentage: number;
    color: string;
  }[];
}

export function PieChart({ categories }: PieChartProps) {
  let rotation = 0;
  
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {categories.map((category, index) => {
            const slice = (category.percentage / 100) * 360;
            const pathData = describeArc(50, 50, 48, rotation, rotation + slice);
            rotation += slice;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={category.color}
                className="hover:opacity-90 transition-opacity cursor-pointer"
              >
                <title>{`${category.title}: ${category.percentage}%`}</title>
              </path>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">100%</div>
            <div className="text-sm text-gray-600">Total Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", x, y,
    "Z"
  ].join(" ");
}