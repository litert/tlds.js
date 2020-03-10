import * as $TLD from '../lib';

const tlds = $TLD.createTLDMananger();

tlds.importTLDs(['au', 'net', 'edu.au', 'tas.edu.au', 'com.au', 'cn', 'com.cn', 'us']);

function tryParse(domain: string): void {

    try {

        console.log('Parse:', domain, '->', JSON.stringify(tlds.parse(domain)));
    }
    catch (e) {

        if (e instanceof $TLD.E_INVALID_TLD) {

            console.error('Parse:', `${domain} -> INVALID`);
        }
        else {

            console.error('Parse:', `${domain} -> UNKNOWN ERROR`);
        }
    }
}

function validateTLD(tld: string): void {

    if (tlds.isTLD(tld)) {

        console.log(`TLD: ${tld} -> VALID`);
    }
    else {

        console.error(`TLD: ${tld} -> INVALID`);
    }
}

function validateDomain(domain: string): void {

    if (tlds.isDomain(domain)) {

        console.log(`Domain: ${domain} -> VALID`);
    }
    else {

        console.error(`Domain: ${domain} -> INVALID`);
    }
}

tryParse('microsoft.edu.au');
tryParse('www.microsoft.edu.au');
tryParse('apple.shit');

validateTLD('.net');
validateTLD('net');
validateTLD('us');
validateTLD('.edu.au');
validateTLD('uk');

validateDomain('fenying.net');
validateDomain('www.fenying.net');
validateDomain('localhost');
validateDomain('127.0.0.1');
validateDomain('angus.cc-');
validateDomain('angus-.cc');
validateDomain('-angus.cc');
validateDomain('-angus.-cc');
