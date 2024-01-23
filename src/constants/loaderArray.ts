export const LOADER_ARRAY = [1, 2, 3, 4]
export const BLOG_LOADER_ARRAY = [1, 2, 3, 4, 5]
export const EVENTS_LOADER_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8]
export const USER_TYPES = [
  {
    sellerType: 'Seller',
    id: 1,
    question: 'What kind of assets are you looking to sell?',
    options: [
      { name: 'Stressed (include IBC Asssets)', tooltip: '', id: 1, isSelectd: false },
      { name: 'Corporate', tooltip: '', id: 2, isSelectd: false },
      { name: 'Personal', tooltip: '', id: 3, isSelectd: false },
      { name: 'Digital', tooltip: '', id: 4, isSelectd: false },
      { name: 'Other', tooltip: '', id: 5, isSelectd: false },
      { name: 'No preferences', tooltip: '', id: 6, isSelectd: false }
    ]
  },
  {
    sellerType: 'Buyer',
    id: 2,

    question: 'What kind of assets are you looking to buy?',
    options: [
      { name: 'Stressed (include IBC Asssets)', tooltip: '', id: 2, isSelectd: false },
      { name: 'Corporate', tooltip: '', id: 1, isSelectd: false },
      { name: 'Personal', tooltip: '', id: 3, isSelectd: false },
      { name: 'Digital', tooltip: '', id: 4, isSelectd: false },
      { name: 'Other', tooltip: '', id: 5, isSelectd: false },
      { name: 'No preferences', tooltip: '', id: 6, isSelectd: false }
    ]
  },
  {
    sellerType: 'Service Provider',
    id: 3,
    question: 'What kind of services you can provide?',
    options: [
      { name: 'Financing solution to Buyer', tooltip: '', id: 1, isSelectd: false },
      { name: 'Interim funding to Sellers', tooltip: '', id: 2, isSelectd: false },
      { name: 'Valuation', tooltip: '', id: 3, isSelectd: false },
      { name: 'Accounts, Finance, Audit', tooltip: '', id: 4, isSelectd: false },
      { name: 'Marketing', tooltip: '', id: 5, isSelectd: false },
      { name: 'Transport and Logistics', tooltip: '', id: 6, isSelectd: false },
      { name: 'Other', tooltip: '', id: 7, isSelectd: false },
      { name: 'No preferences', tooltip: '', id: 8, isSelectd: false }
    ]
  },
  {
    sellerType: 'Observer',
    id: 4,
    question: '',
    options: []
  },
  {
    sellerType: 'Other',
    id: 5,
    question: '',
    options: []
  }
]

export const PRICE_RANGE_ARRAY = [
  { range: '0 - 10 lacs', id: 1 },
  { range: '10 lacs - 1 crore', id: 2 },
  { range: '1 crore - 10 crores', id: 3 },
  { range: '10 crores - 100 crores', id: 4 },
  { range: 'More than 10 crores', id: 5 }
]
