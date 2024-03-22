interface Employer {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    location?: string,
    phoneNumber?: string,
    isBlocked?: boolean,
    isSubscribed?: boolean,
    planExpiresAt?:string,
    image?:string,
    password?: string,
    company_Id?: string
}

export default Employer

