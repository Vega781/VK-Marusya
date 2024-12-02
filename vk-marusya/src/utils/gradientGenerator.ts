export const predefinedColors = [
    ['#FF6B6B', '#4ECDC4', '#2c3e50'],
    ['#45B7D1', '#A66CFF', '#FF61D2'],
    ['#FF9A8B', '#FF6A88', '#FF99AC'],
    ['#70E1F5', '#FFD194', '#FA709A'],
    ['#CAC531', '#F3F9A7', '#52c234'],
    ['#667eea', '#764ba2', '#96e6a1'],
    ['#2af598', '#009efd', '#45B7D1'],
    ['#b721ff', '#21d4fd', '#FA709A'],
    ['#6190E8', '#A7BFE8', '#C2E9FB'],
    ['#34e89e', '#0f3443', '#4CA1AF'],
    ['#E8CBC0', '#636FA4', '#6B8CCE'],
    ['#3494E6', '#EC6EAD', '#FFB88C'],
    ['#DBE6F6', '#C5796D', '#A8E6CF'],
    ['#9796f0', '#fbc7d4', '#FBD786'],
    ['#B79891', '#94716B', '#E79796']
];

export const generateNiceGradient = () => {
    const colorTriple = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
    const angle = Math.floor(Math.random() * 360);
    
    // Случайные позиции для цветов (в процентах)
    const pos1 = Math.floor(Math.random() * 30); // 0-30%
    const pos2 = Math.floor(Math.random() * (70 - 40) + 40); // 40-70%
    const pos3 = Math.floor(Math.random() * (100 - 80) + 80); // 80-100%
    
    return `linear-gradient(${angle}deg, 
        ${colorTriple[0]}aa ${pos1}%, 
        ${colorTriple[1]}aa ${pos2}%, 
        ${colorTriple[2]}aa ${pos3}%
    )`;
};