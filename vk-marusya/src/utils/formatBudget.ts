export function formatBudget(budget: number) {
    return budget ? `${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.` : 'Неизвестно'
}