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