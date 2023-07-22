import { FormInstance } from "antd";

export interface User {
    id: number;
    email: string;
    roles: string[];
    departments: string[];
}

export interface UserFormProps {
    initialValues: User;
    onSave: (values: User) => void;
    form: FormInstance<User>;
}

export interface Department {
    Id: string,
    Name: string,
    ContactInfo: string,
    Code: string,
    UnderDepartment: string,
    Description: string
}

export interface DepartmentFormProps {
    initialValues: Department;
    form: FormInstance<Department>;
}

export interface Role {
    Id: string,
    Title: string
}

export interface RoleFormProps {
    initialValues: Role;
    form: FormInstance<Role>;
}