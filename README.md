# Hypercore coding exercise

This application has been designed as a coding task for the Hypercore Protocol hiring process. It is a CLI application written in Node.js that displays pictures taken by the Perseverance rover from Mars surface in ascii format. The data is obtained from [this HTTP API](https://hiring.hypercore-protocol.org/termrover).

## The wrapper module

As a part of the exercise, one of the tasks is to design a module that works as a wrapper for the Rover API. This module exports 3 functions, see an example of how to use them:

```
const rover = require('./lib/rover')

console.log(await rover.latest()) // { metadata: { id: 839575, sol: 93 ....

console.log(await rover.index(0)) // Works the same way as rover.latest() but can get specific id

const iterator = termrover.stream(from, to) // asynchronous iterator that gets specific batch of images.
for await (const i of iterator) {
  console.log(i.data) 
}
```

## The CLI application

The application can display an image choosen by the user by the id with the __index__ option, or a slideshow with an interval specified in milliseconds with the __interval__ option. See an example below:

```
~/hypercore-coding-exercise> node app.js --index 44
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ii
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1111
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ii1111ttfffffffffffffffffffffffftttttt11iiii;;;;;;;;;;;;;;;;;;ii11
;;;;;;;;;;;;;;;;;;;;;;;;;;iittLLLLCCCCCCCCCCGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCLLLLLLff11ii;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;iiiittCCCCGGGGGGGGGGGGGG000000000000GGGGGGGGGGGGCCCCCCLLLLLLLLfftt11;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;iiffGGGGGG00000000000000000000000000000000GGGGGGGGCCCCCCLLLLLLffffffttii;;
;;;;;;;;;;;;;;;;;;;;;;iittffGGGG000000000000000000000000000000000000GGGGGGGGGGCCCCCCLLLLLLfffffffftt
;;;;;;;;;;;;;;;;;;;;;;ffGGGGGG0000GGGGGGCCCCCCCCLLLLLLLLLLLLLLffffffffffLLLLLLLLLLLLLLLLLLffffffffff
;;;;;;;;;;;;;;;;;;;;ttGGGGCCCCLLLLLLLLLLLLLLLLLLLLLLLLLLffffffffffffffffttttttttttttttttttttffffffff
;;;;;;;;;;;;;;;;11ttLLLLffLLLLLLLLLLLLLLLLLLLLLLLLLLLLfffffffffffffffffftttttttttttt111111111111tttt
;;;;;;;;11ttffffffffffffLLLLffLLLLLLLLCCCCLLLLLLLLLLfffffffffffffffffffftttttttttttt11111111iiiiiiii
;;;;;;;;ttttttffffffffffffLLLLLLLLLLLLLLLLLLLLLLLLLLLLffffffffffffffffttfftttttttttt1111111111iiiiii
;;;;;;;;11ttttttttffffffffLLLLLLLLLLLLLLLLLLLLLLLLLLLLffffffffLLfffftttttttttttttt111111111111iiiiii
;;;;;;;;iittttffffffffffffLLLLLLLLLLLLLLLLLLLLLLLLLLLLfffffffffffftttttttttttttttt11111111111111iiii
;;;;;;;;11ttffffffffffffffLLLLLLffLLLLLLLLLLLLLLLLLLLLLLLLffffffffffttttfftttttt11111111111111iiiiii
;;;;;;11ttffffffffffffffffLLLLffLLLLLLLLLLLLLLLLLLffffffffffffffffttttttfftttt1111111111iiiiii11iiii
;;;;ttttttttttttffffffffffLLLLCCLLLLLLLLLLLLLLLLLLLLLLLLLLffffLLLLLLfftttttttttt1111111111iiiiiiii11
;;iittttttttttttttffffffffLLLLCCLLffffffLLLLLLLLLLCCCCCCLLffffffLLLLLLfftttttt111111111111iiiiiiiiii
11tt11ttttttttttttffffffffffffffffffffffLLLLLLLLLLLLffffffffffffffffttttttfftttt1111111111iiiiiiiiii
iiii1111ttttttttttttffffffffffffffffffffffffffffffffffffffffffffttttttttttttfftt111111111111iiiiiiii
;;;;;;;;iittttttttttttfffffffffffffffffffffffffffffffffffffffffffftttttttttt11111111111111iiiiiiiiii
;;;;iiii;;ii11ttttttfffffffffffffffffffffffffffffffffffffffffftttttttttttt11tttt1111111111iiii11iiii
;;;;;;11;;;;;;iiiiiittttttfffffffffffffffffffffffffffffffffftttttttttttttt11tttttt111111iiiiiiiiiiii
;;;;;;ii;;;;;;;;;;ii11tt11fffffffffffffffffffffffffffffftttttttttttttttt1111tttttt111111iiiiiiiiiiii
;;;;;;;;;;;;;;;;;;;;iiii11iiffffffffffffffffffttttttfffftttttttttttttttt1111111111111111iiiiiiiiiiii
;;;;;;;;;;;;;;;;;;;;;;iiiiiiiiii11tttttttttttttttttt1111tttttttttttttt1111111111111111iiiiiiiiii;;;;
ii;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiiiiiiiiitttttttttt11iiiitttttttttttt1111111111111111iiiiiiii;;;;;;;;
iiii;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiiiiiiiiiiiiiiiiiiitttttttttt11111111111111iiiiiiii;;;;;;;;;;;;
ii;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiiiiiiiiiiiiiii1111111111111111111111iiiiiiii;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ii11ii;;;;;;;;ii;;iiii11111111111111iiiiiiiiii;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;11ii;;;;;;;;;;;;ii11111111111111iiiiiiiiii;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiii;;;;;;;;;;;;;;ii111111111111iiiiiiii;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ii;;;;;;;;;;;;;;ii1111111111iiiiii;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ii111111iiiiiiiiii;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ii;;iiiiiiiiiiii1111iiii;;;;iiii;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiiiiiiiii11iiiiiiiiiiiiii;;;;;;;;;;;;

 Id: 813409 Camera name: FRONT_HAZCAM_LEFT_A Earth date: 2021-03-03

```

## Compilation and install

```
npm install
npm run fix # run npm standard format fix
npm test # run tape tests located in test folder
```

Run the application:

```
~/hypercore-coding-exercise> node app.js --help
app.js [--index number || --slideshow number]

Options:
  --index      Display image with specific index                        [number]
  --slideshow  Display slideshow of all images with specified milliseconds
               interval                                                 [number]
  --version    Show version number                                     [boolean]
  --help       Show help                                               [boolean]
```
