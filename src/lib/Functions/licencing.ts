

export function checkLicense(license: string) {
    if (license === 'non-commercial') {
        console.log("You are using non-commerial license of ReactGrid. Happy coding!")
    } else {  
        const separator: string = '//';
        const licenseHash = getHashFromLicense(license, separator);
        if (!licenseHash) {
            console.warn("Your ReactGrid license is invalid! Please contact your manager.");
            return;
        } 
        
        const licenseExpirationDate = getLicenceExpirationDate(license);
        if (!licenseExpirationDate) {
            console.warn("ReactGrid expiration date is invalid! Please contact your manager.");
            return;
        }

        if (isLicenseExpired(licenseExpirationDate)) {
            console.warn("ReactGrid license has expired! Please contact your manager.");
            return;
        }

        const licenseWithoutHash = getLicenseWithoutHash(license, separator);
        if (!licenseWithoutHash) {
            console.warn("ReactGrid your ReactGrid licence is invalid! Please contact your manager.");
            return;
        }

        if (licenseHash !== hashLicense(licenseWithoutHash)) {
            console.warn("ReactGrid licence isn't correct! Please contact your manager.");
            return;
        }
        console.log(`ReactGrid license is active. Happy coding :)`);
    }
}

function isLicenseExpired (expirationDate: Date): boolean{
    const today = new Date();
    return expirationDate <= today;
}

function getLicenseHashStart(license: string, separator: string): number {
    return license.search(separator);
}

function getHashFromLicense(license: string, separator: string): string | null {
    const licenseHashStart = getLicenseHashStart(license, separator);
    if (licenseHashStart === -1)
        return null;
    const hash = license.slice(licenseHashStart + separator.length , license.length).trim()// 2 chars offset for separator and space char
    // TODO check exact lenght of hash
    if (hash.length === 0)
        return null
    return hash
}

function getLicenceExpirationDate(license: string): Date | null {
    const pattern = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/gi;
    const strDate = license.match(pattern);
    if (!strDate)
        return null;
    return new Date(strDate[0]);
}

function getLicenseWithoutHash(license: string, separator: string) : string | null {
    let result;
    const licenseHashStart = getLicenseHashStart(license, separator);
    if (licenseHashStart === -1)
        return null;
    result = license.slice(0, licenseHashStart).trim()
    return result;
}

function hashLicense(license: string): string {
    return hashCode(license.trim()).toString()
}

function hashCode(str: string): number {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return Math.abs(hash);
  }
