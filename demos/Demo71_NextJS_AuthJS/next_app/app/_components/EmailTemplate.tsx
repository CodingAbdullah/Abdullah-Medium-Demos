import EmailTemplateType from "../_utils/types/EmailTemplateType";

// Setting up a Custom Email Template for working with the Resend package
export default function EmailTemplate(props: EmailTemplateType) {
    let { firstName, lastName } = props;

    return (
        <div>
            <h1>Hello <b>{firstName + ' ' + lastName}</b></h1>
            <p>We hope this email finds you well.</p>
            <p>Please disregard this email, this is simply a test.</p>
        </div>
    )
}