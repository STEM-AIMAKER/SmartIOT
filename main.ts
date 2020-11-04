//% weight=10 color=#1E90FF icon="\uf136" block="HANSHIN: IAQ & IOT"
namespace HANSHIN_IAQ_IOT {
    let buffer = ""

 /**
 * Hanshin SMART IOT
 */
// weight=10 color=#1E90FF icon="\uf136" block="HANSHIN: IAQ & IOT"

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
        let ctCmd = "ct,0," + index
        serial.writeString(ctCmd)
    }
    
    //% blockId=lowCurtain block="Low Curtain |index=%index"
    export function lowCurtain(index: CurtainIndex) : void {
        let ctCmd = "ct,1," + index
        serial.writeString(ctCmd)
    }
        
    //% blockId=turnOffIO block="Turn off io, |io Index=%ioIndex"
    export function turnOffIO(ioIndex: string): void {
        let ioCmd = "io,0," + ioIndex
        serial.writeString(ioCmd)
    }
    
    //% blockId=turnOnIO block="Turn on io, |io Index=%ioIndex"
    export function turnOnIO(ioIndex: string): void {
        let ioCmd = "io,1," + ioIndex
        serial.writeString(ioCmd)
    }

    //% blockId=connectIOTServer block="Connect to IOT Server, |ip=%ip"
    export function connectIOTServer(ip: string): void {
        let connectCmd = "AT+CIPSTART=\"TCP\",\"" + ip +"\",5566"
        serial.writeString(connectCmd)
        basic.pause(200)
        serial.writeString("AT+CIPMODE=1")
        basic.pause(200)
        serial.writeString("AT+CIPSEND")
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