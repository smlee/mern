import crypto from 'crypto';
import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    }
},{
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

let generateSalt = () => crypto.randomBytes(16).toString('base64');

let encryptPassword = (plainText, salt) => {
    let hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.virtual('full_name').get((next) => `${first_name} ${last_name}`);

schema.pre('save', () => {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();
});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', (
    candidatePassword) => encryptPassword(candidatePassword, this.salt) === this.password;
);

mongoose.model('User', schema);
