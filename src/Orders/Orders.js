let MainOrders = [
    {
        _id: 'order_-1',
        products: [
            {
                _id: '2',
                units: 2,
                total: 110,
            },
            {
                _id: '0',
                units: 4,
                total: 240,
            },
        ],
        country: 'us',
        referrer: 'https://www.youtube.com/',
        created_date: 'Wed Oct 08 2023 12:13:14 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_0',
        products: [
            {
                _id: '2',
                units: 2,
                total: 110,
            },
            {
                _id: '0',
                units: 4,
                total: 240,
            },
        ],
        country: 'us',
        referrer: 'https://www.facebook.com/',
        created_date: 'Wed Oct 11 2023 00:13:14 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_1',
        products: [
            {
                _id: '0',
                units: 3,
                total: 180,
            },
        ],
        country: 'ca',
        referrer: 'https://www.twitter.com/',
        created_date: 'Wed Oct 11 2023 00:57:29 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_2',
        products: [
            {
                _id: '0',
                units: 1,
                total: 60,
            },
            {
                _id: '2',
                units: 3,
                total: 165,
            },
            {
                _id: '1',
                units: 1,
                total: 45,
            },
        ],
        country: 'us',
        referrer: 'https://www.youtube.com/',
        created_date: 'Wed Oct 11 2023 02:09:43 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_3',
        products: [
            {
                _id: '2',
                units: 5,
                total: 275,
            },
            {
                _id: '0',
                units: 1,
                total: 60,
            },
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'ca',
        referrer: 'https://www.facebook.com/',
        created_date: 'Wed Oct 11 2023 03:17:02 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_4',
        products: [
            {
                _id: '0',
                units: 2,
                total: 120,
            },
            {
                _id: '1',
                units: 3,
                total: 135,
            },
            {
                _id: '2',
                units: 1,
                total: 55,
            },
        ],
        country: 'de',
        referrer: 'https://www.facebook.com/',
        created_date: 'Wed Oct 11 2023 03:28:05 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_5',
        products: [
            {
                _id: '2',
                units: 2,
                total: 110,
            },
            {
                _id: '0',
                units: 4,
                total: 240,
            },
        ],
        country: 'us',
        referrer: 'https://www.twitter.com/',
        created_date: 'Wed Oct 11 2023 07:59:39 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_6',
        products: [
            {
                _id: '2',
                units: 5,
                total: 275,
            },
            {
                _id: '0',
                units: 1,
                total: 60,
            },
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'gb',
        referrer: 'https://www.youtube.com/',
        created_date: 'Wed Oct 11 2023 09:31:48 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_7',
        products: [
            {
                _id: '2',
                units: 5,
                total: 275,
            },
            {
                _id: '0',
                units: 1,
                total: 60,
            },
        ],
        country: 'us',
        referrer: 'https://www.youtube.com/',
        created_date: 'Wed Oct 11 2023 12:02:07 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_8',
        products: [
            {
                _id: '1',
                units: 1,
                total: 45,
            },
        ],
        country: 'us',
        referrer: 'https://www.instagram.com/',
        created_date: 'Wed Oct 11 2023 12:10:15 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_9',
        products: [
            {
                _id: '0',
                units: 1,
                total: 60,
            },
            {
                _id: '2',
                units: 2,
                total: 110,
            },
        ],
        country: 'us',
        referrer: 'https://www.twitter.com/',
        created_date: 'Wed Oct 11 2023 13:24:48 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_10',
        products: [
            {
                _id: '2',
                units: 2,
                total: 110,
            },
        ],
        country: 'ca',
        referrer: 'https://www.facebook.com/',
        created_date: 'Wed Oct 11 2023 14:51:53 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_11',
        products: [
            {
                _id: '1',
                units: 1,
                total: 45,
            },
        ],
        country: 'gb',
        referrer: 'https://www.facebook.com/',
        created_date: 'Wed Oct 11 2023 19:18:29 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_12',
        products: [
            {
                _id: '0',
                units: 3,
                total: 180,
            },
        ],
        country: 'us',
        referrer: 'https://www.instagram.com/',
        created_date: 'Wed Oct 11 2023 22:04:50 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_13',
        products: [
            {
                _id: '1',
                units: 1,
                total: 45,
            },
        ],
        country: 'de',
        referrer: 'https://www.twitter.com/',
        created_date: 'Wed Oct 11 2023 23:23:11 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_14',
        products: [
            {
                _id: '0',
                units: 1,
                total: 60,
            },
            {
                _id: '2',
                units: 2,
                total: 110,
            },
        ],
        country: 'gb',
        referrer: 'https://www.youtube.com/',
        created_date: 'Wed Oct 11 2023 23:51:17 GMT+0100 (GMT+01:00)',
    },


    {
        _id: 'order_15',
        products: [
            {
                _id: '0',
                units: 2,
                total: 120,
            },
            {
                _id: '2',
                units: 3,
                total: 165,
            },
        ],
        country: 'us',
        referrer: 'https://www.twitter.com/',
        created_date: 'Thu Oct 12 2023 00:57:45 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_16',
        products: [
            {
                _id: '1',
                units: 5,
                total: 225,
            },
            {
                _id: '2',
                units: 1,
                total: 55,
            },
        ],
        country: 'ca',
        referrer: 'https://www.youtube.com/',
        created_date: 'Thu Oct 12 2023 02:03:29 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_17',
        products: [
            {
                _id: '0',
                units: 3,
                total: 180,
            },
            {
                _id: '1',
                units: 8,
                total: 360,
            },
        ],
        country: 'us',
        referrer: 'https://www.facebook.com/',
        created_date: 'Thu Oct 12 2023 05:21:51 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_18',
        products: [
            {
                _id: '2',
                units: 2,
                total: 110,
            },
        ],
        country: 'us',
        referrer: 'https://www.twitter.com/',
        created_date: 'Thu Oct 12 2023 06:45:03 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_19',
        products: [
            {
                _id: '0',
                units: 4,
                total: 240,
            },
        ],
        country: 'gb',
        referrer: 'https://www.instagram.com/',
        created_date: 'Thu Oct 12 2023 14:09:47 GMT+0100 (GMT+01:00)',
    },
    {
        _id: 'order_20',
        products: [
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'us',
        referrer: 'https://www.facebook.com/',
        created_date: 'Thu Oct 12 2023 14:28:31 GMT+0100 (GMT+01:00)',
    },

    {
        _id: 'order_20',
        products: [
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'ca',
        referrer: 'https://www.facebook.com/',
        created_date: 'Thu Oct 13 2023 14:28:31 GMT+0100 (GMT+01:00)',
    },
    
    {
        _id: 'order_20',
        products: [
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'us',
        referrer: 'https://www.facebook.com/',
        created_date: 'Thu Oct 14 2023 14:28:31 GMT+0100 (GMT+01:00)',
    },
    
    {
        _id: 'order_20',
        products: [
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'us',
        referrer: 'https://www.twitter.com/',
        created_date: 'Thu Oct 17 2023 14:28:31 GMT+0100 (GMT+01:00)',
    }, 
    
    {
        _id: 'order_20',
        products: [
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'ca',
        referrer: 'https://www.facebook.com/',
        created_date: 'Thu Oct 17 2023 18:28:31 GMT+0100 (GMT+01:00)',
    },
    
    {
        _id: 'order_21',
        products: [
            {
                _id: '1',
                units: 3,
                total: 135,
            },
        ],
        country: 'gb',
        referrer: 'https://www.youtube.com/',
        created_date: 'Thu Nov 16 2023 14:28:31 GMT+0100 (GMT+01:00)',
    },
    
    {
        _id: 'order_21',
        products: [
            {
                _id: '1',
                units: 4,
                total: 135,
            },
        ],
        country: 'us',
        referrer: 'https://www.facebook.com/',
        created_date: 'Thu Jan 03 2024 14:28:31 GMT+0100 (GMT+01:00)',
    },
    
    
    {
        _id: 'order_21',
        products: [
            {
                _id: '1',
                units: 2,
                total: 135,
            },
        ],
        country: 'us',
        referrer: 'https://www.instagram.com/',
        created_date: 'Thu Jul 25 2024 14:28:31 GMT+0100 (GMT+01:00)',
    },
]

export default MainOrders