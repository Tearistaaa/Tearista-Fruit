// IMPORT URL
const STORAGE_URL = 'https://nmgxcwccfdslbfhmcfqe.supabase.co/storage/v1/object/public/tearista-assets/payment/'

const paymentMethods = [
    {
        id: '1',
        name: 'BCA',
        img: `${STORAGE_URL}bca.webp`,
        details: '123-456-7890'
    },
    {
        id: '2',
        name: 'PayPal',
        img: `${STORAGE_URL}paypal.webp`,
        details: 'https://paypal.me/carolynkitania'
    },
    {
        id: '3',
        name: 'MayBank',
        img: `${STORAGE_URL}maybank.webp`,
        details: '123-456-7890'
    },
    {
        id: '4',
        name: 'ShopeePay',
        img: `${STORAGE_URL}shopee.webp`,
        details: '+6512345678'
    }
];

export default paymentMethods;