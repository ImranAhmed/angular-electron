import { expect } from 'chai';
import { SpectronClient } from 'spectron';

import commonSetup from './common-setup';

describe('angular-electron App', function () {
    commonSetup.apply(this);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let browser: any;
    let client: SpectronClient;

    beforeEach(function () {
        client = this.app.client;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        browser = client as any;
    });

    it('should display message saying App works !', async function () {
        const text = await browser.getText('app-home h1');
        expect(text).to.equal('App works !');
    });

    it('creates initial windows', async function () {
        const count = await client.getWindowCount();
        expect(count).to.equal(1);
    });
});
