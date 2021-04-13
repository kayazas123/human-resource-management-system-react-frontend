export default class CompanyDocument {
    constructor(id, companyId, name, documentUrl, createdAt, updatedAt) {
        this.id = id;
        this.companyId = companyId;
        this.name = name;
        this.documentUrl = documentUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}