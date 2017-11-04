import {Organizations} from './organization';

export interface User {
    userId: string;
    emailId: string;
    password: string;
    accountId: string;
    firstName: string;
    lastName: string;
    roleId: string;
    roleName: string;
    title: string;
    organizations: Organizations[];
}
