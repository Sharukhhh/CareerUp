import userModel from '../models/userModel.js';
import companyModel from '../models/companyModel.js'


export const isExistingData = async (credential ,id , role) => {

    let existingUser;

    if((id === 'email' && role === 'Candidate') || (id === 'phone' && role === 'Candidate' )){

        if(id === 'email'){
            existingUser = await userModel.findOne({email : credential});
        }

        if(id === 'phone'){
            existingUser = await userModel.findOne({phone : credential});
        }
    }
    

    if((id === 'email' && role === 'Company') || (id === 'phone' && role === 'Company')) {

        if(id === 'email'){
            existingUser = await companyModel.findOne({email : credential});
        }

        if(id === 'phone'){
            existingUser = await companyModel.findOne({phone : credential});
        }
    }

    return existingUser;
}