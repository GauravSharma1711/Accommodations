import {body} from 'express-validator'

const userRegistrationValidator = ()=>{
    return [

        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),

        body("username")
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({min:3}).withMessage(" min length should be 3")
        .isLength({max:3}).withMessage(" max length should be 13"),

    
        body("password")
        .notEmpty().withMessage("password is required"),

    ]
}


const userLoginValidator = ()=>{
    return [

        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),


        body("password")
        .notEmpty().withMessage("password is required"),


    ]
}

export {userRegistrationValidator, userLoginValidator}