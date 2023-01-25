 
 class formatter{
    constructor(InputData){
        this.InputData = InputData;
    }
    async formatOutputData(InputData){
        const output = {
            success: true,
            id : InputData.id,
            data : {
                name : InputData.name,
                email : InputData.email,
            },
            request : "create"
        }
        return output;
    }
    async formatlistData(InputData){
        const output = {
            data : InputData,
            request : "list"
        }
        return output;
    }
}

module.exports = formatter;