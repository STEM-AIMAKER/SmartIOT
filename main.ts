//% weight=10 color=#1E90FF icon="\uf136" block="HANSHIN: IAQ & IOT"
namespace HANSHIN_IAQ_IOT {
    let buffer = ""

 /**
 * Hanshin SMART IOT
 */
// weight=10 color=#1E90FF icon="\uf136" block="HANSHIN: IAQ & IOT"

	enum TemperatureValue {
	  //% block=16
	  T16 = 16,
	  //% block=17
	  T17 = 17,
	  //% block=18
	  T18 = 18,
	  //% block=19
	  T19 = 19,
	  //% block=20
	  T20 = 20,
	  //% block=21
	  T21 = 21,
	  //% block=22
	  T22 = 22,
	  //% block=23
	  T23 = 23,
	  //% block=24
	  T24 = 24,
	  //% block=25
	  T25 = 25,
	  //% block=26
	  T26 = 26,
	  //% block=27
	  T27 = 27,
	  //% block=28
	  T28 = 28,
	  //% block=29
	  T29 = 29,
	  //% block=30
	  T30 = 30,
	  //% block=31
	  T31 = 31,
	  //% block=32
	  T32 = 32
	};


       export enum CurtainIndex {
        //% blockId="First" block="First"
        First = 0,
        //% blockId="Second" block="Second"
        Second = 1,
        //% blockId="Third" block="Third"
        Third=2,
        //% blockId="Fourth" block="Fourth"
        Fourth=3,
        //% blockId="Fifth" block="Fifth"
        Fifth=4,
        //% blockId="ALL" block="All"
        ALL=100
    }

    function initSerial(Tx: SerialPin, Rx: SerialPin): void {
        serial.redirect(Tx, Rx, 9600)
        buffer = serial.readString()
        basic.pause(100)
        serial.writeString("AT")
        basic.pause(300)
    }
        
    //% blockId=raiseCurtain block="Raise Curtain |index=%index"
    export function raiseCurtain(index: CurtainIndex) : void {
        serial.writeString("AT+CIPMODE=1") 
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
        basic.pause(200)
        let ctCmd = "ct,0," + index
        serial.writeString(ctCmd)
        basic.pause(200)
        serial.writeString("+++")
    }
    
    //% blockId=lowCurtain block="Low Curtain |index=%index"
    export function lowCurtain(index: CurtainIndex) : void {
        serial.writeString("AT+CIPMODE=1") 
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
        basic.pause(200)
        let ctCmd = "ct,1," + index
        serial.writeString(ctCmd)
        basic.pause(200)
        serial.writeString("+++")
    }
	
	//% blockId=changeAirConditionerTemperature block="Change air conditioner |index=%index to |temperature=%temperature"
	export function changeAirConditionerTemperature(index: number, temperature: TemperatureValue ): void {
		serial.writeString("AT+CIPMODE=1")
		basic.pause(200)
		serial.writeString("AT+CIPSEND")
		basic.pause(200)
		let indexString = "," + index
		let ioCmd = "at," + temperature
		ioCmd += indexString
		serial.writeString(ioCmd)
		basic.pause(200)
		serial.writeString("+++")
	}
    
	//% blockId=turnOffAirConditioner block="Turn off air conditioner , |index=%index"
	export function turnOffAirConditioner(index: number): void {
	    serial.writeString("AT+CIPMODE=1") 
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
        basic.pause(200)
        let ioCmd = "ap,0," + index
        serial.writeString(ioCmd)
        basic.pause(200)
        serial.writeString("+++")
	}
    
	//% blockId=turnOnAirConditioner block="Turn on air conditioner , |index=%index"
	export function turnOnAirConditioner(index: number): void {
	    serial.writeString("AT+CIPMODE=1") 
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
        basic.pause(200)
        let ioCmd = "ap,1," + index
        serial.writeString(ioCmd)
        basic.pause(200)
        serial.writeString("+++")
	}
	
    //% blockId=turnOffIO block="Turn off io, |io Index=%ioIndex"
    export function turnOffIO(ioIndex: number): void {
        serial.writeString("AT+CIPMODE=1") 
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
        basic.pause(200)
        let ioCmd = "io,0," + ioIndex
        serial.writeString(ioCmd)
        basic.pause(200)
        serial.writeString("+++")
    }
    
    //% blockId=turnOnIO block="Turn on io, |io Index=%ioIndex"
    export function turnOnIO(ioIndex: number): void {
        serial.writeString("AT+CIPMODE=1")
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
        basic.pause(200)
        let ioCmd = "io,1," + ioIndex
        serial.writeString(ioCmd)
        basic.pause(200)
        serial.writeString("+++")
    }

    //% blockId=connectIOTServer block="Connect to IOT Server, |ip=%ip"
    export function connectIOTServer(ip: string): void {
        let connectCmd = "AT+CIPSTART=\"TCP\",\"" + ip +"\",5566"
        serial.writeString(connectCmd)
        basic.pause(2000)
        
    }  

    //% blockId=setWifiInfo block="Connect to WIFI, |SSID=%name Password=%password at serial port |TX = %Tx RX=%Rx"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    export function setWifiInfo(name: string, password: string,Tx: SerialPin,Rx: SerialPin): void {
        initSerial(Tx,Rx)
        serial.writeString("AT+CWMODE=3")
        basic.pause(200)        
        let cmd = "AT+CWJAP=\"" + name + "\",\"" + password + "\""
        serial.writeString(cmd)
        buffer = serial.readString()
        basic.pause(10000)
    }
}
