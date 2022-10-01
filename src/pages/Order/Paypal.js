import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

// const initialOptions = {
//     'client-id': 'test',
//     currency: 'USD',
//     intent: 'capture',
// };

function Paypal({ data }) {
    return (
        <>
            <PayPalScriptProvider
                options={{
                    'client-id': data,
                }}
            >
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: '1',
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        const name = details.payer.name.given_name;
                        console.log('details', details);
                        alert('Transaction completed by ' + name);
                    }}
                />
            </PayPalScriptProvider>
        </>
    );
}

export default Paypal;
