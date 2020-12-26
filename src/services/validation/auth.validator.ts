import { body } from 'express-validator';

import responseCodes from '../../utils/response-codes';
import User from '../../models/User';

const validators = {
  signUp: [
    body('email')
      .trim()
      .not().isEmpty().withMessage(responseCodes.isRequired)
      .isEmail().withMessage(responseCodes.invalidEmail)
      .custom((value, { req }) => {
        return User.findOne({email: value})
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject(responseCodes.emailAlreadyExists)
            }
          })
      }),
    body('password')
      .trim()
      .not().isEmpty().withMessage(responseCodes.isRequired)
      .isString().withMessage(responseCodes.shouldBeAString)
      .isLength({min: 6}).withMessage(responseCodes.isTooFewCharacters),
    body('name')
      .not().isEmpty().withMessage(responseCodes.isRequired)
      .isString().withMessage(responseCodes.shouldBeAString)
  ],
  signIn: [
    body('email')
      .not().isEmpty().withMessage(responseCodes.isRequired)
      .isEmail().withMessage(responseCodes.invalidEmail),
    body('password')
      .not().isEmpty().withMessage(responseCodes.isRequired)
      .isString().withMessage(responseCodes.shouldBeAString)
      .isLength({min: 6}).withMessage(responseCodes.isTooFewCharacters),
  ]
}

export default validators;
