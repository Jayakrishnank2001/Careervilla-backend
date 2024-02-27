import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jayk16122001@gmail.com',
        pass: 'bxtnutkzabiwyqwf',
    }
})

export const generateAndSendOTP = async (toEmail: string): Promise<string> => {
    let otp:string|null = generateRandomOTP()
    
    const mailOptions = {
        from: 'jayk16122001@gmail.com',
        to: toEmail,
        subject: 'OTP Verification',
        text:`Welcome to CAREERVILLA. Your OTP for registration is: ${otp}`
    }

    await transporter.sendMail(mailOptions)

    return otp
}

function generateRandomOTP(): string{
    const otpLength = 6
    const min = Math.pow(10, otpLength - 1)
    const max = Math.pow(10, otpLength) - 1
    const randomOTP = Math.floor(min + Math.random() * (max - min + 1))
    return randomOTP.toString()
}