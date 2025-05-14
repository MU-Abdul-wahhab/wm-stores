import * as nodemailer from "nodemailer";
import { getEnvVariables } from "../enviroments/enviroment";

export class NodeMailer {
    private static intiateTransport() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: getEnvVariables().gmail_auth.user,
                pass: getEnvVariables().gmail_auth.pass
            }
        })
    }

    static sendMail(data: { to: string[], subject: string, html: string }): Promise<any> {
        return NodeMailer.intiateTransport().sendMail({
            from: getEnvVariables().gmail_auth.user,
            to: data.to,
            subject: data.subject,
            html: data.html
        })
    }
}