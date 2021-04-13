export default class EmployeeDetail {
    constructor(emailId, firstName, lastName, middleName, description, status, gender, profilePicture, dateOfBirth, profileCompleted, companyStatus ){
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.description = description;
        this.status = status;
        this.gender = gender;
        this.profilePicture = profilePicture;
        this.dateOfBirth = dateOfBirth;
        this.profileCompleted = profileCompleted;
        this.companyStatus = companyStatus;
    }
}