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

export function findAllElementInArrayObjectByAttribute(array: any, attribute: any, compareValue: any){
    return array.filter((arr: any) => {
        return arr[attribute] === compareValue;
    });
}

function compareTwoArrayObject(otherArray: any, attributeFirst: any, attributeTwo: any){
    return function(current: any){
        return otherArray.filter(function(other: any){
            if(attributeTwo){
                return other[attributeFirst] !== current[attributeTwo];
            }
            return other[attributeFirst] !== current[attributeFirst];
        }).length === 0;
      }
}
export function filerTwoArrayObjectByAttribute(first: any, two: any, attributeFirst: any, attributeTwo: any = null){
    return first.filter(compareTwoArrayObject(two, attributeFirst, attributeTwo));
}

export function returnDefaultString(value: any){
    if(!value){
        return "";
    }
    return value;
}

export function returnDefaultBoolean(value: any){
    return value ? true: false;
}

export function returnDefaultArary(value: any){
    if(!value){
        return [];
    }
    return value;
}

export function formatNumber(value: any){
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}