import { ticketPriorityOptions, ticketStatusOptions, ticketTypeOptions } from "./options";

export const loginForm = {
    initialValues: {
        email: "admin@example.com",
        password: "password123",
    },
    validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email format"),
        password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters"),
    },
};

export const userForm = {
    initialValues: {
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
    },
    validate: {
        username: (value) => (value ? null : "Username is required"),
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email format"),
        phone: (value) => (value ? null : "Phone number is required"),
        role: (value) => (value ? null : "Role is required"),
        password: (value) => (value.length == 0 ? null : value.length >= 8 ? null : "Password must be at least 8 characters"),
    },
};

export const configForm = {
    initialValues: {
        key: "",
        value: "",
    },
    validate: {
        key: (value) => (value ? null : "Key is required"),
        value: (value) => (value ? null : "Value is required"),
    },
};

export const projectForm = {
    initialValues: {
        user_id: "",
        icon: "",
        name: "",
        description: "",
        status: "",
        credits: 0,
        max_accumulated_credits: 0,
        max_credit_duration: 0,
    },
    validate: {
        user_id: (value) => (Number.isInteger(parseInt(value)) ? null : "Responsible user is required"),
        icon: (value) => (value ? null : "Project icon is required"),
        name: (value) => (value ? null : "Project name is required"),
        description: (value) => (value ? null : "Description is required"),
        status: (value) => (value ? null : "Status is required"),
        credits: (value) => (Number.isInteger(parseInt(value)) ? null : "Credits must be integer"),
        max_accumulated_credits: (value) =>
            value >= 0 ? null : "Max accumulated credits must be non-negative",
        max_credit_duration: (value) =>
            value >= 0 ? null : "Max credit duration must be greater than 0",
    },
};

export const creditForm = {
    initialValues: {
        amount: 0,
        title: "",
    },
    validate: {
        amount: (value) => (Number.isInteger(parseInt(value)) ? null : "Amount must be integer"),
        title: (value) => (value ? null : "Title is required"),
    },
};

export const ticketForm = {
    initialValues: {
        title: "",
        description: "",
        priority: "",
        estimated_hours: 0,
        status: "request",
        type: "",
        remarks: "",
    },
    validate: {
        title: (value) => (value ? null : "Title is required"),
        description: (value) => (value ? null : "Description is required"),
        priority: (value) =>
            ticketPriorityOptions.map(e => e.value).includes(value) ? null : "Priority incorrect",
        estimated_hours: (value) =>
            Number.isNaN(parseFloat(value)) ? "Estimated hours must be float" : null,
        status: (value) =>
            ticketStatusOptions.map(e => e.value).includes(value)
                ? null
                : "Status incorrect",
        type: (value) =>
            ticketTypeOptions.map(e => e.value).includes(value)
                ? null
                : "Type incorrect",
    },
}

export const deploymentForm = {
    initialValues: {
        title: "",
        description: "",
        platform: "",
        deployed_at: "",
    },
    validate: {
        title: (value) => (value.trim().length === 0 ? "Title is required" : null),
        platform: (value) => (value.trim().length === 0 ? "Platform is required" : null),
    },
};
export const paymentForm = {
    initialValues: {
        title: "",
        description: "",
        amount: 0,
        status: "",
        due_date: null,
        payment_date: null,
    },
    validate: {
        title: (value) =>
            typeof value === "string" && value.trim().length === 0 ? "Title is required" : null,
        amount: (value) =>
            value === undefined || isNaN(value) || Number(value) < 0
                ? "Valid amount is required"
                : null,
        status: (value) =>
            typeof value === "string" && value.trim().length === 0 ? "Status is required" : null,
        due_date: (value) =>
            value === null ? "Due date is required" : null,
        payment_date: (value) => {
            if (value !== null && isNaN(new Date(value).getTime())) {
                return "Valid payment date is required";
            }
            return null;
        },
    },
};