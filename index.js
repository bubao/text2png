/**
 * @Description: 
 * @Author: bubao
 * @Date: 2020-06-15 05:36:19
 * @last author: bubao
 * @last edit time: 2021-01-21 01:04:36
 */

const TextToSVG = require('text-to-svg')
const sharp = require('sharp')
console.time("png")
const textToSVG = TextToSVG.loadSync('./DENG.TTF')

const svg1 = textToSVG.getSVG('魏长青-人人讲App', {
    x: 0,
    y: 0,
    fontSize: 24,
    anchor: 'top',
});

const svg2 = textToSVG.getSVG('邀请您参加', {
    x: 0,
    y: 0,
    fontSize: 16,
    anchor: 'top',
});

const svg3 = textToSVG.getSVG('人人讲课程', {
    x: 0,
    y: 0,
    fontSize: 32,
    anchor: 'top',
});


(async function run(){
    const sourceImg = sharp('./bg.png')
    const target1Img = sharp(Buffer.from(svg1))
    const target2Img = sharp(Buffer.from(svg2))
    const target3Img = sharp(Buffer.from(svg3))
    
    const [
        {width:sWidth , height:sHeight },
        {width:t1Width , height:t1Height },
        {width:t2Width , height:t2Height },
        {width:t3Width , height:t3Height }]= await Promise.all([
            sourceImg.metadata(),
            target1Img.metadata(),
            target2Img.metadata(),
            target3Img.metadata()])

    const offsetX1 = parseInt((sWidth - t1Width) / 2);
    const offsetY1 = 200;
    
    const offsetX2 = parseInt((sWidth - t2Width) / 2);
    const offsetY2 = 240;
    
    const offsetX3 = parseInt((sWidth - t3Width) / 2);
    const offsetY3 = 270;

    const [target1Buffer,target2Buffer,target3Buffer] = await Promise.all([
        target1Img.toBuffer(),
        target2Img.toBuffer(),
        target3Img.toBuffer()])

    await sourceImg
        .composite([
            {input:target1Buffer,left:offsetX1, top:offsetY1},
            {input:target2Buffer,left:offsetX2, top:offsetY2},
            {input:target3Buffer,left:offsetX3, top:offsetY3}
        ])
        .sharpen()
        .withMetadata()
        .png()
        .toFile('./card.png')
})()

console.timeEnd("png")