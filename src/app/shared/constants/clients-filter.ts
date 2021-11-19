export const  clientFilters = [
    { name: 'None', filters: null },
    { 
        name: 'Role',
        filters: [
            { name: 'All', value: '', filterBy: 'role' },
            { name: 'Admin', value: 'admin', filterBy: 'role' },
            { name: 'User', value: 'user', filterBy: 'role' },
        ]
    },
    {
        name: 'Policy', 
        filters: [
            { name: 'All', value: '', filterBy: 'policy' },
            { name: 'With', value: 'with', filterBy: 'policy' },
            { name: 'Without', value: 'without', filterBy: 'policy' }
        ] 
    }
];