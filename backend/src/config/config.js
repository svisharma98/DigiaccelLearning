import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envValidate = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development').required(),
        HOST: Joi.string().allow('').empty('').default('localhost'),
        PORT: Joi.number().allow('').empty('').default(8888),

        DATABASE_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRE_SEC: Joi.string().default('30s'), // 30 second
    })
    .unknown();

const { value: env, error } = envValidate.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config env error: ${error.message}`);
}

export default {
    NODE_ENV: env.NODE_ENV,
    HOST: env.HOST,
    PORT: env.PORT,
    DATABASE_URI: env.DATABASE_URI,
    JWT_SECRET: Buffer.from(env.JWT_SECRET, 'base64'),
    JWT_EXPIRE_SEC: env.JWT_EXPIRE_SEC,
}; 
