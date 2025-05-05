const UAParser = require("ua-parser-js");

const device =(req)=>{
    const userAgent = req.headers["user-agent"];
const parser = new UAParser(userAgent);


const deviceInfo = {
  device: parser.getDevice().model || "Unknown Device",
  brand: parser.getDevice().vendor || "Unknown Brand",
  type: parser.getDevice().type || "PC",
  os: parser.getOS().name + " " + parser.getOS().version,
  browser: parser.getBrowser().name + " " + parser.getBrowser().version,
  Agent: userAgent,
};
console.log(deviceInfo)
const {device,brand,type,os,browser,Agent}=deviceInfo
const userDeviceInfo = `${device},${brand},${type},${os},${browser},${Agent}`;

return userDeviceInfo;
}

module.exports = device;