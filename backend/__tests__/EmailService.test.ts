import nodemailer from "nodemailer";
import EmailService from "../src/services/EmailService";

jest.mock("nodemailer");

describe("EmailService", () => {
    describe("sendEmail", () => {
        let createTransportMock: jest.Mock;
        let sendMailMock: jest.Mock;
        const emailOption = {
            receiver: "test@example.com",
            title: "Test email",
            content: "This is a test email",
        };

        beforeEach(() => {
            // Reset the mock functions before each test case
            createTransportMock = jest.fn();
            sendMailMock = jest.fn();
            nodemailer.createTransport = createTransportMock.mockReturnValue({ sendMail: sendMailMock });
            process.env.MAILER_USER = "test@example.com";
            process.env.MAILER_PASSWORD = "test_password";
        });

        it("should send an email with the given options", async () => {
            sendMailMock.mockImplementation((options, callback) => {
                callback(null, { response: "OK" });
            });

            const result = await EmailService.sendEmail(emailOption);

            expect(createTransportMock).toHaveBeenCalledWith({
                service: "gmail",
                auth: {
                    user: "test@example.com",
                    pass: "test_password",
                },
            });

            expect(sendMailMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    from: "test@example.com",
                    to: "test@example.com",
                    subject: "Test email",
                    text: "This is a test email",
                }),
                expect.any(Function)
            );

            expect(result).toEqual("OK");
        });
    });
});
