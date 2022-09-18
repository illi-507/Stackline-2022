import data from '../mock_data.json';

async function mockApi(){  
     return {
        json:async function(){
             return data;
        },
        ok:1       
     }
}

export default mockApi;

