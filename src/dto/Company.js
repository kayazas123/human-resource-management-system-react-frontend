export default class Company {
    constructor(id, companyCode, name, logoUrl, createdAt, updatedAt) {
        this.id = id;
        this.companyCode = companyCode;
        this.name = name;
        this.logoUrl = logoUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}