import config from '#config'
import { useBody } from 'h3'
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_PUBLISHABLE_KEY, {
    apiVersion: '2020-08-27',
});

export default async (req, res) => {
    const { subscriptionId } = await useBody(req)

    const subscription = await stripe.subscriptions.retrieve(
        subscriptionId
    );

    return {
        subscription
    }
}