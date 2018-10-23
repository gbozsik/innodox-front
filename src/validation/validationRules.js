
export const required = v => !!v || 'Szükséges mező.'
export const min2char = v => {
    if (v === undefined) return !!v
    return v.length >= 2 || 'Legalább 2 karaktert kell tartalmazzon.'
}
export const min50char = v => {
    if (v === undefined) return !!v
    return v.length >= 50 || 'Legalább 50 karaktert kell tartalmazzon.'
}
export const min100char = v => {
    if (v === undefined) return !!v
    return v.length >= 100 || 'Legalább 100 karaktert kell tartalmazzon.'
}
export const max200char = v => {
    if (v === undefined) return !!v
    return v.length <= 200 || 'Maximum 200 karaktert tartalmazhat.'
}
export const max5000char = v => {
    if (v === undefined) return !!v
    return v.length >= 5000 || 'Maximum 5000 karaktert tartalmazhat.'
}
export const isNumber = v => !isNaN(v) || 'Csak számokat tartalmazhat.'
export const numMax10 = v => {return v <= 10 || 'Maximum 10 könyvet lehet felvenni.'}
export const positiveNum = v => {if (v === undefined) return !!v
    return v > 0 || 'Csak pozitív számot lehet megadni'}


/* Imei validator
** valid imei: 490154203237518
*/
export const isIMEI = v => {
    if (v === undefined) return !!v
    // Megnézzük, hogy megvan e a 15 db számjegy
    if (v.length != 15) return '15 számnak kell lennie'
    // Levágjuk az utlsó számjegyet a 15-ből és elrakjuk
    const validationDigit = Number(v.toString().split('').pop());
    // Végigmegyünk az összes számjegyen és minden másodikat megduplázzuk. (kivéve az utolsót)
    let checksum = ''
    for (let i = 0; i < v.length - 1; i++) {
        if (i % 2) checksum += v[i] * 2 
        else checksum += v[i]
    }
    // Végigmegyünk az összes checksum számjegyen és összeadjuk őket
    let sum = 0
    for (let i = 0; i < checksum.length; i++) {
    sum += Number(checksum[i])
    }
    // Felkerekítjük a legközelebb lévő 10-es számjegyre
    const roundedSum =  Math.ceil((sum+1) / 10) * 10;
    /* Kivonjuk a felkerekített számból az összeget és annak meg kell egyeznie az elején
    ** elrakott ellenörzőszámmal
    */
    if ((roundedSum - sum) === validationDigit) return true

    // Minden más esetben ezt küldjük vissza
    return 'Ez nem valid IMEI azonosító'

}
