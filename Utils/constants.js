import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'GbgRaOr7WfoRZ0AZlBzO2G4HgBTaADY2',
    socket: {
        host: 'redis-12952.crce286.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12952
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

