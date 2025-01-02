import { app, InvocationContext, Timer } from "@azure/functions";
import { MyZappi } from "../Zappi";

function GetModeChange(hour: number, minute: number): number{
    if((hour == 23 && minute >= 30) || (hour == 0 && minute == 0)){
        return 3;
    } else if((hour == 5 && minute >= 30) || (hour == 6 && minute == 0)){
        return 4;
    } else {
        return 0;
    }
}

export async function zappiHomeTrigger(myTimer: Timer, context: InvocationContext): Promise<void> {
    const datetime = new Date();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();

    try {
        const myZappiObj = new MyZappi(process.env["SERIAL_NUMBER"], process.env["API_KEY"]);
        const myZappiStatus = await myZappiObj.getZappiStatus();
        context.info(`Zappi Mode is currently: ${myZappiStatus.zmo}`);

        const chargeMode = GetModeChange(hour, minute);
        // Only change the Zappi mode if within schedule
        if(chargeMode==0){
            context.info("No change in charge mode - out of schedule.");
        } else {
            myZappiObj.ChargeMode = chargeMode;
            myZappiObj.changeZappiMode();
            context.info(`Charge mode changed to mode ${myZappiObj.ChargeMode}`);
        }

        context.info('Timer function processed request.');
    } catch (error) {
        context.error(error);
    }
}

app.timer('zappiHomeTrigger', {
    schedule: '0 */30 * * * *',
    handler: zappiHomeTrigger
});
