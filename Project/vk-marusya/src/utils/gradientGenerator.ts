export const predefinedColors = [
    ['#FF6B6B', '#4ECDC4'],
    ['#45B7D1', '#A66CFF'],
    ['#FF9A8B', '#FF6A88'],
    ['#70E1F5', '#FFD194'],
    ['#CAC531', '#F3F9A7'],
    ['#667eea', '#764ba2'],
    ['#2af598', '#009efd'],
    ['#b721ff', '#21d4fd'],
    ['#6190E8', '#A7BFE8'],
    ['#34e89e', '#0f3443'],
    ['#E8CBC0', '#636FA4'],
    ['#3494E6', '#EC6EAD'],
    ['#DBE6F6', '#C5796D'],
    ['#9796f0', '#fbc7d4'],
    ['#B79891', '#94716B']
];

export const generateNiceGradient = () => {
    const colorPair = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${colorPair[0]}aa, ${colorPair[1]}aa)`;
};