import moment from "moment";

interface StorageObject {
    expiry: moment.Moment;
}

export default class LocalStorage {
    setValue(key: string, data: any){
        let object;
        const expiryObj = { expiry: moment().add(7, "days") };
        object = data instanceof Object ? {...data, ...expiryObj} : {value: data, ...expiryObj};

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
}