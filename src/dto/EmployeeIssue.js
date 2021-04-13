export default class EmployeeIssue {
    constructor(id, title, description, employeeId, companyId, isActive, issueType, response, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.employeeId = employeeId;
        this.companyId = companyId;
        this.isActive = isActive;
        this.issueType = issueType;
        this.response = response;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}