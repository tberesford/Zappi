import { app, InvocationContext, Timer } from "@azure/functions";
import { MyZappi } from "../Zappi";

export async function zappiHomeTrigger(myTimer: Timer, context: InvocationContext): Promise<void> {
    const datetime = new Date();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();

    try {
        const myZappiObj = new MyZappi(process.env["SERIAL_NUMBER"], process.env["API_KEY"]);
        const myZappiStatus = await myZappiObj.getZappiStatus();
        context.info(`Zappi Mode is currently: ${myZappiStatus.zmo}`);

        if((hour == 23 && minute >= 30) || (hour == 0 && minute < 30)){ // Additional checks outside of period in case of missed step
            myZappiObj.ChargeMode = 3;        
        } else if((hour == 5 && minute >= 30) || (hour == 6 && minute < 30)){
            myZappiObj.ChargeMode = 4;
        }
    
        try{
            if(myZappiStatus.zmo != myZappiObj.ChargeMode){
                myZappiObj.changeZappiMode();
                setTimeout(async () => {
                    const newStatus = await myZappiObj.getZappiStatus();
                    console.info(`Zappi Mode is now: ${newStatus.zmo}`);
                }, 10000);
            }
        } catch (error) {
            context.error(error);
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
