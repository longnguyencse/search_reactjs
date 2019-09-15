import moment from "moment";

interface StorageObject {
    expiry: moment.Moment;
}

export default class LocalStorage {
    setValue(key: string, data: any){
        let object;
        const expiryObj = { expiry: moment().add(7, "days") };
        if(Array.isArray(data)){
            object = {value: data, ...expiryObj};
        }
        else if(data instanceof Object){
            object = {...data, ...expiryObj};
        }
        else {
            object = {value: data, ...expiryObj};
        }
        
        // object = data instanceof Object ? {...data, ...expiryObj} : {value: data, ...expiryObj};

        const dataString = JSON.stringify(object);
        localStorage.setItem(key, dataString);
        return Promise.resolve();
    }

    getValue(key: string){
        const dataString = localStorage.getItem(key);
        return new Promise((resolve) => {
            if (dataString) {
                const dataObj: StorageObject = JSON.parse(dataString);
                if (dataObj.expiry && moment(dataObj.expiry).isAfter(moment())) {
                    delete dataObj.expiry;
                    resolve(dataObj);
                }
            }
            resolve();
        });
    }

    setItem(key: string, data: any){
        let object;
        const expiryObj = { expiry: moment().add(7, "days") };
        if(Array.isArray(data)){
            object = {value: data, ...expiryObj};
        }
        else if(data instanceof Object){
            object = {...data, ...expiryObj};
        }
        else {
            object = {value: data, ...expiryObj};
        }
        
        // object = data instanceof Object ? {...data, ...expiryObj} : {value: data, ...expiryObj};

        const dataString = JSON.stringify(object);
        localStorage.setItem(key, dataString);
        return Promise.resolve();
    }

    getItem(key: string){
        const dataString = localStorage.getItem(key);
        return new Promise((resolve) => {
            if (dataString) {
                const dataObj: StorageObject = JSON.parse(dataString);
                if (dataObj.expiry && moment(dataObj.expiry).isAfter(moment())) {
                    delete dataObj.expiry;
                    resolve(dataObj);
                }
            }
            resolve();
        });
    }

    async getArrayValue(key: string){
        const getItem: any = await this.getItem(key);

        let value = [];

        if(getItem && getItem.value){
            value = getItem.value;
        }

        return value;
    }

    async getItemValue(key: string){
        const getItem: any = await this.getItem(key);

        let value = null;

        if(getItem && getItem.value){
            value = getItem.value;
        }

        return value;
    }
}