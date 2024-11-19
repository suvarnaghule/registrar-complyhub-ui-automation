class randomData
{

       getRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    generatePrimaryContact() {
        const firstName = this.getRandomString(5); // Length of 5
        const lastName = this.getRandomString(7);  // Length of 7
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@guerrillamail.com`;
        return {
            firstName: firstName,
            lastName: lastName,
            email: email
        };
    }
    getRandomNumber() {
        
        return Math.floor(Math.random() * 100000); // Generates a random number up to 99999
    }
    generateVendorID() {
        const vid = [];
        for (let i = 0; i < 4; i++) {
            vid.push(this.getRandomNumber()); // Generate and add a vendor ID to the array
        }
        return {vid}

        // "supplierVendorID":[{"vid":354637843},{"vid":876984474},{"vid":543309878},{"vid":746238675}],
    }
    getRandomRegNo(length)
    {
        let regNo = '';
        for (let i = 0; i < length; i++) {
            regNo += Math.floor(Math.random() * 10); // Append a random digit (0-9)
        }
        return regNo; // Returns a string of the specified len
    }
    getRandomNumberWithLength(length)
    {
        const min = Math.pow(10, length - 1); // Minimum value for the given length
        const max = Math.pow(10, length) - 1; // Maximum value for the given length
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomNumberInRange()
    {
        const length = Math.floor(Math.random() * (11 - 5 + 1)) + 5; // Random length between 5 and 11
        return this.getRandomNumberWithLength(length); // Generate the random number with the determined length
    }
    generateRegNoandPin()
    {
        const foodRegNo = this.getRandomRegNo(11)
        const drugRegNo = this.getRandomRegNo(10)
        const medicalRegNo = this.getRandomNumberInRange()
        const cosmeticsRegNo = this.getRandomNumberInRange()
        const regPin = this.getRandomRegNo(8)
        
        const registrationNumbers = [];
        registrationNumbers.push(foodRegNo);
        registrationNumbers.push(drugRegNo);
        registrationNumbers.push(medicalRegNo);
        registrationNumbers.push(cosmeticsRegNo);
        return { registrationNumbers, regPin}
        
    }
    generateSupplierFEI()
    {
        const fei = [];
        for (let i = 0; i < 4; i++) {
            fei.push(this.getRandomNumber());
        }
        return {fei}      
    }
}
export default randomData;