export function mergeTwoArrayObject(first: any, two: any){
    return first.concat(two);
}

export function updateArrayObjectByAttribute(array: any, attribute: any, compareValue: any, updatedValue: any){
    const foundIndex = array.findIndex((arr: any) => arr[attribute] === compareValue);
    array[foundIndex] = updatedValue;
    return array;
}

export function filterArrayObjectByAttribute(array: any, attribute: any, compareValue: any){
    return array.filter((arr: any) => {
        return arr[attribute] !== compareValue;
    });
}

export function findElementInArrayObjectByAttribute(array: any, attribute: any, compareValue: any){
    return array.find((arr: any) => {
        return arr[attribute] === compareValue;
    });
}

export function returnDefaultString(value: any){
    if(!value){
        return "";
    }
    return value;
}

export function returnDefaultArary(value: any){
    if(!value){
        return [];
    }
    return value;
}