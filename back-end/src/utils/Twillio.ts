import { Twilio as TwilioClient } from 'twilio';
import { AppError } from './AppError';
import { getEnvVariables } from '../enviroments/enviroment';


export class Twillio {
    private static client = new TwilioClient(getEnvVariables().twillio_account_sid, getEnvVariables().twillio_auth_token);

    public static async sendOtp(otp: string, to: string) {
        to = to.split('0')['1'] ;
        try {
            await Twillio.client.messages.create({
                from: 'whatsapp:+14155238886',
                contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
                contentVariables: JSON.stringify({ "1": otp }),
                to: `whatsapp:+94${to}`
            })
        }catch(err){
            throw new AppError(err.message , 500);
        }
    }
}