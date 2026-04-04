export const POSITIVE_CATEGORIES = ['Salary', 'Freelance', 'Investments', 'Gifts'];
export const NEGATIVE_CATEGORIES = ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Miscellaneous'];

const generateMockData = (count) => {
  const transactions = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const isIncome = Math.random() > 0.7; // ~30% are income
    const type = isIncome ? 'income' : 'expense';
    
    // Pick random category depending on type
    const categories = isIncome ? POSITIVE_CATEGORIES : NEGATIVE_CATEGORIES;
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Pick random amount
    const amount = isIncome 
      ? Math.floor(Math.random() * 4000) + 500  // 500 - 4500
      : Math.floor(Math.random() * 200) + 10;   // 10 - 210
    
    // Pick random date within the last 30 days
    const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    transactions.push({
      id: `trx_${Math.random().toString(36).substr(2, 9)}`,
      date: date.toISOString(),
      amount: amount,
      category: category,
      type: type,
      description: `Mock ${category} ${type}`
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_TRANSACTIONS = generateMockData(50);
