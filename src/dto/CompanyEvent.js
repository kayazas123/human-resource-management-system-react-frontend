export default class ConpanyEvent {
    constructor(id, companyId, isActive, heading, description, imageUrl, dueDate, createdAt, updatedAt) {
        this.id = id;
        this.companyId = companyId;
        this.isActive = isActive;
        this.heading = heading;
        this.description = description;
        this.imageUrl = imageUrl;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}