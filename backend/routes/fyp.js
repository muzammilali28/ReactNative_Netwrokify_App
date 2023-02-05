const express = require('express');
const FastSpeedtest = require("fast-speedtest-api");
const ping = require('ping');
const nodePortScanner = require('node-port-scanner');
const Traceroute = require('traceroute-lite');
const find = require('local-devices');

const router = express.Router();

router.get('/speedTest', async (req, res) => {

    let speedtest = new FastSpeedtest({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
        verbose: false, // default: false
        timeout: 10000, // default: 5000
        https: true, // default: true
        urlCount: 5, // default: 5
        bufferSize: 8, // default: 8
        unit: FastSpeedtest.UNITS.Mbps // default: Bps
    });

    try {
        const speed = await speedtest.getSpeed();
        
        console.log(speed)
        
        res.status(200).json({"Speed": speed+" Mbps"})
    } catch (error) {
        console.log(error)
        res.status(400).json({"Error": error})
    }
})

router.post('/ping', async (req, res) => {
    
    var URL = req.body.url
    URL = URL.toLowerCase();
    console.log(URL)

    if(URL === "localhost")
    {
        URL = "127.0.0.1"
    }
    
    try {
        
        const result = await ping.promise.probe(URL, {
            timeout: 5
        });
        
        if (!result.alive) {
            console.log("Host is Dead")
            res.status(400).json({"Host" : "Host is Dead"});
        }
        else
        {
            console.log("Host is Alive and Online")
            res.status(200).json({"Host" : "Host is Alive and Online"});
        }

    } catch (error) {
        console.log(error)
    }
})

router.post('/portInUse', async (req, res) => {
    
    var URL = req.body.url
    URL = URL.toLowerCase();
    console.log(URL)

    if(URL === "localhost")
    {
        URL = "127.0.0.1"
    }

    // Reference from https://www.geeksforgeeks.org/50-common-ports-you-should-know/

    const CommonPorts = [7, 20, 21, 22, 23, 25, 53, 54, 69, 80, 88, 8080, 102, 110, 123, 135, 137, 139, 143, 161, 162, 163,
        179, 180, 381, 383, 443, 464, 465, 500, 550, 587, 593, 636, 691, 902, 989, 990,
        993, 995, 1025, 1194, 1337, 1589, 1725, 2082, 2083, 2483, 2484,
        2967, 3074, 3306, 3724, 3389, 4664, 5432, 5900, 6665, 6669, 6881, 6999,
        6970, 8086, 1000, 2000, 3000, 3001, 4000, 5000, 6000, 8087, 8222, 9100, 10000, 12345, 27374, 18006]

    try {
        const ports = await nodePortScanner(URL,CommonPorts);
        const foundPorts = await ports;

        console.log("I have founded All Ports : ",foundPorts)
    
        const OpenPorts = foundPorts.ports.open
        
        var data = []
        OpenPorts.map((port)=>{
            data = [...data,[port]]
        })
        
        console.log("Open Ports are : ",foundPorts.ports.open)
        
        res.status(200).json({"Ports":data});

    } catch (error) {
        console.log(error)
        res.status(400).json({"Error":error})
    }

})

router.post('/traceRoute', (req, res) => {
    
    var URL = req.body.url
    URL = URL.toLowerCase();
    console.log(URL)

    var data = []

    var traceroute = new Traceroute(URL);         //Google DNS Server IP 8.8.8.8
    
    traceroute.start((err, hops) => {
        console.log(hops)
        hops.map((hopsData)=>{
            data = [...data, [hopsData.counter,hopsData.ip,hopsData.ms]]
        })
        
        console.log(data)
        
        res.status(200).json({"Received_Data": data});
    });

})

router.get('/devices', async (req, res) => {
    var data = []
    // Find all local network devices.
    try {
        await find().then(devices => {
            
            console.log(devices)
            
            devices.map((device)=>{
                 data = [...data, [device.ip,device.mac]]
             })
            
             console.log(data)
            
             res.status(200).json({"Found_Devices": data})
         })
    } catch (error) {
        res.status(400).json({"Error":error})
    }
    
})

module.exports = router;