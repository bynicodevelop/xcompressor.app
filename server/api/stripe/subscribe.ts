import config from '#config'
import { useBody } from 'h3'
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_PUBLISHABLE_KEY, {
    apiVersion: '2020-08-27',

});

export default async (req, res) => {
    const {
        email,
        cardName,
        cardNumber,
        cardExpiry,
        cardCvc } = await useBody(req)

    const { id } = await stripe.customers.create({
        email: email,
    });

    const expireSplitted = cardExpiry.split('/').map(x => parseInt(x));

    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number: cardNumber.replace(' ', ''),
            exp_month: expireSplitted[0],
            exp_year: expireSplitted[1],
            cvc: cardCvc,
        },
        billing_details: {
            name: cardName,
            email
        }
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: id,
    });

    await stripe.customers.update(
        id,
        {
            invoice_settings: {
                default_payment_method: paymentMethod.id,
            },
        }
    );

    const subscription = await stripe.subscriptions.create({
        customer: id,
        items: [
            { price: 'price_1KebeoJdncNwYjeBhm7WRH2x' },
        ],
    });

    console.log(subscription);


    const { id: subscriptionId } = subscription

    return {
        subscriptionId
    }
}