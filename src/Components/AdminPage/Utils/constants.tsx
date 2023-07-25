
import { RcFile } from "antd/es/upload";

export const ACTION_HANDLE = {
    EDIT: 'EDIT',
    ADD: 'ADD',
}

export const jwt_admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXJJZCI6IjNmOGVmNjQwLTQ4OTUtNGYwNi05OWU4LWE4MjlkMjVhMzVjMSIsIlVzZXJuYW1lIjoiYWRtaW4wMDAxIiwiUGFzc3dvcmQiOiIxMjM0NTYiLCJuYmYiOjE2OTAyMjY2ODAsImV4cCI6MTY5MDMxMzA4MCwiaWF0IjoxNjkwMjI2NjgwLCJpc3MiOiJjYXJib29raW5naXNzdWVyIiwiYXVkIjoiY2FyYm9va2luZ2F1ZGllbmNlIn0.E5cHbNCqIpPPtTIKcIbFIIRUA8sJ_uQZPFEoEyp7OfE'

export const messageConfig = {
    top: 25,
    duration: 2,
    maxCount: 3,
}

export const resetUser = {
    Id: '',
    Username: '',
    Email: '',
    EmployeeNumber: '',
    AvatarPath: 'http://localhost:63642/Files/Avatar/default-user-profile.png',
    FirstName: '',
    LastName: '',
    Sex: true,
    Created: '',
    Birthday: '',
    JobTitle: '',
    Company: '',
    Unit: '',
    Function: '',
    SectionsOrTeam: '',
    Groups: '',
    OfficeLocation: '',
    LineManager: '',
    BelongToDepartments: '',
    Rank: '',
    EmployeeType: '',
    Rights: '',
    Nation: '',
    Phone: '',
    IdCardNumber: '',
    DateOfIdCard: '',
    PlaceOfIdCard: '',
    HealthInsurance: '',
    StartingDate: '',
    StartingDateOfficial: '',
    LeavingDate: '',
    StartDateMaternityLeave: '',
    Note: '',
    AcademicLevel: '',
    Qualification: '',
    BusinessPhone: '',
    HomePhone: '',
    PersonalEmail: '',
    BankName: '',
    BankBranchNumber: '',
    BankBranchName: '',
    BankAccountNumber: '',
    BankAccountName: '',
    Street: '',
    FlatNumber: '',
    City: '',
    Province: '',
    PostalCode: '',
    Country: '',
    MartialStatus: '',
    ContactName: '',
    Relationship: '',
    PhoneR: '',
    StreetR: '',
    FlatNumberR: '',
    CityR: '',
    ProvinceR: '',
    PostalCodeR: '',
    CountryR: '',
    Signature: '',
    RoleIdToAdd: '',
    UserRoles: {
        UserId: '',
        RoleId: '',
    },
    DepartmentMembers: {
        UserId: '',
        DepartmentId: '',
    },
    Roles: [],
    Departments: [],
    Password: ''
}

export const resetDepartment = {
    Id: '',
    Name: '',
    ContactInfo: '',
    Code: '',
    UnderDepartment: '',
    Description: '',
}

export const resetRole = {
    Id: '',
    Title: '',
}