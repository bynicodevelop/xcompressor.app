import config from '#config'
import { useBody } from 'h3'
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_PUBLISHABLE_KEY, {
    apiVersion: '2020-08-27',
});

export default async (req, res) => {
    const { subscriptionId } = await useBody(req);

    const response = {
        status: "ok",
    }

    try {
        const deleted = await stripe.subscriptions.del(
            subscriptionId
        );
    } catch (e) {
        if (e.code == 'resource_missing') {
            response['status'] = 'not_found';
        }
    }

    return response
}