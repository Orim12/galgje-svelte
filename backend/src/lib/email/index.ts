import { EmailOptions } from "payload/config";
import { smtpTransport } from "./transports/smtpTransport";
import { mockTransport } from "./transports/mockTransport";

const transportFunctions = {
    mock: mockTransport,
    smtp: smtpTransport,
}

type TransportOptions = keyof typeof transportFunctions

function emailOptionsFactory(generateTransportFn?: Function): EmailOptions {
    return {
        fromAddress: process.env.EMAIL_FROM_ADDRESS,
        fromName: process.env.EMAIL_FROM_NAME,
        logMockCredentials: true,
        transportOptions: generateTransportFn !== undefined ? generateTransportFn() : undefined,
    };
}

export function generateEmailOptions(transportOption: TransportOptions = 'mock'): EmailOptions {
    if (!process.env.EMAIL_FROM_ADDRESS || !process.env.EMAIL_FROM_NAME) {
        throw new Error('EMAIL_FROM_ADDRESS and EMAIL_FROM_NAME must be provided in environment variables');
    }

    return emailOptionsFactory(transportFunctions[transportOption]);
}