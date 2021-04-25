export default class ManagerDetail{
    constructor(emailId, firstName, lastName, middleName, description, status, gender, profilePicture, dateOfBirth, countryId, profileCompleted, companyCreated ){
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.description = description;
        this.status = status;
        this.gender = gender;
        this.profilePicture = profilePicture;
        this.dateOfBirth = dateOfBirth;
        this.countryId = countryId;
        this.profileCompleted = profileCompleted;
        this.companyCreated = companyCreated;
    }
}