import { MyZappi } from '../src/Zappi';

describe("MyEnergi Zappi", () => {

    it("Should get Zappi status", async () => {
        const myEnergiApp = new MyZappi(process.env.SERIAL_NUMBER, process.env.API_KEY);
        const zappiStatus = await myEnergiApp.getZappiStatus();
        expect(zappiStatus).toHaveProperty("zmo");
    });

    it("Should set the mode", () => {
        const zappiObject = new MyZappi(process.env.SERIAL_NUMBER, process.env.API_KEY);
        zappiObject.ChargeMode = 1;
        expect(zappiObject.ChargeMode).toEqual(1);
    });

    it("Should change the charge mode", async () => {
        const zappiObject = new MyZappi(process.env.SERIAL_NUMBER, process.env.API_KEY);
        let zappiStatus = await zappiObject.getZappiStatus();
        console.log(zappiStatus?.zmo);

        const currentChargeMode = zappiStatus?.zmo;
        if(currentChargeMode == 1){
            zappiObject.ChargeMode = 2; // Set mode to ECO
        } else {
            zappiObject.ChargeMode = 1; // Set mode to FAST
        }
        expect(zappiObject.ChargeMode).not.toEqual(currentChargeMode);
        zappiObject.changeZappiMode();
        
        setTimeout(async () => {
            zappiStatus = await zappiObject.getZappiStatus();
            console.log(zappiStatus?.zmo);
            expect(zappiStatus?.zmo).toEqual(zappiObject.ChargeMode);
        }, 5000);
    })
});