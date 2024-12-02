export function ratingColor(rating: number) {    
    if (rating >= 8) {
        return '#A59400'
    } else if (rating >= 7) {
        return '#308E21'
    } else if (rating >= 5) {
        return '#777777'
    } else {
        return '#C82020'
    }
}