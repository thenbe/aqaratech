type TwilioConfigKeys =
	| 'TWILIO_ACCOUNT_SID'
	| 'TWILIO_AUTH_TOKEN'
	| 'TWILIO_FROM_NUMBER'
	| 'TWILIO_MESSAGING_SERVICE_SID';

export type TwilioConfigType = {
	[key in TwilioConfigKeys]: string;
};
