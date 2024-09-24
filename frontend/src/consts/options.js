export const projectStatusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
];

export const userRoleOptions = [
    { value: "admin", label: "Admin" },
    { value: "client", label: "Client" },
];

export const ticketSortOptions = [
    { value: "priority", label: "Priority" },
    { value: "estimated_hours", label: "Estimated Hours" },
    { value: "type", label: "Type" },
]

export const ticketStatusOptions = [
    { value: "request", label: "Request", color: "cyan" },
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "open", label: "Open", color: "green" },
    { value: "in progress", label: "In Progress", color: "blue" },
    { value: "completed", label: "Completed", color: "gray" },
    { value: "cancelled", label: "Cancelled", color: "red" },
    { value: "on hold", label: "On Hold", color: "orange" },
];

export const ticketTypeOptions = [
    { value: "feature", label: "Feature", color: "teal" },
    { value: "task", label: "Task", color: "green" },
    { value: "change", label: "Change", color: "indigo" },
    { value: "support", label: "Support", color: "blue" },
    { value: "problem", label: "Problem", color: "red" },
];

export const ticketPriorityOptions = [
    { value: "1", label: "1 (High)", color: "red" },
    { value: "2", label: "2 (Medium)", color: "orange" },
    { value: "3", label: "3 (Low)", color: "yellow" },
];