export default class CompanyReport {
    constructor(id, companyId, reportType, s3Key, month, year, createdAt, updatedAt) {
        this.id = id;
        this.companyId = companyId;
        this.reportType = reportType;
        this.s3Key = s3Key;
        this.month = month;
        this.year = year;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}