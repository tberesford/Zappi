
export interface ZappiModel {
    "zappi": [{
		"che": number,			//Charge added in KWh
		"cmt": number,		//Command Timer- counts 1 - 10 when command sent, then 254 - success, 253 - failure, 255 - never received any comamnds
		"dat": Date,	//Date	
		"div": number,		//Diversion amount Watts (does not appear if zero)
		"dst": number,			// Use Daylight Savings Time
		"ectp1": number,		//Physical CT connection 1 value Watts
		"ectp2": number,		//Physical CT connection 2 value Watts
		"ectp3": number,		//Physical CT connection 3 value Watts
		"ectp4": number,		//Physical CT connection 4 value Watts
		"ectp5": number,		//Physical CT connection 5 value Watts
		"ectp6": number,		//Physical CT connection 6 value Watts
		"ectt1": string,		//CT 1 Name	
		"ectt2": string,	//CT 2 Name	
		"ectt3": string,		//CT 3 Name
		"ectt4": string,		//CT 4 Name
		"frq": number,		//Supply Frequency
		"fwv": number		//Firmware Version
		"gen": number,		//Generated Watts
		"grd": number,		//Watts to/from grid
		"lck": number,		//4 bit code: = Lock Status 0: Locked Now, 1: Lock when plugged in, 2: Lock when unplugged, 3: Charge when locked, 4: Charge allowed (even if locked)
		"mgl": number,		//Minimum Green Level
		"pha": number,			// Phases
		"pri": number,			//priority
		"pst": string,		//Status A=EV Disconnected, B1=EV Connected, B2=Waiting for EV, C1=EV Ready to Charge, C2= Charging, F= Fault
		"sbh": number,		//Smart Boost Start Time Hour
		"sbk": number			//Smart Boost KWh to add
		"sbm": number,		//Smart Boost Start Time Minute
		"sno": number,        	//Changed Zappi Serial Number		
		"sta": number,			//Status  1=Paused 3=Diverting/Charging 5=Complete
		"tbh": number,			//boost hour?
		"tbk": number,		//boost KWh   - Note charge remaining for boost = tbk-che
		"tbm": number,		//boost minute?
		"tim": string,	//Time	
		"vol": number,		//Supply voltage
		"zmo": number,			//Zappi Mode - 1=Fast, 2=Eco, 3=Eco+, 4=Stopped
	}]
}

// Note that charging will be allowed if:- Locked Now=0 or Locked Now=1 and Charge When Locked=1 or Charge Session Allowed=1