class CustomError extends Error {
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;
    }
};


export const errorHandler = async (err , req, res , next) => {

    console.error(err, 'initial logged error');

    let statusCode = 500;
    let message = 'Internal Server Error';

    if(err instanceof CustomError){
        statusCode = err.statusCode;
        message = err.message;

    } else if (err.name === 'ValidationError'){  //mongoose validation error
        statusCode = 400;
        message = err.message

    } else if (err.name === 'JsonWebTokenError'){ //jwt auth error
        statusCode = 401;
        message = 'Unauthorized : Invalid Token'

    } else if (err.name === 'TokenExpiredError'){ //jwt token expired error
        statusCode = 401;
        message = 'Unauthorized : Token Expired'

    }

    return res.status(statusCode).json({error : message});

}