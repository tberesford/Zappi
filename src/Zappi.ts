import { MyEnergi, ZappiChargeMode, Zappi } from "myenergi-api";

export class MyZappi {
    private _myEnergiApp: MyEnergi;
    private _chargeMode: ZappiChargeMode;
    private _serialNumber: string;

    constructor(serialNumber: string, key: string){
        this._serialNumber = serialNumber;
        this._myEnergiApp = new MyEnergi(serialNumber, key);
    }

    get ChargeMode(){
        return this._chargeMode;
    }

    set ChargeMode(mode: ZappiChargeMode){
        switch(mode){
            case(1):
                this._chargeMode = ZappiChargeMode.Fast;
                break;
            case(2):
                this._chargeMode = ZappiChargeMode.Eco;
                break;
            case(3):
                this._chargeMode = ZappiChargeMode.EcoPlus;
                break;
            case(4):
                this._chargeMode = ZappiChargeMode.Off;
                break;
        }
    }

    set SerialNumber(serialNumber: string){
        this._serialNumber = serialNumber;
    }

    public async getZappiStatus(){
        const status: Zappi = await this._myEnergiApp.getStatusZappi(this._serialNumber);
        return status;
    }
    
    public changeZappiMode(){
        this._myEnergiApp.setZappiChargeMode(this._serialNumber, this._chargeMode);
    }
}