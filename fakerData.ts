import { faker } from '@faker-js/faker';


const meslekler: any = [];

// Belirli bir sayıda meslek üretin ve diziyi doldurun
for (let i = 0; i < 50; i++) {
    const randomMeslek = faker.person.jobType();
    const dataO = {
        label: randomMeslek,
        value: randomMeslek
    }
    meslekler.push(dataO);
}

export default meslekler