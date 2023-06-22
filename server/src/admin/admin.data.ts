import { Injectable } from "@nestjs/common";
import { AdminDetailsDto } from "../users/dto";

export type Admin = any;

@Injectable()
export class AdminData{

    private readonly admins = [
        {
            email: "ashhark31@gmail.com",
            password: "Ashhar@123",
        },
        {
            email: "mohammadashhar27@gmail.com",
            password: "ashhar27",
        },
        {
            email: "mak20000727@gmail.com",
            password: "mak@123",
        }
    ];

    private readonly details: AdminDetailsDto[] = [
        {
            interest: 'IT',
            email: 'ashhark31@gmail.com',
            title: 'Mr.',
            firstName: 'Mohammad',
            middleName: 'Ashhar',
            lastName: 'Khan',
            mobile: '7697162720',
            birth: new Date("27/07/2000"),
            skills: ["MERN"],
            country: 'India',
            state: 'Madhya Pradesh',
            city: 'Jabalpur'
        },
        {
            interest: 'IT',
            email: 'mohammadashhar27@gmail.com',
            title: 'Mr.',
            firstName: 'Mohammad',
            middleName: 'Ashhar',
            lastName: 'Khan',
            mobile: '7697162720',
            birth: new Date("27/07/2000"),
            skills: ["Java"],
            country: 'India',
            state: 'Madhya Pradesh',
            city: 'Jabalpur'
        },
        {
            interest: 'IT',
            email: 'mak20000727@gmail.com',
            title: 'Mr.',
            firstName: 'Mohammad',
            middleName: 'Ashhar',
            lastName: 'Khan',
            mobile: '7697162720',
            birth: new Date("27/07/2000"),
            skills: ["React.JS"],
            country: 'India',
            state: 'Madhya Pradesh',
            city: 'Jabalpur'
        },
    ];

    async findOne(email: string) : Promise<Admin | undefined> {
        return this.admins.find(admin => admin.email === email);
    }

    async findDetails(email: string) : Promise<Admin | undefined>{
        return this.details.find(admin => admin.email === email);
    }
}