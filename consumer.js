const amqp=require("amqplib");


const msg={number:19}
main();
async function main(){
    try{
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();
        const result=channel.assertQueue("jobs");
       channel.consume("jobs",message=>{
        const input=JSON.parse(message.content.toString());
        console.log(`received number ${input.number}`);

        if(input.number==98){
            channel.ack(message);
        }
        
       })
       console.log("waiting for msg")
}
catch(ex){
    console.error(ex);
}}