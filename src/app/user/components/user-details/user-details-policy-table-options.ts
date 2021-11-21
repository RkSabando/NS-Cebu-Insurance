import * as moment from 'moment';

export const userDetailsPolicyTableOptions = {
    thead: {
        clickable: true,
        headers: [
            { title: "Date", key: 'inceptionData', sortable: true, format: (data: any) => {
                return moment().format("LL")
            } },
            { title: "Amount", key: 'amountInsured', sortable: true },
            { title: "Installment", key: 'installmentPayment' }
        ]
    },
    emptyMessage: 'No linked policy!'
  }