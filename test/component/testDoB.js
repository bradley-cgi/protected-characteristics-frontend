'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantLanguage = require('app/steps/ui/language');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantDateOfBirth', () => {
    let testWrapper;
    const expectedNextUrlForApplicantLanguage = basePath + ApplicantLanguage.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantDateOfBirth');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantDateOfBirth');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it('test errors message displayed for missing data', (done) => {
            const errorsToTest = ['dob-day', 'dob-month', 'dob-year'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate'
            };
            testWrapper.testErrors(done, data, 'required', errorsToTest);
        });

        it('test errors message displayed for invalid day', (done) => {
            const errorsToTest = ['dob-day'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '32',
                'dob-month': '9',
                'dob-year': '2000'
            };

            testWrapper.testErrors(done, data, 'invalid', errorsToTest);
        });

        it('test errors message displayed for invalid month', (done) => {
            const errorsToTest = ['dob-month'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '13',
                'dob-month': '14',
                'dob-year': '2000'
            };

            testWrapper.testErrors(done, data, 'invalid', errorsToTest);
        });

        it('test errors message displayed for non-numeric day', (done) => {
            const errorsToTest = ['dob-day'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': 'ab',
                'dob-month': '09',
                'dob-year': '2000'
            };

            testWrapper.testErrors(done, data, 'invalid', errorsToTest);
        });

        it('test errors message displayed for non-numeric month', (done) => {
            const errorsToTest = ['dob-month'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '13',
                'dob-month': 'ab',
                'dob-year': '2000'
            };

            testWrapper.testErrors(done, data, 'invalid', errorsToTest);
        });

        it('test errors message displayed for non-numeric year', (done) => {
            const errorsToTest = ['dob-year'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '13',
                'dob-month': '12',
                'dob-year': '20ab'
            };

            testWrapper.testErrors(done, data, 'invalid', errorsToTest);
        });

        it('test errors message displayed for three digits in year field', (done) => {
            const errorsToTest = ['dob-year'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '12',
                'dob-month': '9',
                'dob-year': '200'
            };

            testWrapper.testErrors(done, data, 'invalid', errorsToTest);
        });

        it('test error message displayed for date in the future', (done) => {
            const errorsToTest = ['dob-date'];
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '12',
                'dob-month': '9',
                'dob-year': '3000'
            };

            testWrapper.testErrors(done, data, 'dateInFuture', errorsToTest);
        });

        it(`test it redirects to applicant language page: ${expectedNextUrlForApplicantLanguage}`, (done) => {
            const data = {
                'provideDateOfBirth': 'optionEnterDate',
                'dob-day': '01',
                'dob-month': '01',
                'dob-year': '1999'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantLanguage);
        });
    });
});
