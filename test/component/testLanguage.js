'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ApplicantEnglishLevel = require('app/steps/ui/englishlevel');
const ApplicantSex = require('app/steps/ui/sex');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('app/config');
const basePath = config.app.basePath;

describe('ApplicantLanguage', () => {
    let testWrapper;
    const expectedNextUrlForApplicantEnglishLevel = basePath + ApplicantEnglishLevel.getUrl();
    const expectedNextUrlForApplicantSex = basePath + ApplicantSex.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ApplicantLanguage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ApplicantLanguage');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it(`test it redirects to applicant english level page: ${expectedNextUrlForApplicantEnglishLevel}`, (done) => {
            const data = {
                language: 'optionOther'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantEnglishLevel);
        });

        it(`test it redirects to applicant sex page: ${expectedNextUrlForApplicantSex}`, (done) => {
            const data = {
                language: 'optionEnglishWelsh'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForApplicantSex);
        });
    });
});
